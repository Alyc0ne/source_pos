<?php
class SettingController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index(){
      //$data['Unit']=$this->db->get('smUnit')->result_array();
      $data['path_link'] = "Setting/index";
      //$data['result'] = "";
      $this->load->view("Dashboard/mp_default",$data);
      //$this->load->view("Setting/index");
    }

}





?>
