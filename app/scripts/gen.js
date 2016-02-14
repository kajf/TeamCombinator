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

    if (blueGoalee.asGoalee === redGoalee.asGoalee) {
      if (Math.random()<.5) {
        blueGoalee = [redGoalee, redGoalee = blueGoalee][0];// swap
      }// 50% probability to change team
    }

    var blueForward = match[0];
    var redForward = match[1];

    if (blueForward.asForward === redForward.asForward) {
      if (Math.random()<.5) {
        blueForward = [redForward, redForward = blueForward][0];// swap
      }// 50% probability to change team
    } else {
      // combine less experienced goalee and more experienced forward
      const blueGoaleeIsMoreExperienced = (blueGoalee.asGoalee > redGoalee.asGoalee);
      const blueForwardIsMoreExperienced = (blueForward.asForward > redForward.asForward);

      // either blues both more experienced or both less experienced
      // in these cases - swap
      if (blueGoaleeIsMoreExperienced === blueForwardIsMoreExperienced) {
        blueForward = [redForward, redForward = blueForward][0];// swap
      }
    }

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
