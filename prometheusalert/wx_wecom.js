const formatTimeStamp = (timeStamp) => {
    var date = new Date(timeStamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    return Y+M+D+h+m+s
}

// 创建一个函数，该函数返回当前时间的字符串表示  
function getCurrentDateTime() {  
    const now = new Date();  
    const year = now.getFullYear();  
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以需要+1  
    const day = String(now.getDate()).padStart(2, '0');  
    const hours = String(now.getHours()).padStart(2, '0');  
    const minutes = String(now.getMinutes()).padStart(2, '0');  
    const seconds = String(now.getSeconds()).padStart(2, '0');  
  
    // 返回完整的日期时间字符串  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
}  
  
// 在脚本中的某个点调用此函数来获取当前日期时间  
const currentDateTimeString = getCurrentDateTime();  
console.log(currentDateTimeString); // 输出类似 "2024-06-03 14:30:45"

// 每秒更新一次当前日期时间  
setInterval(function() {  
    const currentDateTimeString = getCurrentDateTime();  
    //console.log(currentDateTimeString); // 每秒在控制台输出当前日期时间  
}, 1000); // 1000毫秒 = 1秒


exports.template = function(body) {
    //企业微信群机器人API，https://work.weixin.qq.com/help?person_id=1&doc_id=13376#markdown%E7%B1%BB%E5%9E%8B
    //prometheus alert manager webhook: https://prometheus.io/docs/alerting/configuration/#webhook_config
    var alerts = body.alerts;
    if ((body.status)=="firing") {
    var content = alerts.map(
        alert => {
            return [`## Name: ${alert.labels.alertname}`, "### Labels:"]
            .concat(Object.entries(alert.labels).map(label => `<font color="comment">${label[0]}: </font>${label[1]}`))
            .concat("### Annotations:")
            .concat(Object.entries(alert.annotations).map(annotation => `<font color="comment">${annotation[0]}: </font>${annotation[1]}`))
            //.concat(`###### Current Time: <font color="warning">${currentDateTimeString}</font>`)
            .join("\n")
        }
    ).concat(``).join("\n\n");
    return {
        
        msgtype: "markdown",
        markdown: {
            content: content
        }
    }
    }
    if ((body.status)=="resolved") {
    var content = alerts.map(
        alert => {
            return [`## Name: ${alert.labels.alertname}`, "### Labels:"]
            .concat(Object.entries(alert.labels).map(label => `<font color="comment">${label[0]}: </font>${label[1]}`))
            .concat("### Annotations:")
            .concat(Object.entries(alert.annotations).map(annotation => `<font color="comment">${annotation[0]}: </font>${annotation[1]}`))
            .concat(`###### Start Time: <font color="warning">${formatTimeStamp((Date.parse(alert.startsAt)))}</font>`)
            .concat(`###### End Time: <font color="info">${formatTimeStamp((Date.parse(alert.endsAt)))}</font>`)
            .join("\n")
        }
    ).concat(`###### Status: <font color="${body.status === 'firing' ? 'warning' : 'info'}">${body.status}</font>`).join("\n\n");
    return {

        msgtype: "markdown",
        markdown: {
            content: content
        }
    }
    }
}
