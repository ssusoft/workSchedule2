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
                    var oop = new cls.soldier(jsonContent[key][num].platoon, jsonContent[key][num].name, jsonContent[key][num].job, jsonContent[key][num].discharge,
                        jsonContent[key][num].breakNum, jsonContent[key][num].nightNum, jsonContent[key][num].workNum);
                    if(key === 'platoon_1') platoon_1.push(oop);
                    else if(key === 'platoon_2') platoon_2.push(oop);
                    else if(key === 'platoon_3') platoon_3.push(oop);
                }
            }

            var recruit = new cls.soldier(newData.platoon, newData.name, newData.job, newData.discharge, newData.breakNum, newData.nightNum, newData.workNum);
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
            var oop = new cls.soldier(post.platoon[num], post.name[num], post.job[num], post.discharge[num], post.breakNum[num], post.nightNum[num], post.breakNum[num]);
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
    
    makeWorkerObj : function(jsonFile){
        var content = fs.readFileSync(jsonFile, 'utf8');
        var jsonContent = JSON.parse(content);

        var worker1 = new Array();
        var worker2 = new Array();
        var worker3 = new Array();
        var workerObj = new Object();

        for(var key in jsonContent){
            for(var index = 0; index < jsonContent[key].length; ++index){
                if(jsonContent[key][index].job === 'shooter' || jsonContent[key][index].job === 'sub_shooter'){
                    if(key === "platoon_1"){
                        worker1.push(jsonContent[key][index]);
                    }
                    else if(key === "platoon_2"){
                        worker2.push(jsonContent[key][index]);
                    }
                    else if(key === "platoon_3"){
                        worker3.push(jsonContent[key][index]);
                    }
                }
            }
        }

        workerObj.worker1 = worker1;
        workerObj.worker2 = worker2;
        workerObj.worker3 = worker3;
        return workerObj;
    },

    sortWorkerArr : function(workerArr, option){
        var i, j, least, temp;
        if(option === 'holiday'){
            for(i=0; i<workerArr.length - 1; ++i){
                least = i;
                for(j=i+1; j<workerArr.length; ++j){
                    if(workerArr[j].breakNum < workerArr[least].breakNum){
                        least = j;
                    }
                }
                if(i != least){
                    temp = workerArr[i];
                    workerArr[i] = workerArr[least];
                    workerArr[least] = temp;
                }
            }
        }
        else if(option ==='night'){
            for(i=0; i<workerArr.length - 1; ++i){
                least = i;
                for(j=i+1; j<workerArr.length; ++j){
                    if(workerArr[j].nightNum < workerArr[least].nightNum){
                        least = j;
                    }
                }
                if(i != least){
                    temp = workerArr[i];
                    workerArr[i] = workerArr[least];
                    workerArr[least] = temp;
                }
            }
        }
        return workerArr;
    },

    sortWorkerObj : function(workerObj, option){
        workerObj.worker1 = this.sortWorkerArr(workerObj.worker1, option);
        workerObj.worker2 = this.sortWorkerArr(workerObj.worker2, option);
        workerObj.worker3 = this.sortWorkerArr(workerObj.worker3, option);
        return workerObj;
    },

    matchingWorker : function(workerObj, option){
        // 정렬 기반으로 근무 짝 제작, 열외 추가 필요,
    }
}