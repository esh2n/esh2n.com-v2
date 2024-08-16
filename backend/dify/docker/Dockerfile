FROM nginx:latest

COPY ./nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./nginx/proxy.conf.template /etc/nginx/proxy.conf.template
COPY ./nginx/https.conf.template /etc/nginx/https.conf.template
COPY ./nginx/conf.d /etc/nginx/conf.d
COPY ./nginx/docker-entrypoint.sh /docker-entrypoint.sh
COPY ./nginx/ssl /etc/ssl

RUN chmod +x /docker-entrypoint.sh

ENV API_HOST=http://127.0.0.1:5001 \
    WEB_HOST=http://127.0.0.1:3000 \
    NGINX_SERVER_NAME=_ \
    NGINX_HTTPS_ENABLED=false \
    NGINX_SSL_PORT=443 \
    NGINX_PORT=80 \
    API_UPSTREAM=http://127.0.0.1:5001 \
    WEB_UPSTREAM=http://127.0.0.1:3000 \
    NGINX_SSL_CERT_FILENAME=dify.crt \
    NGINX_SSL_CERT_KEY_FILENAME=dify.key \
    NGINX_SSL_PROTOCOLS="TLSv1.1 TLSv1.2 TLSv1.3" \
    NGINX_WORKER_PROCESSES=auto \
    NGINX_CLIENT_MAX_BODY_SIZE=15M \
    NGINX_KEEPALIVE_TIMEOUT=65 \
    NGINX_PROXY_READ_TIMEOUT=3600s \
    NGINX_PROXY_SEND_TIMEOUT=3600s \
    NGINX_ENABLE_CERTBOT_CHALLENGE=false

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 8080 443