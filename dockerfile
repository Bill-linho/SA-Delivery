FROM NODE:24-alpine AS Backend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY /backend .

EXPOSE 3000

CMD ["npm", "start"]

FROM NODE:24-alpine AS Frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY /frontend .

EXPOSE 5173

CMD ["npm", "run", "dev", "--" , "--host", "0.0.0.0", "--port", "5173"]