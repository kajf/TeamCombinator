(function(){
  'use strict';

  var app = {};

  var Player = function (name, asGoalee, asForward) {
    this.id = getRandomInt();
    this.name = name;
    this.asGoalee = asGoalee || 0;
    this.asForward = asForward || 0;

    this.total = function () {
      return this.asGoalee + this.asForward;
    };

    this.getCells = function () {
      return [this.id, this.name, this.asGoalee, this.asForward, this.total()];
    };

    this.onDelete = function () {
    }
  };

  var Match = function (bg, bf, rg, rf) {
    this.id = getRandomInt();
    this.blueGoalee = bg;
    this.blueForward = bf;
    this.redGoalee = rg;
    this.redForward = rf;

    this.getCells = function () {
      return [this.id, this.blueGoalee.name, this.blueForward.name, this.redGoalee.name, this.redForward.name];
    };

    this.onDelete = function () {
      this.blueGoalee.asGoalee--;
      this.blueForward.asForward--;
      this.redGoalee.asGoalee--;
      this.redForward.asForward--;

      app.refreshTable('#players', app.players);
    };
  };

  var getRandomInt = function () {
    return Math.floor(Math.random() * (1000));
  };

  app.players = [];
  app.count = 6;
  app.teams = [];

  app.players.push(new Player('Aliaksandr'));
  app.players.push(new Player('Andrey'));
  app.players.push(new Player('Ilya'));
  app.players.push(new Player('Kolia'));
  app.players.push(new Player('Pavel'));

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
        app.refreshTable(selector, items);
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

  // TODO move generation to separate js

  // TODO cell colors (2 reds and 2 blues)

  app.tryGenerate = function () {
    document.querySelector('#warnings').classList.add('hidden');
    if (app.players.length < 4) {
      document.querySelector('#warnings').classList.remove('hidden');
      return;
    }

    app.generate();
  };

  app.generate = function () {

    // find 4 less times played
    app.players.sort(function (a, b) {
      return a.total() - b.total();
    });

    var match = app.players.slice(0,4);

    // select goalee according to less experience
    var blueGoalee = app.popLessExperiencedGoalee(match);
    var redGoalee = app.popLessExperiencedGoalee(match);

    // combine less experienced goalee and more experienced forward
    const firstIsMoreExperiencedForward = (match[0].asForward > match[1].asForward);

    var blueForward = firstIsMoreExperiencedForward ? match[0] : match[1];
    var redForward = firstIsMoreExperiencedForward ? match[1] : match[0];

    // increment players' statistics
    blueGoalee.asGoalee++;
    blueForward.asForward++;
    redGoalee.asGoalee++;
    redForward.asForward++;

    app.refreshTable('#players', app.players);

    app.teams.push(new Match(blueGoalee,blueForward,redGoalee,redForward));
    app.refreshTable('#teams', app.teams);
  };

  app.popLessExperiencedGoalee = function (players) {
    var lessExperienced = players[0];

    players.forEach(function (player) {
      if (lessExperienced.asGoalee > player.asGoalee) {
        lessExperienced = player;
      }
    });

    players.splice(players.indexOf(lessExperienced), 1);

    return lessExperienced;
  };

  document.querySelector('#player').addEventListener('keypress', function (e) {

    if (e.keyCode == 13) {

      app.players.push(new Player(e.target.value));
      e.target.value = '';
      app.refreshTable('#players', app.players);

      return false;
    }
  });
  document.querySelector('#generate').addEventListener('click', app.tryGenerate);

  app.refreshTable('#players', app.players);
})();

