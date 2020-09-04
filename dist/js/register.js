require.config({
    paths: {
        jquery: "jquery-1.11.3",
        verification: "verification",
    }
});

//调用模块
require(["verification"], function (verification) {
    verification.verification();
});