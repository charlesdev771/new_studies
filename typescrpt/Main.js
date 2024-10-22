"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var second_1 = require("./second");
var bob = new second_1.Dog();
bob.color = "black";
console.log(bob.color);
var nome = "João";
var glob = 12;
var otens = ["aa", "bb"];
function make_som() {
    return "aa";
}
var aa = make_som();
console.log(aa);
var person = {
    name: "Charles",
    heigt: 12
};
console.log(person.name);
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.make_jump = function () {
        console.log("JUMP!");
    };
    return Animal;
}());
