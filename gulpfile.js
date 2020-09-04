const gulp = require("gulp");

const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html", function(){
    return gulp.src("./html/*.html")
    .pipe(htmlmin({
        removeEmptyAttibutes: true, 
        collapseWhitespace: true,
    }))
    .pipe(gulp.dest("dist/")).pipe(connect.reload());
});

gulp.task("img", function(){
    return gulp.src("img/**/*").pipe(gulp.dest("dist/img")).pipe(connect.reload());
});

gulp.task("data", function(){
    return gulp.src(["xml/*.xml", "./*.json", "!package.json"]).pipe(gulp.dest("dist/data")).pipe(connect.reload());
});

gulp.task("php", function(){
    return gulp.src(["./*.php"]).pipe(gulp.dest("dist/php")).pipe(connect.reload());
})

gulp.task("script", function(){
    return gulp.src(["./js/*.js", "!gulpfile.js"]).pipe(gulp.dest("dist/js")).pipe(connect.reload());
});

const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("css", function(){
    return gulp.src("./css/*.css").pipe(minifyCSS())/* .pipe(rename("index.min.css")) */.pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("index-scss", function(){
    return gulp.src("./index.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("index.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("register-scss", function(){
    return gulp.src("./register.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("register.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("login-scss", function(){
    return gulp.src("./login.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("login.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("details-scss", function(){
    return gulp.src("./details.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("details.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("goodsList-scss", function(){
    return gulp.src("./goodsList.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("goodsList.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());
});
gulp.task("cart-scss", function(){
    return gulp.src("./cart.scss").pipe(scss()).pipe(gulp.dest("dist/css")).pipe(minifyCSS()).pipe(rename("cart.min.css")).pipe(gulp.dest("dist/css")).pipe(connect.reload());
});


gulp.task("build", ["copy-html", "img", "data", "script", "css", "index-scss", "register-scss", "details-scss", "login-scss", "goodsList-scss", "cart-scss", "php"], function(){
    console.log("执行成功");
});

gulp.task("watch", function(){
    gulp.watch("./html/*.html", ["copy-html"]);
    gulp.watch("./img/img/**/*", ["img"]);
    gulp.watch(["xml/*.xml", "json/*.json", "!package.json"], ["data"]);
    gulp.watch(["./js/*.js", "!gulpfile.js"], ["script"]);
    gulp.watch("./css/*.css", ["css"]);
    gulp.watch("./index.scss", ["index-scss"]);
    gulp.watch("./register.scss", ["register-scss"]);
    gulp.watch("./details.scss", ["details-scss"]);
    gulp.watch("./login.scss", ["login-scss"]);
    gulp.watch("./goodsList.scss", ["goodsList-scss"]);
    gulp.watch("./cart.scss", ["cart-scss"]);
    gulp.watch("./*.php", ["php"]);

});


const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true,
    })
});

gulp.task("default", ["watch", "server"]);
