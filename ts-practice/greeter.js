// function greeter(person: string): string {
//     console.log(typeof(person))
//     return "Hello, " + person;
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// const user = "あいうえお";
// document.body.textContent = greeter(user);
// 型の練習
// const fruits: string[] = ['apple', 'banana']
// const fruits_generics: Array<string> = ['apple', 'banana']
// drinkは配列型で中に文字列が入る型を指定しているため、以下はエラーになる。
// const drink: Array<string> = ['coffee', 10]
// console.log(drink)
// typeof null は "object" を返すとECMA Scriptで決まっているらしい
// typeof 演算子は実行時の JavaScript の動作に従うため、"object" を返すみたい
// undefinedの型はundefined
// const params2: undefined = undefined;
// const params3: boolean = true;
// const user: {id: number; readonly name: string;} = {
//     id: 100,
//     name: 'John Doe',
//   };
// 以下にするとエラーになる。
// user.name = 'あああああ'
// function output_types(params: any): any{
//     console.log(params)
//     const message1 = `${params}の型は、${typeof(params)}です！`
//     const message2 = `返り値は${params}です！`
//     return message2
// }
// document.body.textContent = output_types(user);
// interface Person {
//     firstName: string;
//     lastName: string;
//     // greetingという関数で、引数messageには文字列、返り値には文字列の型指定がされている。
//     greeting: (message: string) => string;
// }
// let visitor: Person = {
//     firstName: "Jane",
//     lastName: "Doe",
//     greeting(message) {
//         return `${message} ${this.firstName}`;
//       },
// };
// console.log(visitor.greeting('Hello'));
// classの作成
var Person = /** @class */ (function () {
    // このclassがnewされた時に走る処理。2つの文字列の引数を入れると、先に定義したfirstNameとlastNameに値が代入される
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // 各値に引数が代入されたあと、この関数が走る
    Person.prototype.fullName = function () {
        this.firstName = 'ああああ';
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person;
}());
// Personクラスを継承
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(firstName, lastName, isAdmin) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.isAdmin = isAdmin;
        return _this;
    }
    // ここでfullNameを修正
    User.prototype.fullName = function () {
        return _super.prototype.fullName.call(this);
    };
    User.prototype.yourFirstName = function () {
        console.log(this.firstName);
    };
    return User;
}(Person));
var param1 = new Person('naoki', 'ando');
console.log(param1.fullName());
