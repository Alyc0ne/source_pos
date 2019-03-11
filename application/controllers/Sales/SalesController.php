<?php
class SalesController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index()
    {
        $data['path_link'] = "Sales/index";
        $data['result'] = null;
        $this->load->view("Dashboard/index",$data);
        //echo json_encode($data);
    }

    public function getGoods(){
        $GoodsBarcode = $this->input->post('GoodsBarcode');
        $chkNum = is_numeric($GoodsBarcode);
        if ($chkNum) {
            $result = $this->db->select('GoodsNo,GoodsName,GoodsPrice')->where('GoodsBarcode',$GoodsBarcode)->get('smGoods')->row_array();
        }else {
            # code...
        }

        echo json_encode($result);
    }
}





?>
