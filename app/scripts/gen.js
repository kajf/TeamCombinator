var gen = {

  generate: function (players) {

    // find 4 less times played
    players.sort(function (a, b) {
      return a.total() - b.total();
    });

    var match = players.slice(0,4);

    // select goalee according to less experience
    var blueGoalee = gen.popLessExperiencedGoalee(match);
    var redGoalee = gen.popLessExperiencedGoalee(match);

    // combine less experienced goalee and more experienced forward
    const firstIsMoreExperiencedForward = (match[0].asForward > match[1].asForward);

    var blueForward = firstIsMoreExperiencedForward ? match[0] : match[1];
    var redForward = firstIsMoreExperiencedForward ? match[1] : match[0];

    // TODO randomize

    // increment players' statistics
    blueGoalee.asGoalee++;
    blueForward.asForward++;
    redGoalee.asGoalee++;
    redForward.asForward++;

    return new model.Match(blueGoalee,blueForward,redGoalee,redForward);
  },

  popLessExperiencedGoalee: function(players) {
    var lessExperienced = players[0];

    players.forEach(function (player) {
      if (lessExperienced.asGoalee > player.asGoalee) {
        lessExperienced = player;
      }
    });

    players.splice(players.indexOf(lessExperienced), 1);

    return lessExperienced;
  }
};
