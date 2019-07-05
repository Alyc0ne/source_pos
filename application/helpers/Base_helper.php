<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (! function_exists('ConvertToFloat')) {
    function ConvertToFloat($data)
    {
        return floatval(str_replace(',','',$data));
    }  
}

if (! function_exists('checkLogin')) {
    function checkLogin($username, $password)
    {
        $Where = array('Username' => $username, 'Password' => $password);
        $Result = $this->BaseSystem->checkLogin($Where);
    }
}
