# Basic wrapper to run the service under test
FROM node:12.14.1-alpine@sha256:fe2cd1b5a9faf21497b73b37f24ad391ac39e72167e435217e9009c836e6da5d

# Need this build arg setting at build time
ARG NPM_REGISTRY_URL=https://registry.npmjs.org/

# Location for all app files within container
ARG APP_FOLDER=/opt/app/

# Generate deployable package
WORKDIR ${APP_FOLDER}
COPY . .
RUN npm config set registry ${NPM_REGISTRY_URL}
RUN npm ci --production --no-optional

# Make dir for statis assets
RUN mkdir static/

# Run
ENTRYPOINT ["npm", "start"]
