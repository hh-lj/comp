//动画效果
$(function () {
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        new WOW().init();
    }
});

//主导航高亮显示
$(function () {
    var a = location.href;
    var b = 0;
    var c = $(".nav ul li").length;

    if(a.indexOf("?") != -1)
    {
        a = a.split("?")[0];
    }

    $(".nav ul li").each(function (e) {
        var d = $(this).find("a").attr("href");
        if (d.length > 5 && a.substring(a.length - d.length).toUpperCase() == d.toUpperCase()) {
            $(this).addClass("cur");
            $(this).siblings("li").removeClass("cur");
            return;
        }
        b++;
    });
    if (b == c) {
        $(".nav ul li:eq(0)").addClass("cur");
        $(".nav ul li:eq(0)").siblings("li").removeClass("cur");
    }
});

/*返回顶部*/
$(function () {
    $(".kef").find(".my-kefu-ftop,#top").bind("click",function () {

        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (scrollTop > 0) {
            $("html,body").animate({
                scrollTop: 0
            }, "slow");
        }
    });
});

//搜索
$(document).ready(function(){
    $("#search_btn").click(function(){
        var search_val = $("#search_val").val();
        if(search_val == '')
        {
            layer.alert('搜索内容不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }
        window.location.href='/search/' + search_val;
    });
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            var search_val = $("#search_val").val();
            if(search_val == '')
            {
                layer.alert('搜索内容不能为空', {
                    skin: 'layui-layer-molv' //样式类名
                    ,closeBtn: 1
                });
                return false;
            }
            window.location.href='/search/' + search_val;
        }
    });
});

//清空表单
function emptyText(a)
{
    var c;
    if (a == null) {
        c = $("body").find("input[type=text]")
    } else {
        c = $j(a).find("input[type=text]")
    }
    var b;
    if (a == null) {
        b = $("body").find("input[type=password]")
    } else {
        b = $j(a).find("input[type=password]")
    }
    c.each(function () {
        $(this).val("")
    });
    b.each(function () {
        $(this).val("")
    });
    if (a == null) {
        c = $("body").find("textarea")
    } else {
        c = $j(a).find("textarea")
    }
    c.each(function () {
        $(this).val("")
    })
}

$(document).ready(function(){
    $(".checkname-show .close").click(function(){
        $(".checkname-show").toggle(500,"linear");
    });

    $(".checkname-online").click(function(){
        $(".checkname-show").toggle(500,"linear");
    });

    $(".checkname-box .close").click(function(){
        $(".checkname-box").toggle(500,"linear");
    });

    $("#btnEnsure").click(function(){
        $(".checkname-ensure").toggle(500,"linear");
    });
});

//表单提交
$(document).ready(function(){
    //ajax提交
    $("#checkCompany").click(function(){
        company1 = $("#company1").val();
        company2 = $("#company2").val();
        company3 = $("#company3").val();
        company4 = $("#company4").val();
        if(company1 == '')
        {
            layer.alert('地址不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }
        if(company2 == '')
        {
            layer.alert('企业字号不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }
        if(company3 == '')
        {
            layer.alert('所属行业不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }
        if(company4 == '')
        {
            layer.alert('企业类型不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }

        emptyText();
        $("#company").val(company1+company2+company3+company4);
        $(".checkname-box").show();
    });

    $("#btnSubmit").click(function(){
        var company = $("#company").val();
        var mobile = $("#mobile").val();
        var username = $("#username").val();
        if(company == '')
        {
            layer.alert('公司名称不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }
        if(mobile == '')
        {
            layer.alert('联系方式不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }
        if(username == '')
        {
            layer.alert('联系人不能为空', {
                skin: 'layui-layer-molv' //样式类名
                ,closeBtn: 1
            });
            return false;
        }

        $.ajax({
            url:'/content/message/add.html',
            data:{"company":company, "mobile":mobile, "username":username},
            type:'post',
            success:function(a)
            {
                emptyText(a.data);
                $(".checkname-box").toggle(500,"linear");
                $(".checkname-ensure").toggle(500,"linear");
            }
        });
    });
});

function ChangeFontSize(b, a) {
    $(b).addClass("cur").siblings("a").removeClass("cur");
    $("#cntrBody").css("font-size", a).find("*").css("font-size", a)
}