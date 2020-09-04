<?php
    header('content-type:text/html;charset="utf-8"');
    $responseDate = array("code" => 0, "msg" => "");

    $username = $_POST["username"];
    $password = $_POST["password"];

    if(!$username){
        $responseDate["code"] = 1;
        $responseDate["msg"] = "用户名不能为空";
        echo json_encode($responseDate);
        exit;
    }
    if(!$password){
        $responseDate["code"] = 2;
        $responseDate["msg"] = "密码不能为空";
        echo json_encode($responseDate);
        exit;
    }
    
    $link = mysql_connect("127.0.0.1", "root", "333333");
    if(!$link){
        $responseDate["code"] = 4;
        $responseDate["msg"] = "无法连接到服务器";
        echo json_encode($responseDate);
        exit;
    }

    mysql_set_charset("utf8");
    mysql_select_db("maicaibang");
    
    $str = md5($password);
    $sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'"; 
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseDate["msg"] = "登录成功";
        echo json_encode($responseDate);
    }else{
        $responseDate["code"] = 6;
        $responseDate["msg"] = "用户名密码错误";
        echo json_encode($responseDate);
        exit;
    }

    mysql_close($link);
?>