const http = require('http');
const staticServer = require('node-static');
const server = new staticServer.Server(`${__dirname}/`, {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*',
        'Access-Control-Allow-Headers': '*',
    }
});
const PORT = 3000;
http.createServer((req, res) =>{
    console.log(req.headers);
    server.serve(req, res);
}).listen(PORT);
console.log(`Server started on ${PORT}`);