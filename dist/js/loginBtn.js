define(['jquery'], function($){
    // console.log("succ")
    function loginBtn(){
        $("#login").click(function(){
            $(".landing").css("display", "block");
        });
        $(".login_close").click(function(){
            $(".landing").css("display", "none");
        })
    }
    return {
        loginBtn: loginBtn,
    }
})