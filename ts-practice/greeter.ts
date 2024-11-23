// function greeter(person: string): string {
//     console.log(typeof(person))
//     return "Hello, " + person;
// }

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
class Person {
    // 変数の型定義。現状だとPersonクラス外からもこの変数にアクセスできる
    // privateはPersonクラス内からしかアクセスできない
    // protectedはPersonクラスを継承しているクラスからのみしかアクセスできない
    // readpnlyはconstructorの初期化ではreadonlyを設定したプロパティの値を更新することができるがメソッドでアクセスは可能ですが更新を行うことができない
    // publicは継承したClassからアクセスすることができるが外部からもアクセスして更新することができる
    protected firstName: string;
    lastName: string;

    // このclassがnewされた時に走る処理。2つの文字列の引数を入れると、先に定義したfirstNameとlastNameに値が代入される
    constructor(firstName: string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // 各値に引数が代入されたあと、この関数が走る
    fullName(): string {
        this.firstName = 'ああああ'
        return `${this.firstName} ${this.lastName}`;
    }
}

// Personクラスを継承
class User extends Person {
    isAdmin: boolean;
    constructor(firstName: string, lastName: string, isAdmin: boolean) {
      super(firstName, lastName);
      this.isAdmin = isAdmin;
    }
    // ここでfullNameを修正
    fullName(): string {
      return super.fullName();
    }
    yourFirstName(): void {
      console.log(this.firstName);
    }
  }

  const param1 = new Person('naoki', 'ando')
  console.log(param1.fullName())