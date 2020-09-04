define(["jquery"], function($){

    function goCart(){
        $(".car span").click(function(){
            location.href = "./cart.html";
        })
    }
    return {
        goCart: goCart
    }
})