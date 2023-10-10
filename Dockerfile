# build stage
FROM node:alpine as build-stage
ENV PUBLIC_PATH="/"
ENV VUE_APP_SERVER_URL="http://localhost:3000"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]