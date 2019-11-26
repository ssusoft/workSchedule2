var fs = require('fs');

module.exports={
    list : function(jsonFile, contentEditable){
        console.log("template.list");
        var content = fs.readFileSync(jsonFile, 'utf8');
        var jsonContent = JSON.parse(content);

        if(contentEditable === 'true'){
            var write = 
            `
            <form action='/update_process' method='post'>
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
                </div>
            `
            ;
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
                    write += `</div>`;
                }
            }
            write += `<input type="submit" value="저장">`;
            write += `</div></form>`;
        }
        else{
            var write = `
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
                </div>
            `;
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
                    write += `</div>`;
                }
            }
            write += "</div>";
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

    menu : function(){
        var filelist = fs.readdirSync('./data'); 
        var header = '<h1>메인 메뉴</h1>';
        var body = '<ul>';
        for(var i=0; i<filelist.length; ++i){
            body += `<li><a href="/${filelist[i]}">${filelist[i]}</a></li>`;
        }
        body += '</ul>';
        body += '<p><a href="/add">add</a></p>'
        body += '<p><a href="/update">update</a></p>';
        body += '<p><a href="/delete">delete</a></p>';
        return header + body;
    }
}