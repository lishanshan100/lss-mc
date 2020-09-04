require.config({
    paths: {
        jquery: "jquery-1.11.3",
        jqCookie: "jquery_cookie",
        nav: "nav",
        goCart: "goCart",
        magnifier: "magnifier",
        addToCart: "addToCart"
    },
    shim: {
        "jqCookie": ["jquery"],
    },  
});

//调用模块
require(["nav", "goCart", "magnifier", "addToCart"], function (nav, goCart,  magnifier, addToCart) {
    nav.nav();
    goCart.goCart();
    magnifier.magnifier();
    magnifier.option();
    addToCart.addToCart();
});