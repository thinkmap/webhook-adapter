FROM registry.cn-shanghai.aliyuncs.com/c-things/webhook-adapter-base:v1.0.0
ADD index.js /app/
ADD prometheusalert /app/prometheusalert
EXPOSE 80
ENTRYPOINT ["node", "/app/index.js", "--port=80"]
