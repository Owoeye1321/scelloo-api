
ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV development


WORKDIR /app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY package.json package.json
COPY package-lock.json package-lock.json

# Expose the port that the application listens on.
EXPOSE 5050

# Run the application.
CMD ["npm", "run", "nodemon"]
