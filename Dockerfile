FROM node:12

WORKDIR /app

COPY package.json /app/package.json
RUN npm install --silent

COPY . /app

EXPOSE 8080

CMD ["node", "index.js"]