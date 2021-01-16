# Recipe Comparer
This is a React and Express app for comparing recipes! Currently deployed (in development) at https://recipe-comparer.herokuapp.com/.

## Development
The frontend lives within the `client` folder, and the backend lives within the `server` folder. Each has their own `package.json` - install packages for the frontend/backend within their respective folders. The global `package.json` is used to run the app as a whole (in deployment) and doesn't have any npm modules associated with it.

During development, run the frontend and the backend separately, even though they will be deployed together in production.

### Frontend
The React frontend is built using CRA and runs on localhost:3000.

To start the frontend:
```
cd client
npm start

OR

npm start --prefix client
```

### Backend
The Node/Express backend is built using the Express application generator and runs on localhost:3001. (localhost:3001 will look like the frontend, but it will only update on new frontend builds, so you need to run the frontend separately as well)

To start the backend (with nodemon):
```
cd server
npm run dev

OR

npm run dev --prefix server
```

## Deployment
The app is deployed on Heroku at https://recipe-comparer.herokuapp.com/.

The entire app, frontend and backend, uses one deployment through the `heroku-postbuild` script (the frontend is built in /client/build, and the server serves the built files).
