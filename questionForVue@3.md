在视频里https://www.bilibili.com/video/BV1SZ4y1x7a9?p=4,感觉他的computed实现的不太对劲,就做了个测试.以下在chrome上进行的测试

## 视频中的做法

```html
<script src="https://unpkg.com/vue@next"></script>
<script>
  const { watchEffect,ref ,reactive} = Vue;
  let r;
  let state=reactive({a:0});
  function computed(getter){
    let result=ref(0);
    watchEffect(()=>result.value=getter());
    return result;
  }
  r=computed(()=>{
    console.log("inside called",state.a);
    return state.a+1;
  })

  state.a=114;//check if inside called
  console.log(".....end......",);
  // console.log(r.value);
</script>
```

这里computed直接使用了watchEffect了,逻辑和我之前理解的不一样.computed里面的依赖发生改变的时候,函数不执行,而在获取computed的结果时查看缓存,或者再进行结果计算,这里直接依赖改变就执行watch,就相当于watch给一个固定值赋值罢了,这作者偷懒了.(可能是为了简化).

上面代码输出结果

```
TestForComputed.html:12 inside called 0
TestForComputed.html:18 .....end......
TestForComputed.html:12 inside called 114
```

符合预期,watchEffect首先执行一次,之后改变了state.a,再执行一次,只是没想到vue的watchEffect原码中响应式的时候可能是是使用微任务执行的?(也可能是又开了个宏任务,反正不是同步的)watchEffect里面的函数再次触发时竟在end后面.

###  源码中的效果 computed

```html
<script src="https://unpkg.com/vue@next"></script>
<script>
  const { watchEffect,ref ,computed,reactive} = Vue;
  let r;
  let state=reactive({a:0});
  // function computed(getter){
  //   let result=ref();
  //   watchEffect(()=>result.value=getter());
  //   return result;
  // }
  r=computed(()=>{
    console.log("inside called",state.a);
    return state.a+1;
  })

  state.a=114;//check if inside called
  // console.log(r.value);
  console.log(".....end......",);
</script>
```

```
TestForComputed.html:18 .....end......
```

这里state.a依赖改变,没有触发computed里面的函数,(等到要使用r的时候才调用)

倒数第二行注释取消后如下

```
TestForComputed.html:12 inside called 114
TestForComputed.html:17 115
TestForComputed.html:18 .....end......
```

首先需要r,所以computed计算获得值,所以打印了"inside called",之后打印computed的计算结果,最后结束

附上watch的使用

 watch :watch( ( )=> state.count , ( newValue , oldValue ) => {} )

 source : state.count , callback , define a source that can be a function that returns something, and another callback.

if the result of source has not changed the callabck would not be called