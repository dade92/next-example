FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY tsconfig.json ./
COPY next.config.js ./
COPY next-env.d.ts ./
COPY .env.production .
COPY public ./public
COPY styles ./styles
COPY pages ./pages
COPY components ./components
COPY utils ./utils

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
