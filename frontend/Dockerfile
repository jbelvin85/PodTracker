# Use a lightweight Node.js image, consistent with our stack
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Create a simple placeholder file to log a message
RUN echo "console.log('PodTracker Frontend service is running. Waiting for React app to be built in Phase 2.');" > server.js

# Expose the port that Vite will eventually use
EXPOSE 5173

# A command to keep the container running
CMD ["node", "server.js"]