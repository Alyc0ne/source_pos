<?php
class DashboardController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index(){
      $data['path_link'] = "";
      $data['SystemName'] = "Dashboard";
      $this->load->view("Dashboard/index",$data);
    }

}





?>
