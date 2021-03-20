## Idea

I decided to try nest.js. 

Also found that grpc is quite scalable approach so picked that too.

Also I wanted to implement SSR with nest.js. And that was bad idea. I had to override the whole webpack config for it (see frontend/package.json start scripts).

So I spend whole day on that. Afterwards I got want I wanted: completely seperated backend and frontend that can accumulate any number of backends and render with SSR. I googled a lot about using SSR with nest.js and found 0 mentions about that. That's strange. Frontend is itself quite simple but fully functional and isomorphic (with Context API state management).

The only problem is that with my SSR approach I had to refuse to have hot module replacement and all frontend tests. There's no special restrictions on using them but I limited in time now. 

## How to run

First, we need to run books backend:

```
cd books/
npm install
npm start
```

And in separate tab react frontend:

```
cd frontend/
npm install
./node_modules/.bin/webpack
npm start
```

## TODO

Error handling on frontend server

Dockerize project + consider production env

Better test cases for BookService

Fix test cases for frontend (with separate webpack config or fixing `nest start`)

