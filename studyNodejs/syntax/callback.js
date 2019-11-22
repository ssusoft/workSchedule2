/*
function a(){
    console.log('A');
}
*/  
var a = function(){ // 함수가 값이다.
    console.log('B');
}

function slowFunc(callback){
    callback();
}

slowFunc(a);