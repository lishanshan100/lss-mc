define(['jquery'], function($){
    function verification(){
        let isUsernameOk = false
        let isPasswordOk = false
        $("#username").on("keyup", function(){
            var oValue = this.value;
            // console.log(value);
            if(!oValue){
                $(".username span").css({"color": "#e23435"}).html("写点啥吧？");
            }else if(oValue.length < 6){
                $(".username span").css({"color": "#e23435"}).html("你太短了！");
            }else if(oValue.length > 16){
                $(".username span").css({"color": "#e23435"}).html("你太长了！");
            }else if(!/[a-zA-Z]/.test(oValue[0])){
                $(".username span").css({"color": "#e23435"}).html("要字母开头！");
            }else if(/\W/.test(oValue)){
                $(".username span").css({"color": "#e23435"}).html("只能有字母数字和下划线！");
            }else{
                $(".username span").css({"color": "#1ad675"}).html("用户名可用！");
                return isUsernameOk = true
            }
            return isUsernameOk = false
        });

        $("#password").on("keyup", function(){
            var pValue = this.value;
            // console.log(value);
            if(!pValue){
                $(".password span").css({"color": "#e23435"}).html("写点啥吧？");
                $(".password b").css({"display": "none"});
            }else if(pValue.length < 6){
                $(".password span").css({"color": "#e23435"}).html("你太短了！");
            }else if(pValue.length > 16){
                $(".password span").css({"color": "#e23435"}).html("你太长了！");
            }else{
                $(".password span").css({"color": "#1ad675"}).html("长度刚刚好！");
                if(pValue.length >= 6 && pValue.length <= 16){
                    if(/^\d+$/.test(pValue) || /^[a-z]+$/.test(pValue) || /^[A-Z]+$/.test(pValue)){
                        $(".password b").css({"display": "block"});
                        $("b em").css({"color": "#ee382a"}).html("弱");
                    }else if (/\d/.test(pValue) && /[a-z]/.test(pValue) && /[A-Z]/.test(pValue)){
                        $(".password b").css({"display": "block"});
                        $("b em").css({"color": "#1ad675"}).html("强");
                    }else{
                        $(".password b").css({"display": "block"});
                        $("b em").css({"color": "#eeae15"}).html("中");
                    }
                }
                return isPasswordOk = true
            }
            return isPasswordOk = false
        })
        $("#btn").on("click", function(){
            if (!isUsernameOk) {
                return $(".tips").css({"color": "#e23435", "display": "block"}).html("用户名格式错误！");
            }
            if (!isPasswordOk){
                return $(".tips").css({"color": "#e23435", "display": "block"}).html("密码格式错误！");
            }
            if ($('#repassword').val().trim() !== $('#password').val().trim()){
                return $(".tips").css({"color": "#e23435", "display": "block"}).html("两次输入密码不一致！");
            }
            if (!$('#agreeCheckBox').prop('checked')){
                return $(".tips").css({"color": "#e23435", "display": "block"}).html("请阅读并同意用户注册协议");
            }
            $(".tips").css({display: 'none'})
            
            // 请求注册
            $.ajax({
                url: "./php/register.php",
                type: "post",
                data:{
                    username: $("#username").val().trim(),
                    password: $("#password").val().trim(),
                    repassword: $("#repassword").val().trim(),
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    $(".tips").html(obj.msg);
                    if(obj.code){
                        // 失败
                        $(".tips").css({"color": "#e23435", "display": "block"});
                    }else{
                        // 成功
                        $(".tips").css({"color": "#1ad675", "display": "block"});
                        setTimeout(() => {
                            window.location.href = "./login.html"
                        }, 2000)
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
            // $(".tips").css({"color": "#1ad675", "display": "block"}).html("注册成功");
            // window.location.href = "./login.html"
        })
    }
    return {
        verification:verification
    }
    

})

