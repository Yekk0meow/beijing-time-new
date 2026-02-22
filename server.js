const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/') {
        const now = new Date();
        // 北京时间 = UTC + 8小时
        const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
        
        // 格式化北京时间（用于静态缓存）
        const year = beijingTime.getUTCFullYear();
        const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
        const day = String(beijingTime.getUTCDate()).padStart(2, '0');
        const hours = String(beijingTime.getUTCHours()).padStart(2, '0');
        const minutes = String(beijingTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(beijingTime.getUTCSeconds()).padStart(2, '0');
        
        const beijingTimeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const unixTimestamp = Math.floor(now.getTime() / 1000);
        const isoTime = now.toISOString();
        const milliseconds = now.getTime();
        
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beijing Time Sync</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        h1 { margin-bottom: 30px; }
        .time-box { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; display: inline-block; margin: 20px; }
        .time-display { font-size: 3em; font-weight: bold; margin: 20px 0; }
        .info { margin-top: 30px; font-size: 0.9em; opacity: 0.8; }
        .cache-note { margin-top: 20px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 10px; }
    </style>
    <script>
        function updateTime() {
            const now = new Date();
            const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
            const year = beijingTime.getUTCFullYear();
            const month = String(beijingTime.getUTCMonth() + 1).padStart(2, '0');
            const day = String(beijingTime.getUTCDate()).padStart(2, '0');
            const hours = String(beijingTime.getUTCHours()).padStart(2, '0');
            const minutes = String(beijingTime.getUTCMinutes()).padStart(2, '0');
            const seconds = String(beijingTime.getUTCSeconds()).padStart(2, '0');
            const formatted = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            document.getElementById('dynamic-time').innerText = formatted;
            setTimeout(updateTime, 1000);
        }
        window.onload = updateTime;
    </script>
</head>
<body>
    <h1>🕒 Beijing Time Sync System</h1>
    <div class="time-box">
        <div>Current Beijing Time (UTC+8):</div>
        <div class="time-display" id="dynamic-time">Loading...</div>
        <div>Updated every second</div>
    </div>
    
    <div class="info">
        <p>This page displays the current Beijing time with a static cache for AI to read.</p>
        <div class="cache-note">
            <p><strong>AI-readable static cache:</strong> (hidden in page source)</p>
            <div id="static-cache" style="display:none;">
                <data id="cache-beijing-time">${beijingTimeStr}</data>
                <data id="cache-unix-timestamp">${unixTimestamp}</data>
                <data id="cache-iso-time">${isoTime}</data>
                <data id="cache-milliseconds">${milliseconds}</data>
                <data id="cache-generated">${new Date().toISOString()}</data>
            </div>
            <p>AI can read the time from the &lt;data&gt; tags in the HTML source.</p>
        </div>
    </div>
    
    <p style="margin-top: 40px; font-size: 0.8em;">Deployed with ❤️ for time-synchronized conversations</p>
</body>
</html>
        `;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
