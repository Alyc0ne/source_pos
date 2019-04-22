<?php
class GoodsController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function index()
    {
        $Where = array('IsDelete' => 0);
        $table = "smGoods";
        $data['path_link'] = "Goods/index";
        $data['SystemName'] = "Goods";
        //$data['Goods'] = $this->BaseSystem->GetDataAllRow($Where,$table);
        $data['Goods'] = $this->db->where($Where)->get('smGoods')->result_array();
        $this->load->view("Dashboard/index",$data);

        //$this->load->view("phpinfo");
    }

    public function ListGoods()
    {
        //$Where = array('IsDelete' => 0);
        //$query = $this->db->where($Where)->get('smGoods')->result_array();
        // $record_per_page = 15; 
        // if($this->input->post("page") != null)
        // {  
        //      $page = $this->input->post("page");  
        // }  
        // else  
        // {  
        //      $page = 1;  
        // }  
        // $start = ( $page - 1 ) * $record_per_page;  
        // $total_pages = ceil($this->db->where($Where)->count_all('smGoods') / $record_per_page);
        // $ListGoods = array_chunk($query, $record_per_page); 
        // $ResultData = $this->BaseSystem->GenListGoods($ListGoods,$page);
        // $arr = array(
        //     "GoodsData"=>$ResultData['ListGoods'],
        //     "TableData"=>$ResultData['TableData'],
        //     "PageData"=>$total_pages
        // );

        // echo json_encode($arr);

    }

    public function edit()
    {
        $data['path_link'] = "Goods/edit";
        $this->load->view("Dashboard/index",$data);
    }

    public function detail()
    {
        $data['path_link'] = "Goods/edit";
        $this->load->view("Dashboard/index",$data);
    }

    public function BindSave(){
        try{
            $System = $this->BaseSystem->GenSystem('Unit');
            $unit = $this->BaseSystem->GetDataOneRow($System['$table'],$this->input->post("goods_unit_id"));
            $IsBarcode = $this->input->post("IsBarcode");
            $data=array(
                "GoodsID"=>substr(uniqid(), 3), //10 หลัก
                "GoodsNo"=>$this->input->post("GoodsNo"),
                "GoodsBarcode"=>boolval($IsBarcode) != false ? $this->input->post("GoodsBarcode") : null,
                "GoodsName"=>$this->input->post("GoodsName"),
                "GoodsQty"=>1,
                "GoodsPrice"=>$this->input->post("GoodsPrice"),
                "GoodsCost"=>$this->input->post("GoodsCost"),
                "GoodsUnitID"=>"Null", //$unit['UnitID'],
                "GoodsUnitName"=>"Null", //$unit['UnitName'],
                "GoodsLocationID"=>"Null",
                "GoodsLocationName"=>"Null",
                "CreatedBy"=>null,
                "CreatedDate"=>date("Y-m-d H:i:s"),
                "ModifiedBy"=>null,
                "ModifiedDate"=>date("Y-m-d H:i:s"),
                "IsDelete"=>false,
                "IsBarcode"=>boolval($IsBarcode)
            );
            $this->db->insert("smGoods",$data);
        }catch(Exception $e){
            $this->BaseSystem->WriteLogError($e->getMessage());
        }
    }
    
    public function getGoods()
    {
        $Barcode = $this->input->post("GoodsBarcode");
        $where = "";
        $result = $this->BaseSystem->GetGoodsByBarcode($Barcode);

        //echo json_encode($result);
        echo $result;
    }

    public function getNoGoodsBarcode()
    {
        $Where = array('IsDelete' => 0,'IsBarcode' => 0);
        $query = $this->db->where($Where)->get('smGoods')->result_array();
        $record_per_page = 5; 
        $page = '';  

        if($this->input->post("page") != null)
        {  
             $page = $this->input->post("page");  
        }  
        else  
        {  
             $page = 1;  
        }  

        $start = ( $page - 1 ) * $record_per_page;  
        //$record_per_page = $start == 0 ? $record_per_page - 2 : $record_per_page;
        $total_pages = ceil($this->db->where($Where)->count_all('smGoods') / $record_per_page);
        $ListGoods = array_chunk($query, $record_per_page); 
        $ResultData = $this->BaseSystem->GetGoodsNoBarcode($ListGoods,$page);
        $arr = array(
            "GoodsData"=>$ResultData['ListGoods'],
            "TableData"=>$ResultData['TableData'],
            "PageData"=>$total_pages
        );

        echo json_encode($arr);

        //        $config['total_rows'] = ;
        //https://www.youtube.com/watch?v=nfDMTzmGi9Q
        //https://www.youtube.com/watch?v=xME6uHYTcLU Debug PHP
        //https://medium.com/@jaythedeveloper/ultimate-guide-debug-php-iis-in-visual-studio-code-using-xdebug-14fced013f22 Debug PHP IIS
    }

    // public function getNoGoodsBarcode()
    // {
    //     $Where = array('IsDelete' => 0,'IsBarcode' => 0);
    //     $query = $this->db->where($Where)->get('smGoods')->result_array();

    //     //$ResultData = $this->BaseSystem->GetGoodsNoBarcode($query);
    //     // $arr = array(
    //     //     "GoodsData"=>$ResultData['ListGoods'],
    //     //     "TableData"=>$ResultData['TableData'],
    //     //     "PageData"=>$total_pages
    //     // );

    //     echo json_encode($query);
    // }

    public function GetGoodsDetail()
    {
        $GoodsID = $this->input->post("GoodsID");
        $Table = "smGoods";
        $Where = array('GoodsID' => $GoodsID ,'IsDelete' => 0);
        $Result = $this->BaseSystem->GetDataOneRow($Table,$Where);

        echo json_encode($Result);
    }
}





?>
