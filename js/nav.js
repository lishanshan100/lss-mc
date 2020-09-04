define(['jquery'], function($){
    function nav(){
        // console.log("success")
        $.ajax({
            url: "./data/goods.json",
            success: function(arr){
                for(let i = 0; i < arr.length; i++){
                    var node = $(`
                    <div class="nav-l">
                        <li><a href="./goods.html?p_idx=${i}">${arr[i].title}</a></li>
                        <div class="nav-r"></div>
                    </div>
                    `);
                    node.appendTo($(".nav"));

                    var goods = arr[i].goods;
                    for(let j = 0; j < goods.length; j++){
                        var name = goods[j].tit;
                        var id = goods[j].id;
                        var node2 = $(`
                            <a href="./details.html?p_idx=${i}&id=${id}">${name}</a>
                        `);
                        node2.appendTo(node.find(".nav-r"));
                    }
                };
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    return {
        nav: nav,
    }
})