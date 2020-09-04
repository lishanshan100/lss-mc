define(["jquery"], function($){
    function option(){
        // 获取当前商品相关ID

        let search = location.href.split('?')[1]
        let searchArr = search.split('&')

        let searchObj = {}
        searchArr.forEach((item) => {
            searchObj[item.split('=')[0]] = item.split('=')[1]
        })
        let { p_idx, id } = searchObj
        // 返回当前的商品
        function returnGood(arr, id) {
            return (arr.filter(item => {
                return item.id === Number(id)
            }))[0]
        }
        $.ajax({
            url: "./data/goods.json",
            success: function(arr){
                let {goods} = arr[p_idx]
                window.currentGood = returnGood(goods, id)
                // 标题
                let option = $(`
                    <a href="./index.html" target="_blank">首页</a>
                    <span>
                        &nbsp;>&nbsp;
                    </span>
                    <a href="./goods.html?${searchArr[0]}">${arr[p_idx].title}</a>
                    <span>
                        &nbsp;>&nbsp;
                    </span>
                    <a href="#">${returnGood(goods, id).tit}</a>
                `)
                option.appendTo($(".option"));

                // 图片
                var smallImg = $(`
                    <img src="${returnGood(goods, id).img}" alt="">
                    <span></span>
                `)
                smallImg.appendTo($(".pic_box"))

                var bigImg = $(`
                    <img src="${returnGood(goods, id).img}" alt="">
                `)
                bigImg.appendTo($(".pic_big"))

                var viewImg = $(`
                    <div>
                        <img src="${returnGood(goods, id).img}" alt="">
                    </div>
                `)
                viewImg.appendTo($(".view_box"))

                // 品名
                $('.goods-buy h4').html(returnGood(goods, id).tit)
                // 价格
                $(`.price p`).eq(0).html(`市场价<span>${returnGood(goods, id).oPrice.toFixed(2)}</span>`)
                $(`.price p`).eq(1).html(`市场价<span>${returnGood(goods, id).nPrice.toFixed(2)}</span>`)
                // 加入购物车按钮
                $(`<button class="addToCart" id="${id}">加入购物车</button>`).appendTo($(".buy-btn"))
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function magnifier(){
        $(".pic_box").mouseenter(function(){
            $(".pic_box span").show();
            $(".pic_big").css("display", "block");
        }).mouseleave(function(){
            $(".pic_box span").hide();
            $(".pic_big").css("display", "none");
        }).mousemove(function(ev){
            var l = ev.clientX - $(".pic_box").offset().left - 100;
            var t = ev.clientY - $(".pic_box").offset().top - 100;
            if(l <= 0){
                l = 0;
            }
            if(l >= 188){
                l = 188;
            }

            if(t <= 0){
                t = 0;
            }
            if(t >= 188){
                t = 188;
            }
            $(".pic_box span").css({
                left: l,
                top: t
            })
            $(".pic_big img").css({
                left: -l * 2,
                top: -t * 2
            })
        })
    }
    return {
        magnifier: magnifier,
        option: option,
    }
})
