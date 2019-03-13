<script src="<?php echo base_url(); ?>extensions/js/Goods.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/content/App/pagination.css">

<div class="table-responsive t_test" data-pattern="priority-columns">
  <table summary="This table shows how to create responsive tables using RWD-Table-Patterns' functionality" class="table table-hover">
    <caption class="text-center">
    <div class="content_detail__pagination cdp pageListGood" actpage="1">
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
    <tbody class='ListGoods_body'>
      

    </tbody>
  </table>
</div>