/**
 * 1-1
 * 次の関数isPositiveは、数値を受け取ってそれが0以上ならtrue、0未満ならfalseを返す関数です。
 * この関数に正しく型アノテーションを付けてください。
 * 型アノテーションとは、引数や返り値の型をソースコード中に明示することです。
 * 
 * **/

// function isPositive(num:number):boolean {
//     return num >= 0;
// }
// console.log(isPositive(3));


/**
 * 1-2
 * 1人のユーザーのデータを表すオブジェクトは、nameプロパティとageプロパティ、そしてprivateプロパティを持っています。
 * nameは文字列、ageは数値、privateは真偽値です。ユーザーデータのオブジェクトの型Userを定義してください。
 */

interface User {
    name: string,
    age: number,
    private: boolean
}

function showUserInfo(user: User): void{
    console.log(user)
}


/**
 * 1-3
 * 以下のコードで定義される関数isPositiveは、
 * 数値を受け取ってその数値が0以上ならtrueを、0未満ならfalseを返す関数です。
 * 以下のコードに合うように適切な型IsPositiveFuncを定義してください。
 
 */
interface IsPositiveFunc {
    (num:number): boolean
}
const isPositive: IsPositiveFunc = num => num >= 0;


/**
 * 1-3
 * 以下のコードで定義される関数sumOfPosは、
 * 数値の配列を受け取って、そのうち0以上の値の和を返す関数です。
 * 適切な型アノテーションをつけてください。
 * 
 */
function sumOfPos(arr: Array<number>) {
    return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
  }
  
  // 使用例
  const sum: number = sumOfPos([1000, 3, -2, 0]);


/**
 * 2-1
 * 以下のコードで定義される関数myFilterは、配列のfilter関数を再実装したものです。
 * myFilter関数に適切な型アノテーションを付けてください。myFilter関数は色々な型の配列を受け取れる点に注意してください。
 * 必要に応じてmyFilterに型引数を追加しても構いません。
 */
function myFilter<T>(arr:T[], predicate:(value:T)=>boolean){
    const result = [];
    for (const elm of arr) {
      if (predicate(elm)) {
        result.push(elm);
      }
    }
    return result;
  }
  
  // 使用例
  const res = myFilter([1, 2, 3, 4, 5], num => num % 2 === 0);
  const res2 = myFilter(['foo', 'hoge', 'bar'], str => str.length >= 4);



/**
 * 2-2. いくつかの文字列を受け取れる関数
 * 以下のコードで定義されるgetSpeedは、'slow', 'medium', 'fast'のいずれかの文字列を受け取って数値を返す関数です。
 * この関数に他の文字列を渡すのは型エラーとしたいです。この条件を満たすように型Speedを定義してください。
 */

type Speed = 'slow'|'medium'|'fast'

function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

// 使用例
const slowSpeed = getSpeed("slow");
const mediumSpeed = getSpeed("medium");
const fastSpeed = getSpeed("fast");


/**
 * 2-3. 省略可能なプロパティ
 * EventTarget#addEventListenerは、2つまたは3つの引数を受け取る関数で、返り値はありません。
 * 1つ目の引数は文字列、2つ目の引数は関数です。そして3つ目の引数は省略可能であり、真偽値またはオブジェクトを渡すことができます。
 * オブジェクトに存在可能なプロパティはcapture, once, passiveの3つで、全て真偽値であり、省略可能です。
 * このようなインターフェースを持つ関数addEventListenerをdeclareを用いて宣言してください。
 * 簡単のために、第2引数に指定する関数は引数無しで何も返さない関数としてください。
 */

interface AddEventListenerOptions {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
}

declare function addEventListener(
    type: string,
    listener: () => void,
    options?: boolean | AddEventListenerOptions
): void;

// 使用例
addEventListener("foobar", () => {});
addEventListener("event", () => {}, true);
addEventListener("event2", () => {}, {});
addEventListener("event3", () => {}, {
  capture: true,
  once: false
});


/**
 * 2-4. プロパティを1つ増やす関数
 * 下のコードで定義されるgiveId関数は、オブジェクトを受け取って、それに新しい文字列型のプロパティidを足してできる新しいオブジェクトを返す関数です。
 * この関数に適切な型を付けてください。
 * なお、簡単のために、giveIdに渡されるオブジェクトobjが既にidプロパティを持っている場合は考えなくて構いません。
 */

interface exampleObject {
    id?: string,

}
function giveId(obj) {
    const id = "本当はランダムがいいけどここではただの文字列";
    return {
      ...obj,
      id
    };
  }
  
  // 使用例
  const obj1: {
    id: string;
    foo: number;
  } = giveId({ foo: 123 });
  const obj2: {
    id: string;
    num: number;
    hoge: boolean;
  } = giveId({
    num: 0,
    hoge: true
  });

//解答
// function giveId<T>(obj: T): T & { id: string } {
//     const id = "本当はランダムがいいけどここではただの文字列";
//     return {
//       ...obj,
//       id
//     };
//   }

/**
 * 2-5
 * ReactのuseState関数は、ステートを宣言するために使われます。
 * 引数は1つで、宣言されるステートの初期値です。
 * 返り値は2つの要素を持つ配列で、最初の要素は現在のステートの値です。
 * 2つ目の要素は関数であり、呼び出すとステートを更新できます。
 * ステート更新関数は引数に新しいステートの値を受け取ることができるほか、現在の値を受け取って新しい値を返す関数を渡すことができます。
 * useStateの使い方は以下の使用例も参考にしてください。このようなuseStateをdeclareで宣言してください。
 * ただし、useStateはステートの値の型を型引数として取るようにしてください。
 */


// 使用例
// number型のステートを宣言 (numStateはnumber型)
const [numState, setNumState] = useState(0);
// setNumStateは新しい値で呼び出せる
setNumState(3);
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState(state => state + 10);

// 型引数を明示することも可能
const [anotherState, setAnotherState] = useState<number | null>(null);
setAnotherState(100);

// 解答
type UseStateUpdateArgument<T> = T | ((oldValue: T) => T);

declare function useState<T>(
  initialValue: T
): [T, (updator: UseStateUpdateArgument<T>) => void];


/**
 * 3-1
 * 以下のコードで定義される関数mapFromArrayは、オブジェクトの配列からMapを作って返す関数です。
 * 配列から取り出した各オブジェクトをMapに登録しますが、その際にキーとして各オブジェクトの指定されたプロパティの値を用います。
 * mapFromArrayに適切な型を付けてください。
 */

/**
 * 〜自分の理解用〜
 * 引数arrに入るデータ構造を確認すると、配列型で中身はオブジェクト構造になっている。
 * キーとして各オブジェクトの指定されたプロパティの値を用いるので、T内のプロパティのうちkeyを指定するのでKを用いる。
 * mapFromArray<T extends object, K extends keyof T>
 * 
 * そしてmapFromArrayの引数には、
 * (arr:T[], key:K
 * となる。
 * 
 * そして返り値の型は、(obj[key], obj)なので、Map<T[K], T>になる
 * 
 * まとめると、mapFromArray<T extends object, K extends keyof T>(arr:T[], key:K):Map<T[K], T>になる。
 */

function mapFromArray<T extends object ,K extends keyof T>(arr:T[], key:K):Map<T[K], T> {
    const result = new Map();
    for (const obj of arr) {
      result.set(obj[key], obj);
    }
    return result;
  }
  
  // 使用例
  const data = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Mary Sue" },
    { id: 100, name: "Taro Yamada" }
  ];
  const dataMap = mapFromArray(data, "id");
  /*
  dataMapは
  Map {
    1 => { id: 1, name: 'John Smith' },
    2 => { id: 2, name: 'Mary Sue' },
    100 => { id: 100, name: 'Taro Yamada' }
  }
  というMapになる
  */


/**
 * 3-2. Partial
 * PartialはTypeScriptの標準ライブラリに定義されている型で、オブジェクトの型を渡されると、その各プロパティを全部省略可能にするものです。
 * MyPartialという名前でこれを実装してください。
 */

type MyPartial<T> = {[K in keyof T]?: T[K]} 
// 使用例
/*
 * T1は { foo?: number; bar?: string; } となる
 */
type T1 = MyPartial<{
    foo: number;
    bar: string;
  }>;
  /*
   * T2は { hoge?: { piyo: number; } } となる
   */
  type T2 = MyPartial<{
    hoge: {
      piyo: number;
    };
  }>;

/**
 * 以下のコードで定義されるEventDischargerクラスは、emitメソッドを呼び出すことでイベントを発生させる機能を持っています。
 * イベントは"start", "stop", "end"の3種類であり、それぞれのイベントを発生させるときはイベントに合ったデータをemitメソッドに渡す必要があります。
 * 具体的には、"start"イベントに対しては{ user: string }型のデータを、
 * "stop"イベントに対しては{ user: string; after: number }型のデータを、
 * そして"end"イベントに対しては{}型のデータを渡さなくてはなりません。
 * 
 * 各イベント名に対して必要なデータの型は、EventPayloads型にイベント名: データの型の形でまとめて定義してあります。
 * いま、emitメソッドが間違ったイベント名やデータに対しては型エラーを出すようにしたいです。
 * emitメソッドに適切な型を付けてください。
 * ただし、EventDischargerの汎用性を上げるために、EventDischargerはイベントを定義する型であるEventPayloadsを型引数Eとして受け取るようになっています。
 * emitは、Eに定義されたイベントを適切に受け付ける必要があります。
 */

interface EventPayloads {
    start: {
      user: string;
    };
    stop: {
      user: string;
      after: number;
    };
    end: {};
  }
  
  class EventDischarger<E> {
    emit(eventName, payload) {
      // 省略
    }
  }
  
  // 使用例
  const ed = new EventDischarger<EventPayloads>();
  ed.emit("start", {
    user: "user1"
  });
  ed.emit("stop", {
    user: "user1",
    after: 3
  });
  ed.emit("end", {});
  
  // エラー例
  ed.emit("start", {
    user: "user2",
    after: 0
  });
  ed.emit("stop", {
    user: "user2"
  });
  ed.emit("foobar", {
    foo: 123
  });
  