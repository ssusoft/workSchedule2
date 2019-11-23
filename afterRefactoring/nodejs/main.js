var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
const md = require('/tmp/guest-5ero8u/Desktop/workSchedule2-master/afterRefactoring/lib/template.js');
const func = require('/tmp/guest-5ero8u/Desktop/workSchedule2-master/afterRefactoring/lib/function.js');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){
            var html = md.frame(`
            <meta charset='utf-8'>
            <style>
                .container{display:table;}
                .row{display:table-row;}
                .cell{display:table-cell; width:20%; text-align:center; border-width:1px; border-style:solid; border-color:black;}
            </style>`,
            md.menu() + md.list('./json/unit2.json', 'false'));
            response.writeHead(200);
            response.end(html);
        }
        else{
            console.log("1.미완성");
        }
    }
    else if(pathname === '/gate'){ // 위병소
        console.log('pathname === /gate');
        var html = md.frame(`
            <meta charset='utf-8'>
            <style>
                .container{display:table;}
                .row{display:table-row;}
                .cell{display:table-cell; width:20%; text-align:center; border-width:1px; border-style:solid; border-color:black;}
            </style>`,
            md.menu() + md.list('./json/unit2.json', 'false'));

        response.writeHead(200);
        response.end(html);
    }
    else if(pathname === '/nightMove'){ // 동초
        console.log('pathname === /nightMove');
        response.writeHead(302, {Location:`/`});
        response.end(); 
    }
    else if(pathname === '/nightStand'){ // 불침번
        console.log('pathname === /nightStand');
        response.writeHead(302, {Location:`/`});
        response.end(); 
    }
    else if(pathname === '/cctv'){
        console.log('pathname === /cctv');
        response.writeHead(302, {Location:`/`});
        response.end(); 
    }
    else if(pathname === '/add'){
        console.log('pathname === /add');
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:20%; text-align:center; border-width:1px; border-style:solid; border-color:black;}
        </style>
        `,
        md.menu() + md.list('./json/unit2.json', 'false') + md.empty());
        response.writeHead(200);
        response.end(html);
    }
    else if(pathname === '/add_process'){
        console.log('pathname === /add_process');
        var body = '';
        request.on('data', function(data){
            body += data;
        })
        request.on('end', function(){
            func.refreshFile('./json/unit2.json', body);
            response.writeHead(302, {Location:`/`});
            response.end(); 
        })
    }
    else if(pathname === '/update'){
        console.log('pathname === /update');
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:20%; text-align:center; border-width:1px; border-style:solid; border-color:black;}
        </style>
        `,
        md.menu() + md.list('./json/unit2.json', 'true'));
        response.writeHead(200);
        response.end(html);
    }

    else if(pathname === '/update_process'){
        console.log("pathname === '/update_process'");
        var body = '';
        request.on('data', function(data){
            body += data;
        })
        request.on('end', function(){
            func.writeToFile(body);
            response.writeHead(302, {Location:`/`});
            response.end(); 
        })
    }
});
app.listen(3000);