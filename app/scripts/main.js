(function(){
  'use strict';

  var app = {};

  app.players = [];

  app.players.push({id: 1, name: 'Aliaksandr', asGoalee: 0, asForward: 0});
  app.players.push({id: 2, name: 'Andrey', asGoalee: 0, asForward: 0});
  app.players.push({id: 3, name: 'Ilya', asGoalee: 0, asForward: 0});
  app.players.push({id: 4, name: 'Kolia', asGoalee: 0, asForward: 0});
  app.players.push({id: 5, name: 'Pavel', asGoalee: 0, asForward: 0});

  app.refreshPlayers = function () {
    var table = document.querySelector('#players');

    for(var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }

    app.players.forEach(function(player, i){

      var row = table.insertRow(-1);
      row.insertCell(-1).innerText = player.id;
      row.insertCell(-1).innerText = player.name;
      row.insertCell(-1).innerText = player.asGoalee;
      row.insertCell(-1).innerText = player.asForward;
    });
  };

  app.refreshPlayers();
})();

