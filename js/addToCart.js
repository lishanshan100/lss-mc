define(["jquery", "jqCookie"], function($){
    function addToCart(){
        $('#addNum').click(function() {
            let num = $('#quantity').html()
            num++
            $('#quantity').html(num)
        })

        $('#subNum').click(function() {
            let num = $('#quantity').html()
            if (num <= 1) {
                return
            }
            num--
            $('#quantity').html(num)
        })
        
        // 加入购物车操作
        $(".list").on("click", ".addToCart", function () {
            console.log(window.currentGood)
            let {id, tit, img, nPrice} = currentGood
            $.ajax({
                url: './php/cart.php',
                method: 'post',
                data: {
                    type: 'insert',
                    userid: 3,
                    id,
                    picture: img,
                    title: tit,
                    price: nPrice,
                    quantity: $('#quantity').html(),
                    selected: 1
                }, 
                success: function(res) {
                    let r = JSON.parse(res)
                    // console.log(res)
                    alert(r.msg)
                }
            })
        })
    }
    return {
        addToCart: addToCart
    }
})