## this的绑定规则
- 默认绑定
- 隐式绑定
- 显示绑定
- new绑定
- 箭头函数绑定

---

#### 默认绑定

1. 独立函数调用 可以把默认绑定看作是无法应用其他规则时的默认规则，this指向全局对象。
2. 严格模式
不能将全局对象用于默认绑定，this会绑定到++undefined++。只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

```javascript
function foo() { // 运行在严格模式下，this会绑定到undefined
    "use strict";
    console.log( this.a );
}
var a = 2;
// 调用
foo(); // TypeError: Cannot read property 'a' of undefined
```

#### 隐式绑定

当函数引用有上下文对象时，隐式绑定规则会把函数中的this绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。

> 隐式丢失

被隐式绑定的函数特定情况下会丢失绑定对象，应用默认绑定，把this绑定到全局对象或者undefined上。

```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名
var a = "oops, global"; // a是全局对象的属性
bar(); // "oops, global"
```

#### 显式绑定

通过++call(..) 或者 apply(..)方法++。第一个参数是一个对象，在调用函数时将这个对象绑定到this。因为直接指定this的绑定对象，称之为显示绑定。

```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
var a = 3;
foo.call(obj); // 2  调用foo时强制把foo的this绑定到obj上
```
> 显示绑定解决绑定丢失问题

1. 硬绑定

创建函数bar()，并在它的内部手动调用foo.call(obj)，强制把foo的this绑定到了obj.
```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
var bar = function() {
    foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// 硬绑定的bar不可能再修改它的this
bar.call( window ); // 2
```

```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}

var obj = {
    a: 2
};

var bar = bind( foo, obj ); 
//ES5内置了Function.prototype.bind，bind会返回一个硬绑定的新函数

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```
2. API调用执行期上下文

JS许多内置函数提供了一个可选参数，被称之为“上下文”（context），其作用和bind(..)一样，确保回调函数使用指定的this。这些函数实际上通过call(..)和apply(..)实现了显式绑定。
```javascript
function foo(el) {
	console.log( el, this.id );
}
var obj = {
    id: "awesome"
}
var myArray = [1, 2, 3]
// 调用foo(..)时把this绑定到obj
myArray.forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

#### new绑定
- 在JS中，构造函数只是使用new操作符时被调用的普通函数，他们不属于某个类，也不会实例化一个类。
- 包括内置对象函数（比如Number(..)）在内的所有函数都可以用new来调用，这种函数调用被称为构造函数调用。
- 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

```javascript
使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1、创建（或者说构造）一个新对象。
2、这个新对象会被执行[[Prototype]]连接。
3、这个新对象会绑定到函数调用的this。
4、如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

function foo(a) {
    this.a = a;
}
var bar = new foo(2); // bar和foo(..)调用中的this进行绑定
console.log( bar.a ); // 2

手写一个new实现
function create() {
    var obj = new Object() // 创建一个空的对象
    Con = [].shift.call(arguments) 	// 获得构造函数，arguments中去除第一个参数
    obj.__proto__ = Con.prototype // 链接到原型，obj 可以访问到构造函数原型中的属性
    var ret = Con.apply(obj, arguments)// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
	return ret instanceof Object ? ret : obj // 优先返回构造函数返回的对象
};

1、用new Object() 的方式新建了一个对象obj
2、取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
3、将 obj 的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
4、使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
5、返回 obj
```

#### 软绑定
- 硬绑定可以把this强制绑定到指定的对象（new除外），防止函数调用应用默认绑定规则。但是会降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改this。
- 如果给默认绑定指定一个全局对象和undefined以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显示绑定修改this的能力。

```javascript
// 默认绑定规则，优先级排最后
// 如果this绑定到全局对象或者undefined，那就把指定的默认对象obj绑定到this,否则不会修改this
if(!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有curried参数
        var curried = [].slice.call( arguments, 1 ); 
        var bound = function() {
            return fn.apply(
            	(!this || this === (window || global)) ? 
                	obj : this,
                curried.concat.apply( curried, arguments )
            );
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}

// 软绑定版本的foo()可以手动将this绑定到obj2或者obj3上，但如果应用默认绑定，则会将this绑定到obj。

function foo() {
    console.log("name:" + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

// 默认绑定，应用软绑定，软绑定把this绑定到默认对象obj
var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj 

// 隐式绑定规则
obj2.foo = foo.softBind( obj );
obj2.foo(); // name: obj2 <---- 看！！！

// 显式绑定规则
fooOBJ.call( obj3 ); // name: obj3 <---- 看！！！

// 绑定丢失，应用软绑定
setTimeout( obj2.foo, 10 ); // name: obj
```

#### this词法 , 箭头函数=>
根据外层（函数或者全局）作用域（词法作用域）来决定this。
foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到obj1，bar(引用箭头函数)的this也会绑定到obj1，箭头函数的绑定无法被修改(new也不行)。
```javascript
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log( this.a );
    };
}
var obj1 = {
    a: 2
};
var obj2 = {
    a: 3
}
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2，不是3！
```
