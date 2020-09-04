require.config({
    paths: {
        jquery: "jquery-1.11.3",
        jqCookie: "jquery_cookie",
        nav: "nav",
        goCart: "goCart",
        Settlement: "cartSettlement"
    },
    shim: {
        "jqCookie": ["jquery"]
    },
});

//调用模块
require(["nav", "goCart", "Settlement"], function (nav, goCart, Settlement){
    nav.nav();
    goCart.goCart();
    Settlement.createNode();
    Settlement.Add_Sub();
    Settlement.removeAll();
    Settlement.checkAll();
});