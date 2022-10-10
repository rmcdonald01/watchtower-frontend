FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# COPY yarn.* ./

# install project dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# install project dependencies
# RUN yarn install 

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]