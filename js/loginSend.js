define(['jquery'], function($){
    function loginSend(){
        $("#btn").click(function(){
            $.ajax({
                url: "./php/login.php",
                type: "post",
                data: {
                    username: $("#username").val(),
                    password: $("#password").val(),
                },
                success: function(result){
                    console.log(result);
                    var obj = JSON.parse(result);
                    $(".tips").html(obj.msg);
                    if(obj.code){
                        //失败
                        $(".tips").css({"color": "#e23435", "display": "block"});
                    }else{
                        // 成功
                        $(".tips").css({"color": "#1ad675", "display": "block"});
                        setTimeout(() => {
                            window.location.href = "./index.html"
                        }, 2000)
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        })
            
    };
    return{
        loginSend: loginSend
    }
})


