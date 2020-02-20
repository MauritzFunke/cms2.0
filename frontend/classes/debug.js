"use strict";
exports.__esModule = true;
var config = require('../config/vars');
var debug = /** @class */ (function () {
    function debug() {
    }
    /**
     * log
     */
    debug.log = function (text) {
        if (this.active) {
            console.log('[Debug]: ' + text);
        }
    };
    debug.active = config.debug;
    return debug;
}());
exports["default"] = debug;
;
