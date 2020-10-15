const http = require('http');

let code = `<html maa=a>
    <head>
        <style>
            .cls {
                width: 500px;
                height: 300px;
                background-color: orange;
            }
        </style>
    </head>
    <body>
        <div>
            <div class="cls">
                <a href="#"></a>
            </div>
            <div style="width: 500px; height: 300px; outline: 1px solid lightgreen"></div>
            <img src="imgUrl" />
        </div>
    </body>
</html>`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(code);
});

server.listen(8088);
