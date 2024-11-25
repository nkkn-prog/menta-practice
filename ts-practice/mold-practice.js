/**
 * 1-1
 * 次の関数isPositiveは、数値を受け取ってそれが0以上ならtrue、0未満ならfalseを返す関数です。
 * この関数に正しく型アノテーションを付けてください。
 * 型アノテーションとは、引数や返り値の型をソースコード中に明示することです。
 *
 * **/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function showUserInfo(user) {
    console.log(user);
}
var isPositive = function (num) { return num >= 0; };
/**
 * 1-3
 * 以下のコードで定義される関数sumOfPosは、
 * 数値の配列を受け取って、そのうち0以上の値の和を返す関数です。
 * 適切な型アノテーションをつけてください。
 *
 */
function sumOfPos(arr) {
    return arr.filter(function (num) { return num >= 0; }).reduce(function (acc, num) { return acc + num; }, 0);
}
// 使用例
var sum = sumOfPos([1000, 3, -2, 0]);
/**
 * 2-1
 * 以下のコードで定義される関数myFilterは、配列のfilter関数を再実装したものです。
 * myFilter関数に適切な型アノテーションを付けてください。myFilter関数は色々な型の配列を受け取れる点に注意してください。
 * 必要に応じてmyFilterに型引数を追加しても構いません。
 */
function myFilter(arr, predicate) {
    var result = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var elm = arr_1[_i];
        if (predicate(elm)) {
            result.push(elm);
        }
    }
    return result;
}
// 使用例
var res = myFilter([1, 2, 3, 4, 5], function (num) { return num % 2 === 0; });
var res2 = myFilter(['foo', 'hoge', 'bar'], function (str) { return str.length >= 4; });
function getSpeed(speed) {
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
var slowSpeed = getSpeed("slow");
var mediumSpeed = getSpeed("medium");
var fastSpeed = getSpeed("fast");
// 使用例
addEventListener("foobar", function () { });
addEventListener("event", function () { }, true);
addEventListener("event2", function () { }, {});
addEventListener("event3", function () { }, {
    capture: true,
    once: false
});
function giveId(obj) {
    var id = "本当はランダムがいいけどここではただの文字列";
    return __assign(__assign({}, obj), { id: id });
}
// 使用例
var obj1 = giveId({ foo: 123 });
var obj2 = giveId({
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
var _a = useState(0), numState = _a[0], setNumState = _a[1];
// setNumStateは新しい値で呼び出せる
setNumState(3);
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState(function (state) { return state + 10; });
// 型引数を明示することも可能
var _b = useState(null), anotherState = _b[0], setAnotherState = _b[1];
setAnotherState(100);
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
function mapFromArray(arr, key) {
    var result = new Map();
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var obj = arr_2[_i];
        result.set(obj[key], obj);
    }
    return result;
}
// 使用例
var data = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Mary Sue" },
    { id: 100, name: "Taro Yamada" }
];
var dataMap = mapFromArray(data, "id");
var EventDischarger = /** @class */ (function () {
    function EventDischarger() {
    }
    EventDischarger.prototype.emit = function (eventName, payload) {
        // 省略
    };
    return EventDischarger;
}());
// 使用例
var ed = new EventDischarger();
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
