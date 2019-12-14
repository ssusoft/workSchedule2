var fs = require('fs');
var cls = require('./class.js');

module.exports={
    list : function(jsonFile, option){
        console.log("template.list");
        var content = fs.readFileSync(jsonFile, 'utf8');
        var jsonContent = JSON.parse(content);
        var subwrite = ` <div class='container'>
        <div class='row'>
            <div class='cell'>
                <h5>소대</h5>
            </div>
            <div class='cell'>
                <h5>이름</h5>
            </div>
            <div class='cell'>
                <h5>직업</h5>
            </div>
            <div class='cell'>
                <h5>전역</h5>
            </div>
            <div class='cell'>
                <h5>상태</h5>
            </div>
            <div class='cell'>
                <h5>개인정비 근무 횟수</h5>
            </div>
            <div class='cell'>
                <h5>야간 근무 횟수</h5>
            </div>
            <div class='cell'>
                <h5>총 근무 횟수</h5>
            </div>
        </div>`;
        if(option === 'update'){
            var write = `<form action='/update_process' method='post'>` + subwrite;
            for(var key in jsonContent){
                for(var index = 0; index < jsonContent[key].length; ++index){
                    if(key === "platoon_1"){
                        write += `<div class='row'><div class='cell'><input type='text' name='platoon' value='1'></div>`;
                    }
                    else if(key === "platoon_2"){
                        write += `<div class='row'><div class='cell'><input type='text' name='platoon' value='2'></div>`;
                    }
                    else if(key === "platoon_3"){
                        write += `<div class='row'><div class='cell'><input type='text' name='platoon' value='3'></div>`;
                    }
                    write += `<div class='cell'><input type="text" name="name" value=${jsonContent[key][index].name}></div>`;
                    write += `<div class='cell'><input type="text" name="job" value=${jsonContent[key][index].job}></div>`;
                    write += `<div class='cell'><input type="date" name="discharge" value=${jsonContent[key][index].discharge}></div>`;
                    if(jsonContent[key][index].state === '1'){
                        write += `<div class='cell'>근무 가능</div>`;
                    }
                    else if(jsonContent[key][index].state === '0'){
                        write += `<div class='cell'>근무 열외</div>`;
                    }
                    write += `<div class='cell'><input type="string" name="discharge" value=${jsonContent[key][index].breakNum}></div>`;
                    write += `<div class='cell'><input type="string" name="discharge" value=${jsonContent[key][index].nightNum}></div>`;
                    write += `<div class='cell'><input type="string" name="discharge" value=${jsonContent[key][index].workNum}></div>`;
                    write += `</div>`;
                }
            }
            write += `<input type="submit" value="저장">`;
            write += `</div></form>`;
        }
        else if(option === 'check'){
            var write = subwrite;
            for(var key in jsonContent){
                for(var index = 0;index < jsonContent[key].length; ++index){
                    if(key === "platoon_1"){
                        write += "<div class='row'><div class='cell'><h5>1</h5></div>";
                    }
                    else if(key === "platoon_2"){
                        write += "<div class='row'><div class='cell'><h5>2</h5></div>";
                    }
                    else if(key === "platoon_3"){
                        write += "<div class='row'><div class='cell'><h5>3</h5></div>";
                    }
                    write += `<div class='cell'>${jsonContent[key][index].name}</div>`;
                    write += `<div class='cell'>${jsonContent[key][index].job}</div>`;
                    write += `<div class='cell'>${jsonContent[key][index].discharge}</div>`;
                    if(jsonContent[key][index].state === '1') write += `<div class='cell'>근무 가능</div>`;
                    else if(jsonContent[key][index].state === '0') write += `<div class='cell'>근무 열외</div>`;
                    write += `<div class='cell'>${jsonContent[key][index].breakNum}</div>`;
                    write += `<div class='cell'>${jsonContent[key][index].nightNum}</div>`;
                    write += `<div class='cell'>${jsonContent[key][index].workNum}</div>`;
                    write += `</div>`;
                }
            }
            write += "</div>";
        }
        else if(option === 'delete'){

        }
        return write;
    },

    empty : function(){
        var write = 
        `
            <p></p>
            <form action='/add_process' method='post'>
                <div class='container'>

                    <div class='row'>
                        <div class='cell'>
                            <h5>소대</h5>
                        </div>
                        <div class='cell'>
                            <h5>이름</h5>
                        </div>
                        <div class='cell'>
                            <h5>직업</h5>
                        </div>
                        <div class='cell'>
                            <h5>전역</h5>
                        </div>
                        <div class='cell'>
                            <h5>상태</h5>
                        </div>
                        <div class='cell'>
                            <h5>개인정비 근무 횟수</h5>
                        </div>
                        <div class='cell'>
                            <h5>야간 근무 횟수</h5>
                        </div>
                        <div class='cell'>
                            <h5>총 근무 횟수</h5>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='cell'>
                           <input type='text' name='platoon' placeholder='소대'>
                        </div>
                        <div class='cell'>
                           <input type='text' name='name' placeholder='이름'>
                        </div>
                        <div class='cell'>
                           <input type='text' name='job' placeholder='직업'>
                        </div>
                        <div class='cell'>
                            <input type='date' name='discharge'>
                        </div>
                        <div class='cell'>
                            <select name="state">
                                <option value="0">근무 열외
                                <option value="1">근무 가능 
                            </select>
                        </div>
                        <div class='cell'>
                            <input type='text' name='breakNum' value='0' readonly>
                        </div>
                        <div class='cell'>
                            <input type='text' name='nightNum' value='0' readonly>
                        </div>
                        <div class='cell'>
                            <input type='text' name='workNum' value='0' readonly>
                        </div>
                    </div>
                </div>
                <input type='submit' value='추가'>
            </form>
            <p></p>
        `;
        return write;
    },

    frame : function(head, body){
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    ${head}
                </head>
                <body>
                    ${body}
                </body>
            </html>
        `;
    },

    maketable : function(data){
        // data 를 테이블에 표현
    },

    menu : function(){
        var filelist = fs.readdirSync('./data'); 
        var header = '<h1>메인 메뉴</h1>';
        var body = '<ul>';
        for(var i=0; i<filelist.length; ++i){
            body += `<li><a href="/${filelist[i]}">${filelist[i]}</a></li>`;
        }
        body += '</ul>';
        return header + body;
    },

    guardroom : function(identificationData, guardroomData){
        var write = 
        `
        <div class="page">
        <div class="subpage">
            <table border="1">
                <tr>
                    <td width="461px">19-11-28</td>
                    <td style="text-align: center;">기안</td>
                    <td style="text-align: center;">중대장</td>
                </tr>
                <tr>
                    <td style="text-align: center;">경계근무명령서</td>
                    <td>&nbsp</td>
                    <td>&nbsp</td>
                </tr>
            </table>
            <table border="1" id="identification">
                <tr>
                    <td style="text-align: center; width:50px;">구분</td> 
                    <td style="text-align: center; width:50px;">총원</td>
                    <td style="text-align: center; width:50px;">열외</td>
                    <td style="text-align: center; width:60px;">현재원</td>
                    <td style="text-align: center; width:150px;">열외내용</td>
                    <td style="text-align: center; width:70px;">가용인원</td>
                    <td style="text-align: center; width:70px;">근무인원</td>
                    <td style="text-align: center; width:70px;">근무열외</td>
                </tr>
                <tr>
                    <td style="text-align: center;">주간</td>
                    <td>${identificationData.mTotal}</td>
                    <td>${identificationData.mExcept}</td>
                    <td>${identificationData.mNow}</td>
                    <td>${identificationData.mExceptContent}</td>
                    <td>${identificationData.mUseable}</td>
                    <td>${identificationData.mUsed}</td>
                    <td>${identificationData.mExceptUse}</td>
                </tr>
                <tr>
                    <td style="text-align: center;">야간</td>
                    <td>${identificationData.dTotal}</td>
                    <td>${identificationData.dExcept}</td>
                    <td>${identificationData.dNow}</td>
                    <td>${identificationData.dExceptContent}</td>
                    <td>${identificationData.dUseable}</td>
                    <td>${identificationData.dUsed}</td>
                    <td>${identificationData.dExceptUse}</td>
                </tr>
            </table>
            
            <table border="1" id="scheduleList">
                <tr>
                    <td style="text-align: center; width:60px">시간</td>
                    <td style="text-align: center; width:60px">성명</td>
                    <td style="text-align: center; width:60px">서명</td>
                    <td style="text-align: center; width:60px">성명</td>
                    <td style="text-align: center; width:60px">서명</td>
                    <td colspan="5" rowspan="6" style="text-align: center; width:256px">특이사항</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt; width: 60px;">08:00-09:30</td>
                    <td>${guardroomData.m8093[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m8093[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt; width: 60px;">09:30-11:00</td>
                    <td>${guardroomData.m9311[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m9311[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt; width: 60px;">11:00-12:30</td>
                    <td>${guardroomData.m1103[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m1103[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt; width: 60px;">12:30-14:00</td>
                    <td>${guardroomData.m0320[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m0320[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt; width: 60px;">14:00-15:30</td>
                    <td>${guardroomData.m2033[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m2033[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">15:30-17:00</td>
                    <td>${guardroomData.m3350[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m3350[1]}</td>
                    <td>&nbsp</td>
                    <td colspan="5" style="text-align: center; font-size: 7pt;">위병소 경계근무 총 가용인원(N명)</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">17:00-18:30</td>
                    <td>${guardroomData.m5063[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m5063[1]}</td>
                    <td>&nbsp</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">1소대 N명</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">2소대 N명</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">3소대 N명</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">중대본부 N명</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">18:30-20:00</td>
                    <td>${guardroomData.m6380[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.m6380[1]}</td>
                    <td>&nbsp</td>
                    <td rowspan="5" style="background-color: mediumblue">&nbsp</td>
                    <td rowspan="5" style="background-color: green">&nbsp</td>
                    <td rowspan="5" style="background-color:gold">&nbsp</td>
                    <td rowspan="5" style="background-color:fuchsia">&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">20:00-21:30</td>
                    <td>${guardroomData.d8093[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d8093[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">21:30-23:00</td>
                    <td>${guardroomData.d9311[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d9311[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">23:00-00:30</td>
                    <td>${guardroomData.d1103[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d1103[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">00:30-02:00</td>
                    <td>${guardroomData.d0320[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d0320[1]}</td>
                    <td>&nbsp</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">02:00-03:30</td>
                    <td>${guardroomData.d2033[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d2033[1]}</td>
                    <td>&nbsp</td>
                    <td colspan="5" style="text-align:center; font-size: 7pt;">위병소 및 불침번 미편성인원(N명)</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">03:30-05:00</td>
                    <td>${guardroomData.d3350[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d3350[1]}</td>
                    <td>&nbsp</td>
                    <td colspan="5" style="text-align:center; font-size: 7pt;">위병소 및 불침번 미편성인원(N명)</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">05:00-06:30</td>
                    <td>${guardroomData.d5063[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d5063[1]}</td>
                    <td>&nbsp</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">1소대 N명</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">2소대 N명</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">3소대 N명</td>
                    <td style="text-align: center; font-size: 7pt; width:64px;">중대본부 N명</td>
                </tr>
                <tr>
                    <td style="text-align: center; font-size: 7pt;">06:30-08:00</td>
                    <td>${guardroomData.d6380[0]}</td>
                    <td>&nbsp</td>
                    <td>${guardroomData.d6380[1]}</td>
                    <td>&nbsp</td>
                    <td rowspan="5" style="background-color: mediumblue">&nbsp</td>
                    <td rowspan="5" style="background-color: green">&nbsp</td>
                    <td rowspan="5" style="background-color:gold">&nbsp</td>
                    <td rowspan="5" style="background-color:fuchsia">&nbsp</td>
                </tr>
                <tr>
                        <td style="text-align: center; font-size: 7pt;">22:00-24:00</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                </tr>
                <tr>
                        <td style="text-align: center; font-size: 7pt;">00:00-01:30</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                </tr>
                <tr>
                        <td style="text-align: center; font-size: 7pt;">01:30-03:00</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                </tr>
                <tr>
                        <td style="text-align: center; font-size: 7pt;">03:00-04:30</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                </tr>
                <tr>
                        <td style="text-align: center; font-size: 7pt;">04:30-06:30</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                        <td>&nbsp</td>
                </tr>
            </table>
        </div>
    </div>
        `;
        return write;
    }
}