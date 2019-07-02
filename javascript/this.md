## this�İ󶨹���
- Ĭ�ϰ�
- ��ʽ��
- ��ʾ��
- new��
- ��ͷ������

---

#### Ĭ�ϰ�

1. ������������ ==���԰�Ĭ�ϰ󶨿������޷�Ӧ����������ʱ��Ĭ�Ϲ���thisָ��ȫ�ֶ���==
2. �ϸ�ģʽ
==���ܽ�ȫ�ֶ�������Ĭ�ϰ󶨣�this��󶨵�++undefined++��ֻ�к��������ڷ��ϸ�ģʽ�£�Ĭ�ϰ󶨲��ܰ󶨵�ȫ�ֶ���==

```javascript
function foo() { // �������ϸ�ģʽ�£�this��󶨵�undefined
    "use strict";
    console.log( this.a );
}
var a = 2;
// ����
foo(); // TypeError: Cannot read property 'a' of undefined
```

#### ��ʽ��

�����������������Ķ���ʱ����ʽ�󶨹����Ѻ����е�this�󶨵���������Ķ��󡣶���������������ֻ����һ�����˵���һ���ڵ����������á�

> ��ʽ��ʧ

����ʽ�󶨵ĺ����ض�����»ᶪʧ�󶨶���Ӧ��Ĭ�ϰ󶨣���this�󶨵�ȫ�ֶ������undefined�ϡ�

```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // ��������
var a = "oops, global"; // a��ȫ�ֶ��������
bar(); // "oops, global"
```

#### ��ʽ��

ͨ��++call(..) ���� apply(..)����++����һ��������һ�������ڵ��ú���ʱ���������󶨵�this����Ϊֱ��ָ��this�İ󶨶��󣬳�֮Ϊ��ʾ�󶨡�

```javascript
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2
};
var a = 3;
foo.call(obj); // 2  ����fooʱǿ�ư�foo��this�󶨵�obj��
```
> ��ʾ�󶨽���󶨶�ʧ����

1. Ӳ��

��������bar()�����������ڲ��ֶ�����foo.call(obj)��ǿ�ư�foo��this�󶨵���obj.
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
// Ӳ�󶨵�bar���������޸�����this
bar.call( window ); // 2
```

```javascript
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// �򵥵ĸ����󶨺���
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}

var obj = {
    a: 2
};

var bar = bind( foo, obj ); 
//ES5������Function.prototype.bind��bind�᷵��һ��Ӳ�󶨵��º���

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```
2. API����ִ����������

JS������ú����ṩ��һ����ѡ����������֮Ϊ�������ġ���context���������ú�bind(..)һ����ȷ���ص�����ʹ��ָ����this����Щ����ʵ����ͨ��call(..)��apply(..)ʵ������ʽ�󶨡�
```javascript
function foo(el) {
	console.log( el, this.id );
}
var obj = {
    id: "awesome"
}
var myArray = [1, 2, 3]
// ����foo(..)ʱ��this�󶨵�obj
myArray.forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

#### new��
- ��JS�У����캯��ֻ��ʹ��new������ʱ�����õ���ͨ���������ǲ�����ĳ���࣬Ҳ����ʵ����һ���ࡣ
- �������ö�����������Number(..)�����ڵ����к�����������new�����ã����ֺ������ñ���Ϊ���캯�����á�
- ʵ���ϲ���������ν�ġ����캯������ֻ�ж��ں����ġ�������á���

```javascript
ʹ��new�����ú���������˵�������캯������ʱ�����Զ�ִ������Ĳ�����
1������������˵���죩һ���¶���
2������¶���ᱻִ��[[Prototype]]���ӡ�
3������¶����󶨵��������õ�this��
4���������û�з�������������ônew���ʽ�еĺ������û��Զ���������¶���

function foo(a) {
    this.a = a;
}
var bar = new foo(2); // bar��foo(..)�����е�this���а�
console.log( bar.a ); // 2

��дһ��newʵ��
function create() {
    var obj = new Object() // ����һ���յĶ���
    Con = [].shift.call(arguments) 	// ��ù��캯����arguments��ȥ����һ������
    obj.__proto__ = Con.prototype // ���ӵ�ԭ�ͣ�obj ���Է��ʵ����캯��ԭ���е�����
    var ret = Con.apply(obj, arguments)// �� this ʵ�ּ̳У�obj ���Է��ʵ����캯���е�����
	return ret instanceof Object ? ret : obj // ���ȷ��ع��캯�����صĶ���
};

1����new Object() �ķ�ʽ�½���һ������obj
2��ȡ����һ����������������Ҫ����Ĺ��캯����������Ϊ shift ���޸�ԭ���飬���� arguments �ᱻȥ����һ������
3���� obj ��ԭ��ָ���캯��������obj�Ϳ��Է��ʵ����캯��ԭ���е�����
4��ʹ�� apply���ı乹�캯�� this ��ָ���½��Ķ������� obj �Ϳ��Է��ʵ����캯���е�����
5������ obj
```

#### ���
- Ӳ�󶨿��԰�thisǿ�ư󶨵�ָ���Ķ���new���⣩����ֹ��������Ӧ��Ĭ�ϰ󶨹��򡣵��ǻή�ͺ���������ԣ�ʹ��Ӳ��֮����޷�ʹ����ʽ�󶨻�����ʽ�����޸�this��
- �����Ĭ�ϰ�ָ��һ��ȫ�ֶ����undefined�����ֵ���ǾͿ���ʵ�ֺ�Ӳ����ͬ��Ч����ͬʱ������ʽ�󶨻�����ʾ���޸�this��������

```javascript
// Ĭ�ϰ󶨹������ȼ������
// ���this�󶨵�ȫ�ֶ������undefined���ǾͰ�ָ����Ĭ�϶���obj�󶨵�this,���򲻻��޸�this
if(!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // ��������curried����
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

// ��󶨰汾��foo()�����ֶ���this�󶨵�obj2����obj3�ϣ������Ӧ��Ĭ�ϰ󶨣���Ὣthis�󶨵�obj��

function foo() {
    console.log("name:" + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

// Ĭ�ϰ󶨣�Ӧ����󶨣���󶨰�this�󶨵�Ĭ�϶���obj
var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj 

// ��ʽ�󶨹���
obj2.foo = foo.softBind( obj );
obj2.foo(); // name: obj2 <---- ��������

// ��ʽ�󶨹���
fooOBJ.call( obj3 ); // name: obj3 <---- ��������

// �󶨶�ʧ��Ӧ�����
setTimeout( obj2.foo, 10 ); // name: obj
```

#### this�ʷ� , ��ͷ����=>
������㣨��������ȫ�֣������򣨴ʷ�������������this��
foo()�ڲ������ļ�ͷ�����Ჶ�����ʱfoo()��this������foo()��this�󶨵�obj1��bar(���ü�ͷ����)��thisҲ��󶨵�obj1����ͷ�����İ��޷����޸�(newҲ����)��
```javascript
function foo() {
    // ����һ����ͷ����
    return (a) => {
        // this�̳���foo()
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
bar.call( obj2 ); // 2������3��
```