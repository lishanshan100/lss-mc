// console.log("success!");
// // 配置路径
require.config({
    paths: {
        jquery: "jquery-1.11.3",
        banner: "banner",
        nav: "nav",
        goCart: "goCart",
        indexList: "indexList",
        loginBtn: "loginBtn",
        loginSend: "loginSend",
    },
});

//调用模块
require(["banner", "nav", "goCart", "indexList", "loginBtn", "loginSend"], function (banner, nav, goCart, indexList, loginBtn, loginSend) {
    banner.banner();
    nav.nav();
    goCart.goCart();
    indexList.indexList();
    loginBtn.loginBtn();
    loginSend.loginSend();
});