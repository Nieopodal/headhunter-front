FROM node:18.16.0 as builder
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*
RUN mkdir /usr/share/nginx/logs

COPY /nginx/nginx.conf /etc/nginx/conf.d/dafault.conf
COPY /nginx/cert/private.key /etc/ssl/private.key
COPY /nginx/cert/certificate.crt /etc/ssl/certificate.crt
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
