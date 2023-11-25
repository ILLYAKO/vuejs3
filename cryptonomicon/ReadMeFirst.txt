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
----------------------------------------------------------
https://youtu.be/BNDo6MVbPn4?si=3q-4dusjuJ1l-JeH
JavaScript.Ninja
#16 Криптономикон-5: Работа со списком - Vue.js: практика

0:46 Save data in local storage
```
  methods: {
    add() {
      const currentTicker = {
        name: this.ticker,
        price: "-"
      };
      this.tickers.push(currentTicker);

      localStorage.setItem('cryptonomicon-list', JSON.stringify(this.tickers));
      this.subscribeToUpdates(currentTicker.name);
      ...
    }
  }

1:22 Load data from localStorage
```
<script>
export default {
...
  created() {
    const tickersData = localStorage.getItem('cryptonomicon-list');
    if(tickersData) {
      this.tickers = JSON.parse(tickersData);
      this.tickers.forEach(ticker => this.subscribeToUpdates(ticker.name))
    }
  },
...
}
```

3:05 Create new method subscribeToUpdates
```
...
subscribeToUpdates(tickerName) {
  setInterval(async () => {
    const f = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4`
    );
    const data = await f.json();

    // currentTicker.price =  data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);
    this.tickers.find(t => t.name === tickerName).price =
      data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);

    if (this.sel?.name === tickerName) {
      this.graph.push(data.USD);
    }
  }, 5000);
  
  this.ticker = "";
},
...
```
6:58 Add filter in app.vue
```
<template v-if="tickers.length">
  <hr class="w-full border-t border-gray-600 my-4" />
  <div>
    <button
      type="button"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Back
    </button>
    <button
      type="button"
      class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Forward
    </button>
    <div>Filter: <input type="text" /> </div>
  </div>
  ...
  ```
10:12 Pagination

11:40 add function filteredTickers
```
...
          <div
            v-for="t in filteredTickers()"
            ...
            ```()
  ```
  ...
    methods: {
    filteredTickers
  ```
  ...
            <div
            v-for="t in filteredTickers()"
            ...
            ```() {
      return this.tickers.filter(ticker => ticker.name.includes(this.filter));
    },
  ...
  }
  ```
12:26 Return to template the filteredTickers
```
...
  <div
    v-for="t in filteredTickers()"
...
```
14:49 Pagination
```
  methods: {

    filteredTickers() {
      const start = (this.page - 1) * 6;
      const end = this.page * 6;
      return this.tickers
        .filter(ticker => ticker.name.includes(this.filter))
        .slice(start, end);
    },
    ...
  }
```
17:35 Add button action on click of forward and Back
```
  <button
    type="button"
    class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    @click="page = page - 1"
    >
      Back
  </button>
  <button
    type="button"
    class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    @click="page = page + 1"

    >
      Forward
  </button>
```
18:54 Add hasNextPage in data()
```
  data() {
    return {
...
      hasNextPage: true,
```
20:12 change filteredTickers ()
```
  methods: {
    filteredTickers() {
      const start = (this.page - 1) * 6;
      const end = this.page * 6;
      const filteredTickers = this.tickers
        .filter(ticker => ticker.name.includes(this.filter));
      this.hasNextPage = filteredTickers.length > end;
      return filteredTickers.slice(start, end);
    },
...
```  
20:52 Add condition to forward button
```
          <button
            type="button"
            class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            @click="page = page + 1"
            v-if="hasNextPage"
            >
              Forward
          </button>
```
21:49 Erase filter content and go to the first page
```
 <div>Filter: <input v-model="filter" @input="page=1" /> </div>
```
23:20 watch what watch for variable filter
```
...
  watch: {
    filter() {
      this.page = 1;
    }
  }
};
</script>
```
24:16 History.pushState()
https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
```
...
  watch: {
    filter() {
      this.page = 1;
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${this.filter}&page${this.page}`
      );
    },
    page() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?filter=${this.filter}&page${this.page}`
      );
    },
  }
```
28:31 Read from windowData
```
...
  created() {
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );
    if(windowData.filter) {
      this.filter = windowData.filter;
    }
    if(windowData.page) {
      this.page = windowData.page;
    }
    const tickersData = localStorage.getItem('cryptonomicon-list');
    if(tickersData) {
      this.tickers = JSON.parse(tickersData);
      this.tickers.forEach(ticker => this.subscribeToUpdates(ticker.name))
    }
  },
  ...
```
--------------------------------------------------------------------
https://www.youtube.com/live/_esgbWGiP3c?si=TJZO-up0ZwJrJon9
#17 Криптономикон: рефакторинг - Vue.js: практика

34:21 computed. Vue saves results of computed in the cash and recompute when inner parameter were changed 

https://www.youtube.com/live/AzsO67rloQw?si=NvqyC32ybQoPdFEt
#18 Криптономикон: рефакторинг - Vue.js: практика

20:43 Create scr/app.js - transport layer
```
const API_KEY ='4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4';

// TODO: refactor to use URLSearchParams
export const loadTicker = tickerName =>
fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${tickerName}&tsyms=USD&api_key=${API_KEY}`
    ).then(res => res.json());
```
22:23 aff import of app.js to App.vue
```
import { loadTicker } from './app';
...
  methods: {
    subscribeToUpdates(tickerName) {

      setInterval(async () => {
        const ticker = loadTicker(tickerName);
...
```
47:29 Websocket
49:56 Subscription to Websocket in app.js
```
...
export const subscribeToTicker = (ticker, cb) => {
    const subscribers = tickers.get(ticker) || [];
    tickers.set(ticker, [...subscribers, cb])
};

export const unsubscribeToTicker = (ticker, cb) => {
    const subscribers = tickers.get(ticker) || [];
    tickers.set(
        ticker,
        [...subscribers, subscribers.filter(fn => fn != cb)]
    );
};
...
```
59:25 Add subscribe to ticker in App.vue
1:10:20 add function updateTicker to methods in App.vue
1:16:50 Websocket 
https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
https://min-api.cryptocompare.com/documentation/websockets
1:18:55 Browser console:
const socket =new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4')

1:19:04 Browser -> Network -> WS
1:20:32 Sent socket request
1:22:07 Browser-> console
socket.send(JSON.stringify({
  "action": "SubAdd",
  subs: ["5~CCCAGG~BTC~USD"]
  }))
1:23:10 Create socket in app.js
const socket = new WebSocket(
    `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

1:24:09 Create function in app.js
function subscribeToTickerOnWs(ticker) {
    socket.send(
        JSON.stringify({
            action: "SubAdd",
            subs: [`5~CCCAGG~${ticker}~USD`],
        })
    );
}

1:24:47 Add event listener of websocket
function subscribeToTickerOnWs(ticker) {
    const message = JSON.stringify({
        action: "SubAdd",
        subs: [`5~CCCAGG~${ticker}~USD`],
    });
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        return;
    }
    socket.addEventListener(
        "open",
        () => {
            socket.send(message);
        },
        { once: true }
    );
}

1:31:59 Remove Ticker
---------------------------------------------
https://youtu.be/uWDmfA7WE5Q?si=npU-R8YlcP3mLZPC
#22 Криптономикон: refs - Vue.js: практика
2:53 Ref is an opportunity to get a link to the object(DOM node) that we drawn in the template
Ref is not reacted.
```
  <div
      class="flex items-end border-gray-600 border-b border-l h-64"
      ref="graph"
  >
```
```
...
    methods: {
        updateTicker(tickerName, price) {
            console.log("updateTicker: ", this.$refs.graph);
...
```
-------------------------------------------------------
https://youtu.be/zluGw3aJAMs?si=lVaB07VHfXQcHn8_
#23 nextTick - Vue.js: нюансы
nextTick we use than we need to wait for renew the DOM in response to our actions.
```
...
    watch: {
        selectedTicker() {
            this.graph = [];
            this.$nextTick().then(this.calculateMaxGraphElements);
        },
...
```
------------------------------------------------------------
https://youtu.be/Ql5nV-G-nOs?si=6jr2VOGzOX8IBeRc
#24 Криптономикон: компоненты - Vue.js: практика

2:54 Create directory src/components and file PlusSign.vue
3:49 Import component
```
<script>
import PlusSignIcon from "./components/PlusSignIcon.vue";

export default {
    name: "App",

    components: {
        PlusSignIcon,
    },
...
}
```
5:20 Create component in HTML stile. the component name should have 2 words and more.
Put a dash between the words.
```
<template>
...
  <plus-sign-icon />
...
</template>

10:24 Create new block as component AddTicker.vue

13:50 Emit event in AddTicker.vue with data
14:19 method $emit in child component
```
...
methods: {
    add() {
        this.$emit("add-ticker", this.ticker);
        this.ticker = "";
    },
},
...
```
15:10 Catch an emitted event in parent component App.vue and get data emitted from child component
```
...
 <add-ticker @add-ticker="add" />
...
```
15:55  get data emitted from child component
```
...
methods: {
  ...  
    add(ticker) {
        const currentTicker = {
            name: ticker,
            price: "-",
        };
        ...
    }
}
...
```
16:51 Transfer data from parent App.vue to child component
```
<add-ticker @add-ticker="add" :disabled="tooManyTickersAdded" />
...
  computed: {
      tooManyTickersAdded() {
          return this.tickers.length > 4;
      },
      ...
  }
```
18:38 Get props in child component AddTicker.vue
the props is available in "this."
```
...
<script>
import AddButton from "./AddButton.vue";

export default {
    components: { AddButton },
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
}
...
```
23:17 vue3 emit fields. 
We can check what child component emits to parent component.
```
...
<script>
export default {
  ...
    emits: {
        "add-ticker": (value) => typeof value === "string",
    },
    ...
}
...
```
---------------------------------------------------------
https://youtu.be/0Uv9DkaYquk?si=bxr31vgCEE5Cse1l
#25 Нативные события - Vue.js: нюансы
-------------------------------------------------------
https://youtu.be/prIBI_ykIPo?si=r-cV6d5pqVp45YtK
#26 Всплытие событий - Vue.js: нюансы





