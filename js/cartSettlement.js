define(["jquery", "jqCookie"], function($){
    
    function createNode() {
        $.ajax({
            url: "./php/cart.php",
            method: 'post',
            data: {
                type: 'find',
                userid: 3
            },
            success: function (res) {
                let r = JSON.parse(res)
                let data = r.data
                $('#goods').html('')
                isCheckAll(data)
                $('#amount').html(computedTotalPrice(data))
                for (let i = 0; i < data.length; i++) {
                    $(`<div class="details" data-id="${data[i].ID}">
                    <div class="checkbox">
                        <input type="checkbox" class="checkbox" ${!!Number(data[i].Selected) ? 'checked' : ''}>
                    </div>
                    <div class="product">
                        <b><img src=".${data[i].Picture}" alt=""></b>
                        <em>${data[i].Title}</em>
                    </div>
                    <div class="quantity">
                        <button class="subNum">-</button>
                        <span>${data[i].Quantity}</span>
                        <button class="addNum">+</button>
                    </div>
                    <div class="price">
                        <span class="unit">￥${data[i].Price}</span>
                        <span class="total">￥${data[i].Price * data[i].Quantity}</span>
                    </div>
                    <div class="delete">
                        <span class="delete-item">删除</span>
                    </div>
                </div>`).appendTo(".goods");
                }
            },
            error: function (msg) {
            }
        })
    }
    
    // 更新数量
    function updataNum(id, num) {
        $.ajax({
            url: './php/cart.php',
            method: 'post',
            data: {
                type: 'updateNum',
                userid: 3,
                id: id,
                quantity: num
            },
            success: function(res) {
                let re = JSON.parse(res)
                // console.log(r)
            } 
        })
    }

    // 计算总价
    function computedTotalPrice(data) {
        let price = 0
        data.map(item => {
            if (!!Number(item.Selected)) {
                return price += item.Price * item.Quantity * 1
            }
        })
        return price
    }
    // 删除单个
    function deleteOne(id) {
        $.ajax({
            url: './php/cart.php',
            method: 'post',
            data: {
                type: 'deleteOne',
                userid: 3,
                id: id
            },
            success: function(res) {
                let r = JSON.parse(res)
                if (r.code === 0) {
                    createNode()
                }
            } 
        })
    }
    // 判断是否全选
    function isCheckAll(data) {
        console.log(data)
        let isSeleced = true
        for(let i = 0; i < data.length; i++){
            // console.log(data[i])
            if (Number(data[i].Selected) !== 1) {
                isSeleced = false
                break
            }
        }
        // console.log(isSeleced)
        $('#checkAll').prop('checked', isSeleced ? true : false) 
    }

    function checkAll() {
        $('#checkAll').click(function() {
            console.log($('#checkAll').prop('checked'))
            $.ajax({
                url: './php/cart.php',
                method: 'post',
                data: {
                    type: 'checkAll',
                    userid: 3,
                    selected: $('#checkAll').prop('checked') ? 1 : 0
                },
                success: function(res) {
                    let r = JSON.parse(res)
                    if(r.code === 0) {
                        createNode()
                    }
                }
            })
        })
    }
    
    // 添加减少
    function Add_Sub() {
        $('#goods').on('click', $('.addNum'), function(e) {
            let id = null
            // 加
            if (e.target.className === 'addNum') {
                let num = $(e.target).prev().html()
                num++
                var unit = $(e.target).parent().next().find('.unit').html().slice(1)
                console.log(unit)
                $(e.target).parent().next().find(".total").html('￥' + unit * num)
                $(e.target).prev().html(num)
                id = $(e.target).parent().parent().attr('data-id')
                updataNum(id, num)
                createNode()
            }
            // 减
            if (e.target.className === 'subNum') {
                let num = $(e.target).next().html()
                if (num <= 1) {
                    return
                }
                num--
                var unit = $(e.target).parent().next().find('.unit').html().slice(1)
                console.log(unit)
                $(e.target).parent().next().find(".total").html('￥' + unit * num)
                $(e.target).next().html(num)
                id = $(e.target).parent().parent().attr('data-id')
                updataNum(id, num)
                createNode()
            }
            // 删除一个
            if (e.target.className === 'delete-item') {
                id = $(e.target).parent().parent().attr('data-id')
                deleteOne(id)
            }
            // 单个是否选中
            if (e.target.className === 'checkbox') {
                id = $(e.target).parent().parent().attr('data-id')
                let selected = $(e.target).prop('checked') ? 1 : 0
                $.ajax({
                    url: './php/cart.php',
                    method: 'post',
                    data: {
                        type: 'updateSelected',
                        id,
                        userid: 3,
                        selected
                    },
                    success: function(res) {
                        console.log(res)
                        createNode()
                    }
                })
            }
        })
    }
    // 删除全部
    function removeAll(){
        $('#clear').click(function() {
            $.ajax({
                url: './php/cart.php',
                method: 'post',
                data: {
                    type: 'deleteAll',
                    userid: 3
                },
                success: function(res) {
                    let r = JSON.parse(res)
                    if (r.code === 0) {
                        createNode()
                    }
                } 
            })
        })   
    }

    return {
        Add_Sub: Add_Sub,
        removeAll: removeAll,
        createNode: createNode,
        checkAll
    }
})

    