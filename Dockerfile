FROM node:20
LABEL author="Giorgi Magradze"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 80

# Run the app
RUN npx prisma generate
RUN npm run build

CMD [ "npm", "start" ]