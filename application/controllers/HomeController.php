<?php
class HomeController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index()
    {
        // $data['path_link'] = "Home/index";
        // echo json_encode($data);
        $this->load->view("index");
    }

    public function checkLogin()
    {
      $postdata = file_get_contents("php://input"); //Receive Json From Angular
      $request = json_decode($postdata);
      $username = $request->username;
    }

}





?>
