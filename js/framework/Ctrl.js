var Ctrl, CtrlEvent, View;

CtrlEvent = require('./CtrlEvent');

View = require('./View');

module.exports = Ctrl = (function() {
  function Ctrl(app, params) {
    var ctrlname;
    this.app = app;
    this.params = params;
    ctrlname = this.constructor.name;
    ctrlname = ctrlname.substr(0, ctrlname.length - 4);
    ctrlname = ctrlname.replace(/([A-Z])/g, "-$1");
    this.templateUrl = ctrlname.substr(1).toLowerCase() + '.html';
    console.log(this.templateUrl);
    this.scope = {};
    this.event = new CtrlEvent();
    this.view = new View();
    this.services = {};
    this._askedForRedirect = false;
  }

  Ctrl.prototype.use = function(callback) {
    return this.render((function(_this) {
      return function() {
        _this["do"]();
        if (callback()) {
          return callback;
        }
      };
    })(this));
  };

  Ctrl.prototype.initialize = function(callback) {
    if (callback) {
      return callback();
    }
  };

  Ctrl.prototype["do"] = function() {};

  Ctrl.prototype.render = function(callback) {
    return this.initialize((function(_this) {
      return function(params) {
        return _this.view.render(_this.templateUrl, params, _this.app.router.defaultPlacement, callback);
      };
    })(this));
  };

  Ctrl.prototype.include = function(ctrl, placement, callback) {};

  Ctrl.prototype.askForRedirect = function(msg, answer) {
    this._askedForRedirect = true;
    return $(window).bind('beforeunload', function() {
      if (answer() === false) {
        return true;
      } else {
        return 'Your local changes might be lost';
      }
    });
  };

  Ctrl.prototype.unload = function() {
    if (this._askedForRedirect) {
      return $(window).unbind('beforeunload');
    }
  };

  return Ctrl;

})();
