FROM node:18.9.1 as builder
SHELL ["/bin/bash", "-c"]

WORKDIR /workspace

ADD package-lock.json package.json src/
RUN --mount=type=cache,target=/workspace/.npm \
        npm set cache /workspace/.npm && \
        npm ci --production

FROM node:18.9.1-slim
SHELL ["/bin/bash", "-c"]

WORKDIR /workspace

COPY --from=builder /workspace/node_modules /workspace/node_modules
COPY --from=builder /workspace/package.json /workspace
COPY --from=builder /workspace/src /workspace/src

CMD ["node", "/workspace/src/index.js"]