# Specify the base image
FROM node:14-alpine

# Set your github username (OPTIONAL)
LABEL username="alpha037"

# Set the working directory
WORKDIR /usr/src/app

# Set the PATH and NODE_PATH
# environment variables to
# run the "ngcc" command
# without any errors
ENV PATH=${PATH}:./node_modules/.bin
ENV NODE_PATH=/usr/src/app/node_modules

# Copy over the depedencies
# and install them. You can
# also use "npm ci"
COPY package*.json ./
RUN npm install

# Run angular compatibility
# compiler as a separate step
# to cache this layer
RUN ngcc

# Copy over the source code
COPY . .

# After that, run your
# app build command
RUN npm run build:ssr

# Expose the necessary port
EXPOSE 8080

# Finally, serve your app
CMD ["npm", "run", "serve:ssr"]