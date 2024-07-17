# Use the official Node.js image as a base image
FROM node:22-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn
RUN npm install typescript -g

# Copy the rest of the application code
COPY . .
RUN tsc

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]

