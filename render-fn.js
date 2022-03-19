import { h } from 'vue'
// const App = {
//   render() {
//     // v-if="ok"
//     return this.ok
//       ? h('div', { id: 'hello', }, [h('span', 'world')])
//       : this.otherCondition //v-if="otherConfition"
//         ? h('p', 'other branch')
//         : h('p', 'other other')
//   }
// }
// //<div id="hello"></div>

// const AppList = {
//   render() {
//     // v-for="item in list"
//     return this.list.map(item => {
//       return h('div', { key: item.id }, item.text)
//     })
//   }
// }

const Stack = {
  render() {
    //function
    const slot = this.$slots.default
      ? this.$slots.default()
      : [];//return array
    // slot.map(vnode => {
    //   return h('div', slot);
    // })
    return h('div', { class: 'stack' }, slots.map(child => {
      return h('div', { class: "mt-${this.$props.size}" }, [child])
    }));
  }
}




