https://youtu.be/0MEpPU3rWCk?si=dByh_0Rt9Xn3LTPT
JavaScript.Ninja
#10 Криптономикон-1 - Vue.js: практика
https://gitlab.com/vuejs-club/youtube-course/cryptonomicon/-/tree/lesson1

1:30 Registration on cryptocompare.com 
3:00 Template design
3:14 Create app
`npx @vue/cli create cryptonomicon`
- Default ([Vue 3], babel, eslint)
- ESLint + Prettier
` cd cryptonomicon`

4:26 VS Code Plugins
ESLint
Prettier
Vetur

5:27 Start App.
`npm run serve`

6:34 Delte assets and components directories
6:51 App.vue
```vue
<template>Hello World.</template>
<script>
export default {
  name: 'App',
}
</script>
<style></style>
```
7:02 Add HTML and CSS from:
https://gitlab.com/vuejs-club/youtube-course/cryptonomicon/-/tree/lesson1

8:59 Connect CSS styles in App.vue
`<style src="./app.css"></style>`

9:48 Two ways binding

10:45 Add function data()  to script in App.vue
The function returns the object what describes a state of our component.
```
<script>
export default {
...
  data() {
    return {
      ticker: "default",
      tickers: [
        { name: "DEMO1", price: "-" },
        { name: "DEMO2", price: "2" },
        { name: "DEMO3", price: "-" }
      ]
    };
  },
...
}
</script>
```

12:08 Add v-model to HTML tag (v-model creates two ways binding data with tag)
```
  <input
    v-model="ticker"
    ...
```

13:19 Show value of variable in the HTML text field (interpolation syntax)
```
...
<dt class="text-sm font-medium text-gray-500 truncate">
  {{ t.name }} - USD
</dt>
...
```

14:15 Add listener on button click and call the function 'add'
```
...
  <button
    @click="add"
...
18:07 Add listener on Enter click and call the function 'add'
```
...
  <input
    v-model="ticker"
    @keydown.enter="add"
...
```

16:00 parameter method in script in App.vue. 
There are the functions what we can use in the template.
```
...
<script>
export default {
  name: "App",

  data() {
...
  },

  methods: {
    add() {
      const newTicker = {
        name: this.ticker,
        price: "-"
      };

      this.tickers.push(newTicker);
      this.ticker = "";
    },
    
    handleDelete(tickerToRemove) {
      this.tickers = this.tickers.filter( t => != tickerToRemove );
    }
    ....
  }
...
```
20:30 List or Array with 'v-for', element should have unique key.
```
...
 <div
  v-for="t in tickers"
  :key="t.name"
  @click="sel = t"
  class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
>
  <div class="px-4 py-5 sm:p-6 text-center">
    <dt class="text-sm font-medium text-gray-500 truncate">
      {{ t.name }} - USD
    </dt>
    <dd class="mt-1 text-3xl font-semibold text-gray-900">
      {{ t.price }}
    </dd>
  </div>
</div>

33:38 Structural directive IF
The v-if and v-for are not allowed in one element.
```
...
  <template v-if="tickers.length">
    <hr class="w-full border-t border-gray-600 my-4" />
...
```

35:52 Additional tag 'template'
```
<template>
...
  <template> ... </template>
...
</template>
```
-------------------------------------------------------------
https://youtu.be/Xzx8SCzrfXU?si=Rz_XZ1GlLEPuqF3R
JavaScript.Ninja
#11 Криптономикон-2 - Vue.js: практика
0:32 The element selection.
```
...
<script>
export default {
  name: "App",

  data() {
    return {
      ticker: "default",
      tickers: [
        { name: "DEMO1", price: "-" },
        { name: "DEMO2", price: "2" },
        { name: "DEMO3", price: "-" }
      ],
      sel: null,
    };
  },
  ...
```
1:20 Add 'sel' to HTML tag.
```
...
  <div
    v-for="t in tickers"
    :key="t.name"
    @click="sel = t"
...
```
2:26 Add CSS class to HTML tag.




