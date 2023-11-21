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
```
...
  <div
    v-for="t in tickers"
    :key="t.name"
    @click="select(t)"
    :class="{
      'border-4': sel === t
    }"
    // :class="sel === t ? 'border-4' : ''"
...
```
5:01 prevent a default bottom behavior (event) stop propagation
```
...
  <button
    @click.stop="handleDelete(t)"
...
```
6:25 Get CryptoCompare API
4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4
7:06 Add Fetch from API
```
...
  setInterval(async () => {
    const f = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${currentTicker.name}&tsyms=USD&api_key=4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4`
    );
    const data = await f.json();

    // currentTicker.price =  data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);
    this.tickers.find(t => t.name === currentTicker.name).price =
      data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);

    if (this.sel?.name === currentTicker.name) {
      this.graph.push(data.USD);
    }
  }, 5000);
...
```
11:52 Add Graph
```
...
<script>
export default {
  name: "App",

  data() {
    return {
      ticker: "",
      tickers: [],
      sel: null,
      graph: []
    };
  },
...

        if (this.sel?.name === currentTicker.name) {
          this.graph.push(data.USD);
        }
        ...
``` 
13:45 Show graph

17:06 Create function 
```
...
  normalizeGraph() {
    const maxValue = Math.max(...this.graph);
    const minValue = Math.min(...this.graph);
    return this.graph.map(
      price => 5 + ((price - minValue) * 95) / (maxValue - minValue)
    );
  }
...
```
21:58 Clean graph
```
...
  <div
    v-for="t in tickers"
    :key="t.name"
    @click="select(t)"
...
select(ticker) {
  this.sel = ticker;
  this.graph = [];
},
...
```
----------------------------------------------------
https://youtu.be/p5y4lPbYee4?si=84rcdhS4slW5nFQ0

4:04 Add tailwind Package
vue-cli-plugin-tailwind
https://www.npmjs.com/package/vue-cli-plugin-tailwind
```
npx @vue/cli add tailwind
>minimal
```

5:38 Add tailwind Form Package
https://github.com/tailwindlabs/tailwindcss-forms
```
npm install -D @tailwindcss/forms
```

Then add the plugin to your tailwind.config.js file:
```
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
```
6:33 activate tailwind
https://tailwindcss.com/
https://tailwindcss.com/docs/installation
7:26 Add to app.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
7:34 Run app
```
npm run serve
```

9:34
`npm run build`

10:40 Add 'Tailwind CSS IntelliSense' plugin
12:09 replace tailwind in app.css
```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```
15:14 Delete app.css and from style of App.vue
#15