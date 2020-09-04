<?php
    header('content-type:text/html;charset="utf-8"');
    $responseDate = array("code" => 0, "msg" => "");
    $username = $_POST["username"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];

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
    if($password != $repassword){
        $responseDate["code"] = 3;
        $responseDate["msg"] = "两次输入的密码不一致";
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
    $sql = "SELECT * FROM users WHERE username='{$username}'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if($row){
        $responseDate["code"] = 5;
        $responseDate["msg"] = "用户名已存在";
        echo json_encode($responseDate);
        exit;
    }
    $str = md5($password);
    $sql2 = "INSERT INTO users (username,password) VALUES ('{$username}','{$str}')"; 
    $res = mysql_query($sql2);
    if($res){
        $responseDate["msg"] = "注册成功";
        echo json_encode($responseDate);
    }else{
        $responseDate["code"] = 6;
        $responseDate["msg"] = "注册失败";
        echo json_encode($responseDate);
        exit;
    }

    mysql_close($link);

?>