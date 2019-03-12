<script src="<?php echo base_url(); ?>extensions/js/Goods.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/content/App/pagination.css">
<div class="table-responsive t_test" data-pattern="priority-columns">
  <table summary="This table shows how to create responsive tables using RWD-Table-Patterns' functionality" class="table table-hover">
    <caption class="text-center">
    <div class="content_detail__pagination cdp" actpage="1">
      <?php
        for ($i=0; $i < $page; $i++) { 
          if ($page > 1 && $i == 0) 
            echo "<a href='#!1' class='page-item'>Previous</a>";
          echo "<a href='#!1' class='page-item'>".($i + 1)."</a>";
          if ($page > 1 && $i == ($page -1)) 
            echo "<a href='#!1' class='page-item'>Next</a>";
        }
      ?>
		</div>
    </caption>
    <thead style='background-color:#1F262D;color:white;'>
      <tr>
        <th>Barcode</th>
        <th data-priority="1">ชื่อสินค้า</th>
        <th data-priority="2">จำนวนสินค้า</th>
        <th data-priority="3">ราคาสินค้า</th>
        <th data-priority="4">#</th>
      </tr>
    </thead>
    <tbody>
    <?php 
      // foreach ($result as $Goods) {
      //   if (Count($result) > 0) {
      //     //$num = 1;
      //     echo "<tr>";
      //         //echo "<td>",$Icon_Edit.$Icon_Delete,"</td>";
      //         //echo "<th scope='row'>",$Icon_Edit.$Icon_Delete,"</th>";
      //         echo "<td>",$Goods['GoodsBarcode'],"</td>";
      //         echo "<td>",$Goods['GoodsName'],"</td>";
      //         echo "<td>",$Goods['GoodsQty'],"</td>";
      //         echo "<td>".number_format((float)$Goods['GoodsPrice'], 2, '.', ',')."</td>";
      //         echo "<td>",$Icon_Edit.$Icon_Delete,"</td>";
      //     echo "</tr>";
      //     //$num++;
      //   }else {
      //     echo "<tr>";
      //       echo "<th scope='row' colspan='5'> ไม่มีรายการสินค้า </th>";
      //     echo "</tr>";
      //   }
      // }

    ?>
    </tbody>
  </table>
</div>