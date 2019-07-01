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
       $Draft = $this->input->post('Type');
       $De_GoodsData = json_decode($GoodsData,true);
       $De_InvoiceData = json_decode($InvoiceData,true);
       $IsSucces = false;
       $TotalPayAmnt = floatval($De_InvoiceData['CashAmnt']) + floatval($De_InvoiceData['BlueFlagAmnt']);

       $Invoice = array(
         'InvoiceID'=>substr(uniqid(), 3),
         'InvoiceNo'=>$De_InvoiceData['InvoiceNo'],
         'OrderID'=>null,
         'DocDate'=>date("Y-m-d H:i:s"),
         'InvoiceDate'=>date("Y-m-d H:i:s"),
         'TotalAmnt'=>floatval($De_InvoiceData['TotalAmnt']),
         'Discount'=>null,
         'DiscountAmnt'=>null,
         'NetAmnt'=>floatval($De_InvoiceData['NetAmnt']),
         'CashAmnt'=>floatval($De_InvoiceData['CashAmnt']),
         'BlueFlagAmnt'=>floatval($De_InvoiceData['BlueFlagAmnt']),
         'TotalPayAmnt'=>$TotalPayAmnt,
         'ChangeAmnt'=>(floatval($De_InvoiceData['NetAmnt']) - $TotalPayAmnt),
         'RowFlag'=> $Draft ? '2' : '1', //1 : Open // 2 : Draft
         "CreatedBy"=>null,
         "CreatedDate"=>date("Y-m-d H:i:s"),
         "ModifiedBy"=>null,
         "ModifiedDate"=>date("Y-m-d H:i:s"),
         'IsDelete'=>false,
         'IsInactive'=>false
       );

       $this->db->insert('soInvoice', $Invoice);

       if ($Invoice != null) {
        $eee = floatval($De_InvoiceData['TotalAmnt']);
        foreach ($De_GoodsData as $_GoodsData) {
            $InvoiceGoods = array(
                'InvoiceGoodsID' =>substr(uniqid(), 3),
                'InvoiceID' => $Invoice['InvoiceID'],
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

        $this->db->insert('soInvoiceItem', $InvoiceGoods);
        $IsSucces = true;
       }

       echo json_encode($IsSucces);
    }

    public function PaymentSlip()
    {
        $InvoiceID = $this->input->post("DocID");
        //$Where = array('InvoiceID' => $InvoiceID ,'IsDelete' => 0);
        $Where = array('InvoiceID' => '9d66db0a92' ,'IsDelete' => 0);
        $data['Invoice'] = $this->BaseSystem->GetDataOneRow("soInvoice",$Where);
        $data['InvoiceItem'] = $this->BaseSystem->GetDataAllRow("soInvoiceItem",$Where);
        $this->load->view("Sales/UC/PaymentSlip",$data);
    }
}
?>