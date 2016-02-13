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
    }
  };

  var Team = function (bg, bf, rg, rf) {
    this.id = getRandomInt();
    this.blueGoalee = bg;
    this.blueForward = bf;
    this.redGoalee = rg;
    this.redForward = rf;

    this.getCells = function () {
      return [this.id, this.blueGoalee.name, this.blueForward.name, this.redGoalee.name, this.redForward.name];
    };
  };

  var getRandomInt = function () {
    return Math.floor(Math.random() * (1000));
  };

  app.players = [];
  app.count = 6; // TODO generated at a time
  app.teams = [];

  app.players.push(new Player('Aliaksandr'));
  app.players.push(new Player('Andrey'));
  app.players.push(new Player('Ilya'));
  app.players.push(new Player('Kolia'));
  app.players.push(new Player('Pavel'));

  app.refreshTable = function(selector, items) {
    var table = app.clearTable(selector);

    items.forEach(function(item){
      var row = table.insertRow(-1);

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

  // TODO remove player and team functions
  // TODO cell colors (2 reds and 2 blues)

  app.generate = function () {

    // find 4 less times played
    app.players.sort(function (a, b) {
      return a.total() - b.total();
    });
    app.refreshTable('#players', app.players);

    // TODO select goalee/forward according to less played

    // TODO combine less experienced and more experienced in one team

    // TODO break ties randomly

    // increment players statistics
    app.players[0].asGoalee++;
    app.players[1].asForward++;
    app.players[2].asGoalee++;
    app.players[3].asForward++;

    app.teams.push(new Team(app.players[0],app.players[1],app.players[2],app.players[3]));

    app.refreshTable('#teams', app.teams);
  };

  document.querySelector('#player').addEventListener('keypress', function (e) {

    if (e.keyCode == 13) {

      app.players.push(new Player(e.target.value));
      e.target.value = '';
      app.refreshTable('#players', app.players);

      return false;
    }
  });
  document.querySelector('#generate').addEventListener('click', app.generate);

  app.refreshTable('#players', app.players);
})();

