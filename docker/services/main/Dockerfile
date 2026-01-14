FROM node:24-alpine

WORKDIR /app

# Copy source
COPY . .
RUN npm install
RUN npm run build

# PM2
RUN npm install -g pm2
COPY docker/services/main/ecosystem.config.js ./

EXPOSE 80

CMD ["pm2-runtime", "ecosystem.config.js"]
