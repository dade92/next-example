# NEXT EXAMPLE

This project is a POC on Next.js technology. To see the running application, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Inside the `./pages` folder you can find the main page components, while
inside the `./pages/api` there are the exposed (simple) APIs.


## CI/CD

There is a pipeline implemented using Github actions attached to the project. 
You can read it on `./github/workflow/ci.yml`.

## Dockerization

Application is dockerized, and pushed on a Amazon ECR. Inside the 
`Dockerfile` you can find the image building process.