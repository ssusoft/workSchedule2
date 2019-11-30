var fs = require('fs');
var qs = require('querystring');
var cls = require('./class.js');

module.exports={
    refreshFile : function(filename, body){
        var newData = qs.parse(body);
        console.log('refreshFile');
        fs.readFile(filename, 'utf8', function(err, description){ // 기존에 존재하였던 데이터
            var jsonContent = new Object();
            var objData = new Object();
            var platoon_1 = [];
            var platoon_2 = [];
            var platoon_3 = [];

            jsonContent = JSON.parse(description); // 문자열을 객체로
            for(var key in jsonContent){
                for(var num=0; num<jsonContent[key].length; ++num){
                    var oop = new cls.soldier(jsonContent[key][num].platoon, jsonContent[key][num].name, jsonContent[key][num].job, jsonContent[key][num].discharge);
                    if(key === 'platoon_1') platoon_1.push(oop);
                    else if(key === 'platoon_2') platoon_2.push(oop);
                    else if(key === 'platoon_3') platoon_3.push(oop);
                }
            }

            var recruit = new cls.soldier(newData.platoon, newData.name, newData.job, newData.discharge);
            if(recruit.platoon === '1') platoon_1.push(recruit);
            else if(recruit.platoon === '2') platoon_2.push(recruit);
            else if(recruit.platoon === '3') platoon_3.push(recruit);

            objData.platoon_1 = platoon_1;
            objData.platoon_2 = platoon_2;
            objData.platoon_3 = platoon_3;

            var jsonData = JSON.stringify(objData); // 객체를 문자열로
            fs.writeFile('./json/unit2.json', jsonData, 'utf8', function(err){
                console.log('function.js/refreshFile/writeFile');
            })
        })
    },

    writeToFile : function(body){
        console.log('function.js/writeToFile');
        var post = qs.parse(body);
        var objData = new Object();

        var platoon_1 = [];
        var platoon_2 = [];
        var platoon_3 = [];

        for(var num=0; num<post.platoon.length; ++num){
            var oop = new cls.soldier(post.platoon[num], post.name[num], post.job[num], post.discharge[num]);
            if(oop.platoon === '1') platoon_1.push(oop);
            else if(oop.platoon === '2') platoon_2.push(oop);
            else if(oop.platoon === '3') platoon_3.push(oop);
        }

        objData.platoon_1 = platoon_1;
        objData.platoon_2 = platoon_2;
        objData.platoon_3 = platoon_3;

        var jsonData = JSON.stringify(objData);
        fs.writeFile('./json/unit2.json', jsonData, 'utf8', function(err){
            console.log('function.js/writeToFile/writeFile');
        })
    },
}