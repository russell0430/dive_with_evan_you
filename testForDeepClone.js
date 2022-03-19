const reference = ["Set", "WeakSet", "Map", "WeakMap", "RegExp", "Date", "Error"];

function deepClone(obj) {
  const cloneObj=Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors);
  //遍历对象,克隆属性
  //Reflect.ownKeys()=>本实例上的所有属性,包括不可枚举和可枚举
  //Obejct.keys()=>本实例上所有可枚举属性
  //for(let key of Object.keys(obj)) 有这种用法)(返回值有[Symbol.iterator]属性)
  for(let key of Reflect.ownKeys(obj)){
    const val=obj[key];
    const type=deepClone.getType(val);
    if(reference.includes(type)){
      cloneObj[key]=new val.constructor(val);
    }else if(typeof val=== 'object'&&val!=null){
      //递归克隆
      cloneObj[key]=deepClone(val);
    }
    //基本数据类型和function
    else cloneObj[key]=val;
  }
  return cloneObj;
}

deepClone.getType = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[|\]|object|\s/g, "");
}
const map = new Map();
map.set("key", "value");
map.set("ConardLi", "coder");

const set = new Set();
set.add("ConardLi");
set.add("coder");

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: "child",
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        let t = 0;
        console.log("coder", t++);
    },
    func2: function (a, b) {
        return a + b;
    },
};
//测试代码
// const test1 = deepClone(target);
// target.field4.push(9);
// target.func1=(n)=>2;
// console.log('test1: ', test1.func1);
let fn=(a)=>1;
let fn2=fn;
fn=(b)=>2;
debugger
console.log(fn2);


