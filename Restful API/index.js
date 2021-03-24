const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function(req,res){
    
    //Get the URL and parse it
    let parsedURL = url.parse(req.url,true);
    
    //Get the path
    let path = parsedURL.pathname;
    let trimmedPath = path.replace(/^\/+|\/$/g,'');
    
    //Get the query string as an object
    let queryStringObject = parsedURL.query;

    //Get the HTTP method
    let method = req.method.toLowerCase();

    //Get the headers as an object
    let headers = req.headers

    //Get the payload, if any
    let decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();
    })
    //Send the response
    res.end('Ola Tiago, tudo bem ? Estou a ouvir...faz o teu request.')    
    
    //Log the request path
    console.log('Request received with this query :  : ', queryStringObject , 'and this headers '+ headers )
})
  
server.listen(3000, function()
{   
    console.log('O servidor está a ouvir na porta 3000')
})

//Defining the handlers
let handlers = {

}

//Define the sample

handlers.sample = function(data, callback){

}

//Not found handler
handlers.notFound = function(data, callback){
    
}

// Defining a request router
let router = 
{
    'sample' : 
}