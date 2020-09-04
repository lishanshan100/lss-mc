
require.config({
    paths: {
        jquery: "jquery-1.11.3",
        loginSend: "loginSend",
    }
});

//调用模块
require(["loginSend"], function (loginSend) {
    loginSend.loginSend();
});