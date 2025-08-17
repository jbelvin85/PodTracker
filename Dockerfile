# Use a lightweight Node.js image, consistent with our stack
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This ensures that 'npm install' is only re-run when dependencies change.
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# The command to start the development server, which will watch for changes
CMD ["npm", "run", "dev"]