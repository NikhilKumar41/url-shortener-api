# Use Node image
FROM node:18

# Create app folder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]