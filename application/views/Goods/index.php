<script src="<?php echo base_url(); ?>extensions/scripts/App/Goods/Goods.js"></script>

<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>  
<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" />



<input type='hidden' id='PageSystem' value='ListGoods'>
<div class="col-md-12">
    <div class="card shadow mb-4 h_detail_pos">
        <div class="card-body p_a0" style="height:100%!important;">
          <div class="row h_100">
            <div class='col-12 wh_10 m_b5'>
            </div>

            <div class='col-12 wh_85'>
              <div class="table-responsive" style='padding:0px 10px 0px 10px;'>
                <table id="example" class="display compact" style="width:100%">
                  <thead>
                      <tr>
                        <th>Barcode</th>
                        <th>ชื่อสินค้า</th>
                        <th>จำนวนสินค้า</th>
                        <th>ราคาสินค้า</th>
                        <th>#</th>
                      </tr>
                  </thead>
                  <tbody>
                    <?php
                      foreach ($Goods as $_Goods) {
                        echo "<tr>";
                          echo "<td>".$_Goods['GoodsBarcode']."</td>";
                          echo "<td>".$_Goods['GoodsName']."</td>";
                          //echo "<td><a href='Detail?id=".$Goods['GoodsID'].">".$Goods['GoodsName']."</a></td>";
                          echo "<td>".$_Goods['GoodsQty']."</td>";
                          //echo "<td>".$_Goods['GoodsPrice']."</td>";
                          echo "<td>".number_format((float)$_Goods['GoodsPrice'], 2, '.', ',')."</td>";
                          //echo "<td>".$_Goods['GoodsPrice']."</td>";
                          echo "<td><img style='margin-right:5px;' src=".base_url()."extensions\images\icon\Edit_16.png onclick='EditGoods(".$_Goods['GoodsID'].")' class='pointer'><img src=".base_url()."extensions\images\icon\Delete_16.png class='pointer'></td>";
                          echo "</tr>";
                      }
                    ?>  
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
    </div>
</div>

<script>
$(document).ready(function() {
    var table = $('#example').DataTable({
      "lengthMenu": [[10], [10]],
      //"paging":   false,
      "ordering": false,
      "info":     false
    });
 
    $('#example tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
 
    $('#button').click( function () {
        alert( table.rows('.selected').data().length +' row(s) selected' );
    } );
} );
</script>