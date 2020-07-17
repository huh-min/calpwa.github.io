"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register"); // source-map을 사용하기 위해 추가함.
var App_1 = require("./App");
var port = Number(process.env.PORT) || 8000;
var app = new App_1.default().app;
app.listen(port, function () { return console.log("Express server listening at " + port); })
    .on('error', function (err) { return console.error(err); });
//# sourceMappingURL=www.js.map