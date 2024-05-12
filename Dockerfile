FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY next-env.d.ts ./

RUN npm install

COPY public ./public
COPY styles ./styles
COPY pages ./pages

RUN npm run build

EXPOSE 3000

ENV STAGE=prod

CMD [ "npm", "start" ]
