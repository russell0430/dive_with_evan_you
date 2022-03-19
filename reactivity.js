// let update, state;
// const onstateChange = _update => {
//   update = _update;
// }
// //react style
// // onstateChange(() => {
// //   view => render(state);
// // })
// const setState = newState => {
//   state=newState;
//   update();
// }

// onstateChange(()=>{
//   console.log(state.count);
// })

// import{reactive,watcEffect} from'vue'
const state=reactive({count:0})
watchEffect(()=>{
  console.log(state.count);
})

