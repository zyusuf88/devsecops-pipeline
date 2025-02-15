FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build 



FROM nginx:alpine
RUN addgroup -S zeynab-user && adduser -S zeynab-user -G zeynab-user

RUN mkdir -p /var/cache/nginx/client_temp \
    && chown -R zeynab-user:zeynab-user /var/cache/nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

RUN chown -R zeynab-user:zeynab-user /usr/share/nginx/html
USER zeynab-user
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]     




