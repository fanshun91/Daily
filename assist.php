<?php  
// 1.检查用户名是否符合规定“两位以上的字母,数字,或者下划线”，代码如下:

/** 
 * 检查用户名是否符合规定 
 * 
 * @param STRING $username 要检查的用户名 
 * @return TRUE or FALSE 
 */ 

function is_username($username) { 
    $strlen = strlen($username); 
    if (!preg_match("/^[a-zA-Z0-9_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]+$/", $username)) { 
        return false; 
    } elseif (20 < $strlen || $strlen < 2) { 
        return false; 
    } 
    
    return true; 
} 


// 2. 密码:6—20位,由字母、数字组成
function isPWD($value, $minLen = 5, $maxLen = 16) {
    $match = '/^[\\~!@#$%^&*()-_=+|{}\\[\\],.?\\/:;\'\\"\\d\\w]{' . $minLen . ',' . $maxLen . '}$/';
    $v = trim($value);
    if (empty($v)) {
        return false;
    }
    return preg_match($match, $v);
}

// 3. email验证
function isEmail($value, $match = '/^[\\w\\d]+[\\wd-.]*@[w\\d-.]+\\.[\\w\\d]{2,10}$/i') {
    $v = trim($value);
    if (empty($v)) {
        return false;
    }
    return preg_match($match, $v);
}

?>