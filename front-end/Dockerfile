# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .


# Expose a port for the development server (usually 3000)
EXPOSE 8080

# Define the command to run your app when the container starts
CMD ["pnpm", "dev"]