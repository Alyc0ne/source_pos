<div class="table-responsive">
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col" class='w_6'>#</th>
        <th scope="col">Barcode</th>
        <th scope="col">ชื่อสินค้า</th>
        <th scope="col">จำนวนสินค้า</th>
        <th scope="col">ราคาสินค้า</th>
      </tr>
    </thead>
    <tbody>
      <?php 
        foreach ($result as $Goods) {
          if (Count($result) > 0) {
            //$num = 1;
            echo "<tr>";
                echo "<td>",$Icon_Edit.$Icon_Delete,"</td>";
                //echo "<th scope='row'>",$Icon_Edit.$Icon_Delete,"</th>";
                echo "<td>",$Goods['GoodsBarcode'],"</td>";
                echo "<td>",$Goods['GoodsName'],"</td>";
                echo "<td>",$Goods['GoodsQty'],"</td>";
                echo "<td>".number_format((float)$Goods['GoodsPrice'], 2, '.', ',')."</td>";
            echo "</tr>";
            //$num++;
          }else {
            echo "<tr>";
              echo "<th scope='row' colspan='5'> ไม่มีรายการสินค้า </th>";
            echo "</tr>";
          }
        }

      ?>
    </tbody>
  </table>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</div>