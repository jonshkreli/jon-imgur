'use strict'

var http = require('http');
const https = require('https')
const dotenv = require('dotenv');
dotenv.config({path: "../.env"});

const ClientID = process.env.ClientID

var server = http.createServer(function(req, res) {

    const path = "3" + req.url

    const options = {
        host: "api.imgur.com", path, headers: {
            'Authorization': `Client-ID ${ClientID}`
        }
    }

    // console.log(path)

    const http_req = https.request(options, http_res => {
        // console.log(`statusCode: ${http_res.statusCode}`)

        let data = ""

        http_res.on('data', d => {
            // console.log("data",d)
            data += d
        })

        http_res.on('end', () => {
            // console.log("end", data)
            res.writeHead(200, '', {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
            });
            res.end(data);
        })

        http_res.on('error', (error) => {
            console.log("http_res Error: " + error.message);
            res.writeHead(500);
            res.end({error});
        })

    }).on("error", (error) => {
        console.log("Error: " + error.message);
        res.writeHead(500);
        res.end({error});
    });

    http_req.end()
});

server.listen(4000);
