(function(){
  'use strict';

  var app = {};

  app.players = [];
  app.matches = [];

  app.refreshTable = function(selector, items) {
    var table = app.clearTable(selector);

    items.forEach(function(item, index){
      var row = table.insertRow(-1);

      var closeBtn = document.createElement('button');
      closeBtn.setAttribute('class', 'close');
      closeBtn.setAttribute('type', 'button');
      closeBtn.setAttribute('aria-label', 'Close');

      var span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.innerText = '×';
      closeBtn.appendChild(span);

      closeBtn.addEventListener('click', function (e) {
        item.onDelete();

        items.splice(index, 1);

        // dirty but do not want to introduce calls of ui from model
        app.refreshTable('#players', app.players);
        app.refreshTable('#matches', app.matches);
        //app.refreshTable(selector, items);
      });
      row.insertCell(-1).appendChild(closeBtn);

      item.getCells().forEach(function(cell){
        row.insertCell(-1).innerText = cell;
      });
    });
  };

  app.clearTable = function (selector) {
    var table = document.querySelector(selector);

    for(var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }

    return table;
  };

  app.tryGenerate = function () {
    document.querySelector('#warnings').classList.add('hidden');
    if (app.players.length < 4) {
      document.querySelector('#warnings').classList.remove('hidden');
      return;
    }

    app.generate();
  };

  app.generate = function () {

    const match = gen.generate(app.players);
    app.matches.push(match);

    app.refreshTable('#players', app.players);
    app.refreshTable('#matches', app.matches);
  };

  document.querySelector('#player').addEventListener('keypress', function (e) {

    if (e.keyCode == 13) {

      const text = e.target.value;
      const fields = text.split(':');

      if (fields[0].trim().length === 0) {
        return false;
      }

      app.players.push(new model.Player(fields[0], +fields[1], +fields[2]));
      e.target.value = '';
      app.refreshTable('#players', app.players);

      return false;
    }
  });
  document.querySelector('#generate').addEventListener('click', app.tryGenerate);

  // some initial values
  app.players.push(new model.Player('Aliaksandr'));
  app.players.push(new model.Player('Andrey'));
  app.players.push(new model.Player('Ilya'));
  app.players.push(new model.Player('Kolia'));
  app.players.push(new model.Player('Pavel'));
  app.refreshTable('#players', app.players);
})();
