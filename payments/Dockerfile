# -------------------------
# 1. Builder Stage
# -------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install ALL deps (prod + dev) if you have any build steps
RUN npm install

# Copy full project
COPY . .

# -------------------------
# 2. Production Stage
# -------------------------
FROM node:18-alpine AS production

WORKDIR /app

# Copy only package.json  
COPY package*.json ./

# Install ONLY production deps
RUN npm install --production

# Copy built code & source from builder
COPY --from=builder /app ./

EXPOSE 3000

CMD [ "npm", "start" ]