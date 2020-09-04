require.config({
    paths: {
        jquery: "jquery-1.11.3",
        jqCookie: "jquery_cookie",
        nav: "nav",
        goCart: "goCart",
        goodsList: "goodsList",
        addToCart: "addToCart"
    },
    shim: {
        "jqCookie": ["jquery"]
    },
});

//调用模块
require(["nav", "goCart", "goodsList", "addToCart"], function (nav, goCart, goodsList, addToCart){
    nav.nav();
    goCart.goCart();
    goodsList.goodsList();
    addToCart.addToCart();
});