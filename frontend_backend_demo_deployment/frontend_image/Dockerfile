FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY index.html App.js .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]