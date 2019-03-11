<?php
class UnitController extends CI_Controller{

    public function _construct(){
      parent_construct();
    }

    public function BindSave(){
        try{
            $data=array(
                "UnitID"=>substr(uniqid(), 3), //10 หลัก
                "UnitNo"=>$this->input->post("UnitNo"),
                "UnitName"=>$this->input->post("UnitName"),
                "UnitQty"=>1,
                "CreatedBy"=>null,
                "CreatedDate"=>date("Y-m-d H:i:s"),
                "ModifiedBy"=>null,
                "ModifiedDate"=>date("Y-m-d H:i:s"),
                "IsDelete"=>false
            );
            $this->db->insert("smUnit",$data);
        }catch(Exception $e){
            $this->BaseSystem->WriteLogError($e->getMessage());
        }
    }

}





?>
