<?php    
class BaseSystem extends CI_Model
{
    public function GenSystem($System)
    {
        if ($System == "Unit") {
            $FirstChar = "UN";$table = "smUnit";$coloumn = "UnitNo";
        } else if($System == "Goods") {
            $FirstChar = "GO";$table = "smGoods";$coloumn = "GoodsNo";
        }

        $data = array(
            '$FirstChar' => $FirstChar, 
            '$table' => $table,
            '$coloumn' => $coloumn
        );

        return $data;
    }

    public function GetDataOneRow($table,$id){
        $result = $this->db->where('UnitID',$id)->get($table)->row_array();
        return $result;
    }

    public function WriteLogError($txtError){
        $strFileName = "http://localhost:8080/siriluk_shop/extensions/Log/LogError.txt";
        $objCreate = fopen($strFileName, 'a+');
        if($objCreate)
        {
            $str = "\r\n".date("Y-m-d H:i:s")." :: ".$txtError."\r\n";
            fwrite($file,$str);
        }
        else
        {
            echo "File Not Create.";
        }
        fclose($objCreate);
    }

    public function GetGoodsByBarcode($GoodsBarcode)
    {
        $Where = array('GoodsBarcode' => $GoodsBarcode, 'IsDelete' => 0,'IsBarcode' => 1);
        $result = $this->db->where($Where)->get('smGoods')->row_array();
        return $result;
    }

    public function GetGoodsNoBarcode($ListGoods,$start)
    {   
        if ($ListGoods != null) {
            $result = $ListGoods[$start - 1];
        }
        
        $table = '';
        //( SELECT    ROW_NUMBER() OVER ( ORDER BY OrderDate ) AS RowNum,
        //$result = $this->db->where($where)->get('smGoods',$start,$record_per_page)->result_array();
        //$query = $this->db->where($where)->get('smGoods')->result_array();
        $table .= '
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th class="w_5">
                            <label class="customcheckbox m-b-20">
                                <input type="checkbox" id="mainCheckbox" />
                                <span class="checkmark"></span>
                            </label>
                        </th>
                        <th scope="col" class="w_10 text-center">#</th>
                        <th scope="col" class="w_70">ชื่อสินค้า</th>
                        <th scope="col" class="w_15 text-right">ราคาสินค้า</th>
                    </tr>
                </thead>
                <tbody class="NoGoodsBarcode_Body">
        ';
        foreach ($result as $data) {
            $table .= '
                <tr id="uid" data-goodsid="'. $data['GoodsID'] .'">
                    <th>
                    <label class="customcheckbox">
                    <input type="checkbox" class="chkNoGoodsBarcode" />
                    <span class="checkmark"></span>
                    </label>
                    </th>
                    <td id="NoGoodsBarcode_QtyBarcode"><input type="number" style="height:5%;" class="text-center w_100" id="QtyBarcode" name="QtyBarcode" min="1" max="99" value="1"></td>
                    <td id="NoGoodsBarcode_GoodsName">'. $data['GoodsName'] .'</td>
                    <td id="NoGoodsBarcode_GoodsPrice" class="text-right">'.number_format((float)$data['GoodsPrice'], 2, '.', '').'</td>
                </tr>
            ';
        }

        $table .= '
                </tbody>
                    <!-- <tfoot class="page">
                    </tfoot> -->

            </table>
        ';

        return $ResultData = array(
            "ListGoods"=>$result,
            "TableData"=>$table
        );
    }

    public function GenListGoods($ListGoods,$start)
    {   
        if ($ListGoods != null) {
            $result = $ListGoods[$start - 1];
        }
        //<td>"'.$Icon_Edit.$Icon_Delete.'"</td>
        $Icon_Edit = "<span class='m_r5'><img src=".base_url()."extensions\images\icon\Edit_16.png class='pointer'></span>";
        $Icon_Delete = "<span><img src=".base_url()."extensions\images\icon\Delete_16.png class='pointer'></span>";
        $table = '';
        foreach ($result as $Goods) {
            $GoodsBarcode = $Goods['GoodsBarcode'] != null ? $Goods['GoodsBarcode'] : "-";
            $center = $Goods['GoodsBarcode'] == null ? "text-center" : "";
            $table .= '
                <tr>
                    <td class='.$center.'>'.$GoodsBarcode.'</td>
                    <td>'.$Goods['GoodsName'].'</td>
                    <td>'.$Goods['GoodsQty'].'</td>
                    <td>'.number_format((float)$Goods['GoodsPrice'], 2, '.', ',').'</td>    
                    <td>'.$Icon_Edit.$Icon_Delete.'</td>
                </tr>
            ';
        }

        return $ResultData = array(
            "ListGoods"=>$result,
            "TableData"=>$table
        );
    }
    
}
      
?>