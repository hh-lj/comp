/**
 * Created by ASUS on 2020/11/21.
 */
//菜单栏
$(function () {
    $(".header-meun").click(function () {
        $(".header-cd").toggleClass("cur")
    })
})
//返回上一级
$(function () {
    $(".return").click(function () {
        window.history.go(-1);
    })
})

//删除框弹出
function del() {
    $(".delete-container").addClass("current");
}
//取消删除
function cansel() {
    $(".delete-container").removeClass("current");
}
//确认密码
function testPwd2(){
    var pwd2=document.getElementById("pwd2").value;
    var pwd=document.getElementById("pwd").value;
    var span=document.getElementById("pwd2Span");
    if(pwd2==""|pwd2==null){
        span.innerHTML="！！！"
        span.style.color="red"
        return false;
    }else if(pwd2==pwd){
        span.innerHTML="√";
        span.style.color="green";
        return true;
    }else{
        span.innerHTML="！！！";
        span.style.color="red";
        return false;
    }

}
//验证码
function testCode(){
    var code=Math.floor(Math.random()*9000+1000);
    var span=document.getElementById("checkSpan");
    span.innerHTML=code;
}
//验证输入的验证码是否一致
function testCheck(){
    var check=document.getElementById("check").value;
    var span=document.getElementById("checkSpan");
    var span2=document.getElementById("checkSpan2")
    if(check==""||check==null){
        span2.innerHTML="！！！";
        span2.style.color="red";
        return false;
    }else if(check==span.innerHTML){
        span2.innerHTML="√";
        span2.style.color="green";
        return true;
    }else{
        span2.innerHTML="！！！";
        span2.style.color="red";
        return false;
    }
}
//提交密码
function submit() {
    testPwd2()
    testCheck()
}