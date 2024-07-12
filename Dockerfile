FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY .next ./.next
COPY dist ./dist
COPY node_modules ./node_modules

EXPOSE 3000

CMD [ "npm", "start" ]
