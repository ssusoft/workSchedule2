var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
const md = require('/tmp/guest-9ku3yf/Desktop/workSchedule-master/afterRefactoring/lib/template.js');

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
            var post = qs.parse(body);
            var objData = new Object();
            var platoon1 = [];
            var platoon2 = [];
            var platoon3 = [];
            for(var num=0; num<post.platoon.length; ++num){
                var soldier = new Object();
                soldier.platoon = post.platoon[num];
                soldier.name = post.name[num];
                soldier.job = post.job[num];
                if(soldier.platoon === '1') platoon1.push(soldier);
                else if(soldier.platoon === '2') platoon2.push(soldier);
                else if(soldier.platoon === '3') platoon3.push(soldier);
            }

            objData.platoon1 = platoon1;
            objData.platoon2 = platoon2;
            objData.platoon3 = platoon3;

            var jsonData = JSON.stringify(objData);
            fs.writeFile('./json/unit2.json', jsonData, 'utf8', function(err){
                console.log('writeFile');
            })
            response.writeHead(302, {Location:`/`});
            response.end(); 
        })
    }
});
app.listen(3000);