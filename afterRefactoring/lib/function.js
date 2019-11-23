var fs = require('fs');
var qs = require('querystring');

module.exports={
    refreshFile : function(filename, newData){
        console.log('refreshFile');
        fs.readFile(filename, 'utf8', function(err, description){
            var jsonContent = new Object();
            jsonContent = JSON.parse(description); // 문자열을 객체로
            var objData = new Object();
// 여기부터 다시해라. jsonContent의 내용이 이상하다.
            var platoon_1 = [];
            var platoon_2 = [];
            var platoon_3 = [];
            console.log("jsonContent : " + jsonContent);
            for(var num=0; num<jsonContent.platoon.length; ++num){
                var soldier = new Object();
                soldier.platoon = jsonContent.platoon[num];
                soldier.name = jsonContent.name[num];
                soldier.job = jsonContent.job[num];
                if(soldier.platoon === '1') platoon_1.push(soldier);
                else if(soldier.platoon === '2') platoon_2.push(soldier);
                else if(soldier.platoon === '3') platoon_3.push(soldier);
            }

            var soldier = new Object();
            soldier.platoon = newData.platoon;
            soldier.name = newData.name;
            soldier.job = newData.job[num];
            if(soldier.platoon === '1') platoon_1.push(soldier);
            else if(soldier.platoon === '2') platoon_2.push(soldier);
            else if(soldier.platoon === '3') platoon_3.push(soldier);

            objData.platoon_1 = platoon_1;
            objData.platoon_2 = platoon_2;
            objData.platoon_3 = platoon_3;

            var jsonData = JSON.stringify(objData); // 객체를 문자열로
            fs.writeFile('./json/unit2.json', jsonData, 'utf8', function(err){
                console.log('writeFile');
            })

          })
    },
    writeToFile : function(body){
        var post = qs.parse(body);
        var objData = new Object();

        var platoon_1 = [];
        var platoon_2 = [];
        var platoon_3 = [];

        for(var num=0; num<post.platoon.length; ++num){
            var soldier = new Object();
            soldier.platoon = post.platoon[num];
            soldier.name = post.name[num];
            soldier.job = post.job[num];
            if(soldier.platoon === '1') platoon_1.push(soldier);
            else if(soldier.platoon === '2') platoon_2.push(soldier);
            else if(soldier.platoon === '3') platoon_3.push(soldier);
        }

        objData.platoon_1 = platoon_1;
        objData.platoon_2 = platoon_2;
        objData.platoon_3 = platoon_3;

        var jsonData = JSON.stringify(objData);
        fs.writeFile('./json/unit2.json', jsonData, 'utf8', function(err){
            console.log('writeFile');
        })
    }
}