FROM node:18.9.1

WORKDIR /workspace

COPY ./package.json ./package-lock.json ./
RUN npm ci --omit=dev

COPY src/index.js .
ENTRYPOINT ["node", "/workspace/index.js"]
