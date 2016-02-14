var model = {

  Player: function (name, asGoalee, asForward) {

    this.id = model.getRandomInt();
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
  },

  Match: function (bg, bf, rg, rf) {

    this.id = model.getRandomInt();
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
    };
  },

  getRandomInt: function() {
    return Math.floor(Math.random() * (1000));
  }
};



