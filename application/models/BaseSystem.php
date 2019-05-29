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

    public function GetDataAllRow($Table,$Where){
        $result = $this->db->where($Where)->get($Table)->result_array();
        return $result;
    }

    public function GetDataOneRow($Table,$Where){
        $result = $this->db->where($Where)->get($Table)->row_array();
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
        
        //$table = '';
        $table = '
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th class="w_5">
                            <label class="customcheckbox m_b20">
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
        if (!empty($result)) {
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
        }else {
            $result = null;
            $table .= '
                <tr>
                    <td colspan ="4" style="font-size:18pt;"> <b>ไม่พบข้อมูลที่ค้นหา</b> </td>
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

    // public function GetGoodsNoBarcode($ListGoods)
    // {   
    //     foreach ($ListGoods as $data) {
    //         $Goods_Arr([
    //             "GoodsName" => $data['GoodsName'],
    //             "GoodsPrice" => $data['GoodsPrice']
    //         ]);
    //     }

    //     return $Goods_Arr;
    // }

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
                    <td class="column1 '.$center.'">'.$GoodsBarcode.'</td>
                    <td class="column2"><a href="Detail?id='.$Goods['GoodsID'].'">'.$Goods['GoodsName'].'</a></td>
                    <td class="column3">'.$Goods['GoodsQty'].'</td>
                    <td class="column4">'.number_format((float)$Goods['GoodsPrice'], 2, '.', ',').'</td>    
                    <td class="column5">'.$Icon_Edit.$Icon_Delete.'</td>
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