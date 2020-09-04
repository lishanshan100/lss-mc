define(['jquery'], function($) {
    function banner(){
        var aPic = $(".banner li");
        var aPoint = $(".ban-btn span")
        var iNow = 0;

        var timer = setInterval(function(){
            iNow++;
            tab();
        }, 4000);

        

        function tab(){
            aPic.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 2000);
            aPoint.removeClass("ban-active").eq(iNow).addClass("ban-active")

            if(iNow == 4){
                iNow = -1;
            }
        }
        

        aPic.mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 4000);
        })
        aPoint.on("click", function(){
            clearInterval(timer);
            iNow = $(this).index();
            tab();
        })
    }
    return {
        banner: banner,
    }
})