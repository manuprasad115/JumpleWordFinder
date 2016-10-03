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
var http_1 = require('@angular/http');
var search_1 = require('./search');
var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.words = [];
        this.result = [];
        this.str = "";
        this.load = false;
        this.filteredResult = [];
        this.filter = false;
        http.request("app/words.txt").subscribe(function (result) { _this.str = result.text().toLowerCase(); _this.load = true; });
    }
    AppComponent.prototype.search = function (_str) {
        var _this = this;
        // if(this.str.indexOf(_str)>=0)
        // {
        //   alert("Found");
        // }
        // else{
        //   alert("Not Found");
        // }
        this.result = [];
        this.words = this.recr(_str).filter(function (elem, index, self) { return index == self.indexOf(elem); });
        this.words.forEach(function (_word) {
            var _wr = new search_1.WordResult();
            _wr.word = _word;
            _wr.found = (_this.str.indexOf('\n' + _word) >= 0);
            _this.result.push(_wr);
        });
        this.filteredResult = this.result.filter(function (_res) { return _res.found; });
    };
    AppComponent.prototype.filterToggle = function () {
        this.filter = !this.filter;
    };
    AppComponent.prototype.recr = function (data) {
        var lst = [];
        if (data.length < 2) {
            lst.push(data);
            return lst;
        }
        else if (data.length == 2) {
            lst.push(data.substring(1) + data.substring(0, 1));
            lst.push(data);
            return lst;
        }
        else {
            var _loop_1 = function(c) {
                var f = data.substring(c, (c + 1));
                var set = data.substring(0, c) + data.substring(c + 1);
                var lstt = this_1.recr(set);
                lstt.forEach(function (s) {
                    lst.push(f + s);
                    lst.push(s + f);
                });
            };
            var this_1 = this;
            for (var c = 0; c < data.length; c++) {
                _loop_1(c);
            }
        }
        return lst;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/templates/home.html',
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map