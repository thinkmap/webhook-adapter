FROM node:14.20.1-alpine
# 替换阿里云的源
RUN echo "http://mirrors.aliyun.com/alpine/latest-stable/main/" > /etc/apk/repositories
RUN echo "http://mirrors.aliyun.com/alpine/latest-stable/community/" >> /etc/apk/repositories
RUN apk update --no-cache && apk upgrade --no-cache
# 设置时区
RUN apk --no-cache add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone
# 修正字符集
ENV LANG=en_US.utf8    

ADD package.json /app/dockerbase/
RUN cd /app/dockerbase && npm install --only=prod -g --registry=https://registry.npmmirror.com && ln -s /app/dockerbase/node_modules /app/node_modules

