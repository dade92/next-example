# MFLIX

This project is a POC on Nextjs technology. It interacts with a serverless MongoDB cluster
to fetch and show a list of movies (from 1930 to nowadays). It includes a signup/login feature too.

It was done for pure instructional purposes.

## Run locally
After cloned, use `npm i` to install all dependencies and then run the command:

```bash
npm run dev
```
To launch the web server locally. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In order to connect to the mongoDB instance locally, you have to provide proper credentials using the 
environment variables `MONGO_DB_USERNAME` and `MONGO_DB_PASSWORD`.

## Testing
The testing framework is Jest, you can run all the tests using the command: 
```bash
npm t
```
This will run all the tests with Jest providing the outcome in the console.

## CI/CD
There is a pipeline implemented using Github actions attached to the project. 
You can read it on `./github/workflow/ci.yml`.

## Deployment
The project is integrated with [Vercel framework](https://vercel.com). You can find the deployed application at
[this url](https://mflix-eight.vercel.app/).