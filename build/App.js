"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        var path = require('path');
        this.app.use(express.static(path.resolve(__dirname, "../dist")));
        this.app.use(express.static(path.resolve(__dirname, "../static")));
        this.app.get("/", function (req, res, next) {
            res.sendFile(path.resolve(__dirname, "../views/index.html"));
        });
    }
    /**
     * @ class App
     * @ method bootstrap
     * @ static
     *
     */
    App.bootstrap = function () {
        return new App();
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=App.js.map