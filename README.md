# webhook-adapter
```bash
node index.js --port=8080 --adapter=./prometheusalert/wx.js=/wx=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={key} --adapter=./prometheusalert/dingtalk.js=/dingtalk=https://oapi.dingtalk.com/robot/send?access_token={token}#{secret}
```

## docker
```bash
docker run --name webhook-adapter -p 8080:80 -d registry.cn-shanghai.aliyuncs.com/c-things/webhook-adapter:v1.0.0 --adapter=/app/prometheusalert/wx.js=/wx=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={key} --adapter=/app/prometheusalert/dingtalk.js=/dingtalk=https://oapi.dingtalk.com/robot/send?access_token={token}#{secret}
```
## k8s
```cat prometheus-webhook.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    run: prometheus-webhook
  name: prometheus-webhook
  namespace: kube-stack
spec:
  selector:
    matchLabels:
      run: prometheus-webhook
  template:
    metadata:
      labels:
        run: prometheus-webhook
    spec:
      containers:
      - args:
        - --adapter=/app/prometheusalert/wx.js=/adapter/wx=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=4ee7fb39-d381-49ca-b33c-f35acd61d8f8
        image: registry.cn-shanghai.aliyuncs.com/c-things/webhook-adapter:v1.0.0  
        name: prometheus-webhook
        ports:
        - containerPort: 80
          protocol: TCP
 
---
apiVersion: v1
kind: Service
metadata:
  labels:
    run: prometheus-webhook
  name: prometheus-webhook
  namespace: kube-stack
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    run: prometheus-webhook
  type: ClusterIP
  ```
