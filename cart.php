<?php
header('content-type:text/html;charset="utf-8"');
$responseDate = array("code" => 0, "msg" => "", "data" => array());

// 接收变量
$type = $_POST['type'] ? $_POST['type'] : '';
$userid = $_POST['userid'] ? $_POST['userid'] : '';

// 连接数据库
$link = mysql_connect("127.0.0.1", "root", "333333");
if(!$link){
  $responseDate["code"] = 4;
  $responseDate["msg"] = "无法连接到服务器";
  echo json_encode($responseDate);
  exit;
}
mysql_set_charset("utf8");
mysql_select_db("maicaibang");

// 查询操作
if ($type === 'find') {
  find($link, $userid);
}

if ($type === 'insert') {
  insertCart($link, $userid);
}

if ($type === 'deleteOne') {
  deleteOne($link, $userid);
}

if ($type === 'deleteAll') {
  deleteAll($link, $userid);
}

if ($type === 'updateNum') {
  updateNum($link, $userid);
}

if ($type === 'updateSelected') {
  updateSelected($link, $userid);
}

if ($type === 'checkAll') {
  checkAll($link, $userid);
}

// 查询
function find($link, $userid) {
  $sql = "SELECT * FROM cart WHERE userID=$userid";
  $res = mysql_query($sql);
  // $row = mysqli_fetch_assoc($res);
  if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_assoc($res)) {
      $arr[] = $row;
    }
  } else {
    $arr = array();
  }
  $responseDate["code"] = 0;
  $responseDate["msg"] = "查询数据成功";
  $responseDate["data"] = $arr;
  echo json_encode($responseDate);
}

// 加入购物车
function insertCart($link, $userid) {
  $id = $_POST['id'] ? $_POST['id'] : '';
  $picture = $_POST['picture'] ? $_POST['picture'] : '';
  $title = $_POST['title'] ? $_POST['title'] : '';
  $price = $_POST['price'] ? $_POST['price'] : '';
  $quantity = $_POST['quantity'] ? $_POST['quantity'] : '';
  $selected = $_POST['selected'] ? $_POST['selected'] : '';

  $sql1 = "select * from cart where userID='$userid' and ID='$id'";
  $res1 = mysql_query($sql1);
  $row = mysql_fetch_assoc($res1);
  if (!$row) {
    // 数据不存在，插入数据库
    $sql2 = "insert into cart (userID, ID, Picture, Title, Price, Quantity, Selected) values ('$userid', '$id', '$picture', '$title', '$price', '$quantity', '$selected')";
    $res2 = mysql_query($sql2);
    if ($res2) {
      $responseDate["code"] = 0;
      $responseDate["msg"] = "加入购物车成功";
      echo json_encode($responseDate);
    } else {
      $responseDate["code"] = 1;
      $responseDate["msg"] = "加入购物车失败";
      echo json_encode($responseDate);
    }
  } else {
    // 数据存在，数量加1
    $count = $quantity ? $quantity : 1;
    $sql3 = "update cart set Quantity=(Quantity+$count) where userID='$userid' and ID='$id'";
    $res3 = mysql_query($sql3);
    if ($res3) {
      $responseDate["code"] = 0;
      $responseDate["msg"] = "加入购物车成功";
      echo json_encode($responseDate);
    } else {
      $responseDate["code"] = 1;
      $responseDate["msg"] = "加入购物车失败";
      echo json_encode($responseDate);
    }
  }
}

// 删除单条数据
function deleteOne($link, $userid) {
  $id = $_POST['id'] ? $_POST['id'] : '';

  $sql = "delete from cart where userID='$userid' and id='$id'";
  $res = mysql_query($sql);
  if ($res) {
    $responseDate["code"] = 0;
    $responseDate["msg"] = "删除数据成功";
    echo json_encode($responseDate);
  } else {
    $responseDate["code"] = 1;
    $responseDate["msg"] = "删除数据失败";
    echo json_encode($responseDate);
  }
}

// 删除全部数据
function deleteAll($link, $userid) {
  // $id = $_POST['id'] ? $_POST['id'] : '';

  $sql = "delete from cart where userID='$userid'";
  $res = mysql_query($sql);
  if ($res) {
    $responseDate["code"] = 0;
    $responseDate["msg"] = "删除数据成功";
    echo json_encode($responseDate);
  } else {
    $responseDate["code"] = 1;
    $responseDate["msg"] = "删除数据失败";
    echo json_encode($responseDate);
  }
}

// 更新数量
function updateNum($link, $userid) {
  $id = $_POST['id'] ? $_POST['id'] : '';
  $quantity = $_POST['quantity'] ? $_POST['quantity'] : '';

  $sql = "update cart set Quantity='$quantity' where userID='$userid' and ID='$id'";
  $res = mysql_query($sql);
  if ($res) {
    $responseDate["code"] = 0;
    $responseDate["msg"] = "更新数量成功";
    echo json_encode($responseDate);
  } else {
    $responseDate["code"] = 1;
    $responseDate["msg"] = "更新数量失败";
    echo json_encode($responseDate);
  }
}

// 更新选中状态
function updateSelected($link, $userid) {
  $id = $_POST['id'] ? $_POST['id'] : '';
  $selected = $_POST['selected'] ? $_POST['selected'] : 0;

  $sql = "update cart set Selected='$selected' where userID='$userid' and ID='$id'";
  $res = mysql_query($sql);
  if ($res) {
    $responseDate["code"] = 0;
    $responseDate["msg"] = "更新选中状态成功";
    echo json_encode($responseDate);
  } else {
    $responseDate["code"] = 1;
    $responseDate["msg"] = "更新选中状态失败";
    echo json_encode($responseDate);
  }
}

// 全选
function checkAll($link, $userid) {
  $selected = $_POST['selected'] ? $_POST['selected'] : 0;
  $sql = "update cart set Selected='$selected' where userID='$userid'";
  $res = mysql_query($sql);
  if ($res) {
    $responseDate["code"] = 0;
    $responseDate["msg"] = "更新选中状态成功";
    echo json_encode($responseDate);
  } else {
    $responseDate["code"] = 1;
    $responseDate["msg"] = "更新选中状态失败";
    echo json_encode($responseDate);
  }
}
?>