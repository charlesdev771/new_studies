import {Dog} from './second';

let bob = new Dog();
bob.color = "black";
console.log(bob.color);

let nome: string = "João";
var glob: number = 12;
let otens: string[] = ["aa", "bb"];

function make_som(): string
{
    return "aa";
}

let aa = make_som();
console.log(aa);

interface Person
{
    name: string;
    heigt: number;
    color?: string;
}


let person: Person = {
    name: "Charles",
    heigt: 12
}

console.log(person.name);

class Animal
{
 
    name: string;

    constructor(name: string)
    {
        this.name = name;
    }

    make_jump(): void
    {
        console.log("JUMP!")
    }
}

