let http = require('http');
let fs = require('fs');
let url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const qs = require('querystring');
const cookieParser = require('cookie-parser');

let server = http.createServer(function(req, res)
{
    let parsedUrl = url.parse(req.url);
    let pathName = parsedUrl.pathname;
    let headers = req.headers;
    let method = req.method.toLocaleLowerCase();
    let payload = '';
    let decoder = new StringDecoder('utf-8');

    console.log(headers)

    req.on('data', chunk => {
        payload += chunk;
    })
    req.on('end' , chunk =>{
        if (method == 'post' && pathName == '/Login')
            fs.appendFile('./mynewfile.json' , JSON.stringify(qs.parse(payload)) + '\n' , function(err){
                if (err) throw err;
                console.log(typeof(payload));
                console.log('Added text to the file.');
        }) 
        payload += decoder.end();
    })
   
        res.writeHeader(200, {"Content-Type": "text/html"});   
        res.write('<h1 style="text-align:center">Welcome !!</h1>');
        res.end();       
}
)

server.listen(5500, console.log('O servidor está a ouvir na porta 5500'))
