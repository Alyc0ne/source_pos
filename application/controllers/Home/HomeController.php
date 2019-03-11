<?php
class HomeController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index()
    {
        $data['path_link'] = "Home/index";
        echo json_encode($data);
    }

}





?>
