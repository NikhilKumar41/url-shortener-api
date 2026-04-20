# Step 1: Use official Node.js image (this gives me a ready environment)
FROM node:18

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json first (faster builds)
COPY package*.json ./

# Step 4: Install dependencies inside container
RUN npm install

# Step 5: Copy entire project into container
COPY . .

# Step 6: Tell Docker which port app uses
EXPOSE 3000

# Step 7: Command to start the app
CMD ["npm", "start"]