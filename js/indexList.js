define(['jquery'], function($){
    // console.log("success")
    function indexList(){
        $.ajax({
            url: "./data/goods.json",
            success: function(arr){
                for(let i = 0; i < arr.length; i++){
                    var node = $(`
                    <div class="goods-category">
                        <div class="goods-title">
                            <h4>${arr[i].title}</h4>
                            <a href="#">更多</a>
                        </div>
                        <div class="category clear_fix">
                        
                        </div>
                    </div>
                    `);
                    node.appendTo($(".goods"));


                    var goods = arr[i].goods;
                    for(let j = 0; j < goods.length; j++){
                        var node2 = $(`
                        <dl>
                            <dt><a href="./details.html?p_idx=${i}&id=${goods[j].id}"><img src="${goods[j].img}" alt=""></a></dt>
                            <dd>${goods[j].tit}</dd>
                            <span>￥${goods[j].nPrice.toFixed(2)}</span>
                        </dl>
                        `);
                        node2.appendTo(node.find(".category"));

                    }
                    
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    };
    return {
        indexList: indexList,
    }
})
