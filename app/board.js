"use strict";
var Edge = (function () {
    function Edge(num) {
        this.status = false;
        this.id = num;
    }
    return Edge;
}());
exports.Edge = Edge;
var Box = (function () {
    function Box(num) {
        this.status = false;
        this.id = num;
    }
    return Box;
}());
exports.Box = Box;
var Player = (function () {
    function Player() {
        this.name = "";
        this.icon = "";
        this.points = 0;
    }
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=board.js.map