FROM node:20-alpine3.19 AS builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build 



FROM nginx:alpine3.19-slim

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i 's|pid /var/run/nginx.pid;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf

# Change ownership of necessary directories
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    /var/cache/nginx \
    /var/run \
    /var/log/nginx \
    /etc/nginx
    

# Switch to non-root user
USER appuser

EXPOSE 3000

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]     




