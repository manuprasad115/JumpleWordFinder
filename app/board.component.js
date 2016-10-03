"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var board_1 = require('./board');
var BoardComponent = (function () {
    function BoardComponent() {
        this.boxsize = 6;
        this.edgeList = [];
        this.boxList = [];
        this.playerList = [];
        this.newPlayer = new board_1.Player();
        this.currentPlayerIndex = 0;
        this.playStart = false;
        this.drawBoard();
    }
    BoardComponent.prototype.drawBoard = function () {
        this.newPlayer.id = 1;
        for (var i = 1; i <= this.boxsize; i++) {
            for (var j = 1; j <= this.boxsize; j++) {
                var _box = this.createBox();
                if (i == 1) {
                    _box.top = this.createEdge();
                }
                else {
                    _box.top = this.getBox(i - 1, j).bottom;
                }
                if (j == 1) {
                    _box.left = this.createEdge();
                }
                else {
                    _box.left = this.getBox(i, j - 1).right;
                }
                _box.bottom = this.createEdge();
                _box.right = this.createEdge();
            }
        }
    };
    BoardComponent.prototype.createBox = function () {
        var _b = new board_1.Box(this.boxList.length + 1);
        this.boxList.push(_b);
        return _b;
    };
    BoardComponent.prototype.getBox = function (row, col) {
        var _bId = (row - 1) * this.boxsize + col;
        return this.boxList.find(function (b) { return b.id == _bId; });
    };
    BoardComponent.prototype.createEdge = function () {
        var _e = new board_1.Edge(this.edgeList.length + 1);
        this.edgeList.push(_e);
        return _e;
    };
    BoardComponent.prototype.checkWin = function (_edgeId) {
        var _flag = false;
        var _boxArray = this.boxList.filter(function (x) { return x.top.id == _edgeId || x.bottom.id == _edgeId || x.left.id == _edgeId || x.right.id == _edgeId; });
        for (var index = 0; index < _boxArray.length; index++) {
            var _box = _boxArray[index];
            if (_box.top.status && _box.bottom.status && _box.left.status && _box.right.status) {
                _box.status = true;
                _box.player = this.currentPlayer;
                _flag = true;
            }
        }
        return _flag;
    };
    BoardComponent.prototype.nextPlayer = function () {
        this.currentPlayerIndex = (this.currentPlayerIndex == this.playerList.length - 1) ? 0 : ++this.currentPlayerIndex;
        return this.playerList[this.currentPlayerIndex];
    };
    BoardComponent.prototype.isFirstBox = function (_id) {
        return (_id % this.boxsize) == 1;
    };
    BoardComponent.prototype.setEdge = function (_edge) {
        if (_edge.status) {
            alert("Invalid Move");
        }
        else {
            _edge.status = true;
            if (this.checkWin(_edge.id)) {
                this.currentPlayer.points = this.getPoints(this.currentPlayer);
                if (this.edgeList.filter(function (x) { return (!x.status); }).length < 1) {
                    alert("Game Finished");
                    var _winner = this.playerList[0];
                    for (var index = 1; index < this.playerList.length; index++) {
                        if (_winner.points < this.playerList[index].points) {
                            _winner = this.playerList[index];
                        }
                    }
                    alert("Congrats " + _winner.name + " you won the game");
                }
            }
            else {
                this.currentPlayer = this.nextPlayer();
            }
        }
    };
    BoardComponent.prototype.addPlayer = function () {
        this.playerList.push(this.newPlayer);
        var _newId = this.playerList[this.playerList.length - 1].id + 1;
        this.newPlayer = new board_1.Player();
        this.newPlayer.id = _newId;
    };
    BoardComponent.prototype.startGame = function () {
        if (this.playerList.length > 2) {
            this.currentPlayerIndex = 0;
            this.currentPlayer = this.playerList[0];
            this.playStart = true;
        }
        else {
            alert("Need minimum 2 players to start game");
        }
    };
    BoardComponent.prototype.getPoints = function (_player) {
        return (this.boxList.filter(function (x) { return x.status; }).filter(function (b) { return b.player.id == _player.id; }).length);
    };
    BoardComponent.prototype.ngOnInit = function () { };
    BoardComponent = __decorate([
        core_1.Component({
            selector: 'board',
            templateUrl: 'app/templates/board.html',
            styleUrls: ['app/styles/board.css']
        }), 
        __metadata('design:paramtypes', [])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map