<?php
class InvoiceController extends CI_Controller{

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
       $InvoiceData = $this->input->post('InvoiceData');
       $De_GoodsData = json_decode($GoodsData,true);
       $De_InvoiceData = json_decode($InvoiceData,true);

       $Invoice = array(
         'InvoiceID'=>substr(uniqid(), 3),
         'InvoiceNo'=>'000',
         'OrderID'=>null,
         'DocDate'=>date("Y-m-d H:i:s"),
         'InvoiceDate'=>date("Y-m-d H:i:s"),
         'TotalAmnt'=>floatval($De_InvoiceData['TotalAmnt']),
         'Discount'=>null,
         'DiscountAmnt'=>null,
         'NetAmnt'=>floatval($De_InvoiceData['NetAmnt']),
         'CashAmnt'=>floatval($De_InvoiceData['CashAmnt']),
         'BlueFalgAmnt'=>floatval($De_InvoiceData['BlueFalgAmnt']),
         'TotalPayAmnt'=>(floatval($De_InvoiceData['CashAmnt']) + floatval($De_InvoiceData['BlueFalgAmnt'])),
         'RowFlag'=>'1', //Open
         "CreatedBy"=>null,
         "CreatedDate"=>date("Y-m-d H:i:s"),
         "ModifiedBy"=>null,
         "ModifiedDate"=>date("Y-m-d H:i:s"),
         'IsDelete'=>false,
         'IsCancel'=>false
       );

       $this->db->insert('soInvoice', $Invoice);

       $eee = floatval($De_InvoiceData['TotalAmnt']);
       foreach ($De_GoodsData as $_GoodsData) {
            $InvoiceGoods = array(
                'InvoiceGoodsID' =>substr(uniqid(), 3),
                'InvoiceID' => $Invoice[0]['InvoiceID'],
                'GoodsID' => $_GoodsData['GoodsID'],
                'GoodsNo' => $_GoodsData['GoodsNo'], 
                'GoodsBarcode' => $_GoodsData['GoodsBarcode'], 
                'GoodsName' => $_GoodsData['GoodsName'],
                'GoodsQty' => $_GoodsData['GoodsQty'],
                'GoodsPrice' => $_GoodsData['GoodsPrice'],
                'TotalAmnt' => $_GoodsData['TotalAmnt'],
                "CreatedBy"=>null,
                "CreatedDate"=>date("Y-m-d H:i:s"),
                "ModifiedBy"=>null,
                "ModifiedDate"=>date("Y-m-d H:i:s"),
                "IsDelete"=>false,
            );
       }

       $this->db->insert('soInvoiceGoods', $InvoiceGoods);

       echo json_encode($De_GoodsData);
    }

}
?>