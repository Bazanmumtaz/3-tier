FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --chown=node:node .output/ ./

USER node

EXPOSE 3000

CMD ["node", "server/index.mjs"]
