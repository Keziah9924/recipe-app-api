FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY npm.lock ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm build

# Stage 2: Create the runtime image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --production --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]