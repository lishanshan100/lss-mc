define(["jquery"], function($){
    function goodsList(){

        let str = location.href;
        let type = str.split("?")[1];
        // console.log(type)
        let ID = str.charAt(str.length - 1);
        // console.log(ID);
        $.ajax({
            url: "./data/goods.json",
            success: function(arr){
                for(let i = 0; i < arr.length; i++){

                    if(ID == i){
                        $(`
                        <a href="./index.html" target="_blank">首页</a><span>&nbsp;>&nbsp;</span><a href="#">${arr[i].title}</a><span>
                        `).appendTo(".option");
                        
                        for(let j = 0; j < arr[i].goods.length; j++){

                            $(`
                            <div class="goods">
                                <a href="./details.html?${type}&id=${arr[i].goods[j].id}">
                                    <div class="goods_pic">
                                        <img src="${arr[i].goods[j].img}" alt="">
                                    </div>
                                    <div class="goods_infor">
                                        <p>￥${arr[i].goods[j].nPrice.toFixed(2)}</p>
                                        <p>${arr[i].goods[j].tit}</p>
                                    </div>
                                </a>
                                <div class="add_cart">
                                    <button class="vievDetails" ">查看详情</button>
                                </div>
                            </div>
                            `).appendTo(".list");
                        }
                        
                    }
                    
                }
                
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    return {
        goodsList: goodsList
    }
})