FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install ALL deps (dev + prod)
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Run ts-node-dev in development mode
CMD ["npm", "run", "start"]
