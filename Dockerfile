# Base image
FROM node:18

# Create app directory
WORKDIR /

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY tsconfig*.json ./
COPY package*.json .

# Install app dependencies
RUN npm ci

# Bundle app source
COPY src/ src/

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the production build
CMD ["npm", "run", "start:prod"]