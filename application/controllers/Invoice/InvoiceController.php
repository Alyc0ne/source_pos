<?php
class GoodsController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index()
    {
        $data['path_link'] = "Goods/index";
        $data['result'] = $this->db->get('smGoods')->result_array();
        $this->load->view("Dashboard/index",$data);
    }

    public function SaveInvoice()
    {
       $GoodsData = $this->input->post('GoodsData');
       $De_GoodsData = json_decode($GoodsData,true);
    //    foreach ($De_GoodsData as $_GoodsData) {
    //         $InvoiceItem[] = array(
    //             'InvoiceItemID' =>substr(uniqid(), 3),
    //             'InvoiceID' => $_GoodsData['first_name'],
    //             'GoodsID' => $_GoodsData['GoodsID'],
    //             'GoodsNo' => $_GoodsData['GoodsNo'], 
    //             'GoodsBarcode' => $_GoodsData['GoodsBarcode'], 
    //             'GoodsName' => $_GoodsData['GoodsName'],
    //             'GoodsQty' => $_GoodsData['GoodsQty'],
    //             'GoodsPrice' => $_GoodsData['GoodsPrice'],
    //             'TotalAmnt' => $_GoodsData['TotalAmnt'],
    //             "CreatedBy"=>null,
    //             "CreatedDate"=>date("Y-m-d H:i:s"),
    //             "ModifiedBy"=>null,
    //             "ModifiedDate"=>date("Y-m-d H:i:s"),
    //             "IsDelete"=>false,
    //         );
    //    }

       echo json_encode($De_GoodsData);
    }

}
?>