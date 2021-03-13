# esbuild-sandbox

## Things I did

building node bundle of React SSR

```
yarn add esbuild
yarn add react react-dom

mkdir -p src
touch src/index.jsx
echo "
import * as React from 'react'
import * as Server from 'react-dom/server'

let Greet = () => <h1>Hello, world!</h1>
console.log(Server.renderToString(<Greet />))
" > src/index.jsx

export PATH=$PATH:./node_modules/.bin

esbuild ./src/index.jsx --bundle --outfile=out.js

node out.js
```

without bundling (ESM)

```
esbuild ./src/index.jsx --bundle --outfile=out.mjs
```

typescript

```
tsc --noEmit ./src/index.ts \
 && esbuild ./src/index.ts --bundle --outfile=out.js
```
