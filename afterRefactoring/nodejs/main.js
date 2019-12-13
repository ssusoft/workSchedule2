var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
const md = require('../lib/template.js');
const func = require('../lib/function.js');
var cls = require('../lib/class.js');

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
                .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
            </style>`,
            md.menu());
            response.writeHead(200);
            response.end(html);
        }
        else{
            console.log("1.미완성");
        }
    }

    else if(pathname === '/main'){
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
        </style>`,
        md.menu());

        response.writeHead(200);
        response.end(html);
    }

    else if(pathname === '/make'){
        console.log('pathname === /make');
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
        </style>`,
        md.menu());
        var workerObj = func.makeWorkerObj('./json/unit2.json');
        var workerArr;
        workerObj = func.sortWorkerObj(workerObj);
        workerArr = func.assignWorker(workerObj);
        for(var i=0; i<12; ++i){
            console.log('workerArr[' + i + '].name : ' + workerArr[i].name);
        }
        response.writeHead(200);
        response.end(html);

    }

    else if(pathname === '/management'){
        console.log('pathname === /management');
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
        </style>`,
        md.menu() + '<p><a href="/add">add</a></p>' + '<p><a href="/update">update</a></p>' + '<p><a href="/make_guardroom">make_guardroom</a></p>'+ md.list('./json/unit2.json', 'false'));

        response.writeHead(200);
        response.end(html);
    }

    else if(pathname === '/worktable'){
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
        </style>`,
        md.menu() + '<p><a href="/add">add</a></p>' + '<p><a href="/update">update</a></p>' + '<p><a href="/make_guardroom">make_guardroom</a></p>'+ md.list('./json/unit2.json', 'false'));

        response.writeHead(200);
        response.end(html);
    }

    else if(pathname === '/add'){
        console.log('pathname === /add');
        var html = md.frame(`
        <meta charset='utf-8'>
        <style>
            .container{display:table;}
            .row{display:table-row;}
            .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
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
            .cell{display:table-cell; width:1px; white-space: nowrap; text-align:center; border-width:1px; border-style:solid; border-color:black;}
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

    else if(pathname === '/make_guardroom'){
    /*
        console.log(pathname === '/make_guardroom');

        var identificationData = func.makeIdentificationData();

        var identificationData = 
        new cls.identificationData(
            60, 12, 48, "당직6위조6", 48, 36, 12, 60, 12, 48, "당직6위조6", 48, 36, 12
        );
        var guardroomData =

        func.makeGuardroomData();
            new cls.guardroomData(
            new Array("일병", "이병"), 
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("일병", "이병"),
            new Array("병장", "상병"),
            new Array("일병", "이병"),
            new Array("병장", "상병")
        );

        var html = md.frame(`
        <meta charset="UTF-8">
        <title>근무표 양식</title>
        <style>
            body {
                margin: 0;
                padding: 0;
            }
            
            * {
                box-sizing: border-box;
                -moz-box-sizing: border-box;
            }
            
            .page {
                width: 21cm;
                min-height: 29.7cm;
                padding: 2cm;
                margin: 1cm auto;
                border: 1px #D3D3D3 solid;
                border-radius: 5px;
                background: white;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
            
            .subpage {
                padding: 1cm;
                border: 5px red solid;
                height: 256mm;
                outline: 2cm #FFEAEA solid;
            }
          </style>
        `,
        md.menu() + md.guardroom(identificationData, guardroomData));
        response.writeHead(200);
        response.end(html);
        */
    }
});
app.listen(3000);