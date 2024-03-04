FROM node:18-slim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Set an appropriate initial memory limit for the container
# Adjust based on your test environment and application needs.
# This serves as a starting point for observation, not a strict limitation.


CMD ["node", "--expose-gc", "app.js"]
