<script src="<?php echo base_url(); ?>extensions/js/Goods.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/content/App/pagination.css">

<!-- <div class="table-responsive t_test" data-pattern="priority-columns">
  <table summary="This table shows how to create responsive tables using RWD-Table-Patterns' functionality" class="table table-hover">
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
</div> -->


<div class="col-md-12">
    <div class="card h_detail_pos box_shadow">
        <div class="card-body p_a0" style="height:100%!important;">
          <div class="row h_100">
            <div class='col-12 wh_15 m_b5' style='border:black 1px;'>
            </div>

            <div class='col-12 wh_75'>
              <div class="table-responsive-xl m_a5 box_shadow">
              
                <table class="table m_a0">
                  <thead style='background-color: #1F262D !important;color:white;opacity:0.4;'>
                    <tr>
                      <th>Barcode</th>
                      <th data-priority="1">ชื่อสินค้า</th>
                      <th data-priority="2">จำนวนสินค้า</th>
                      <th data-priority="3">ราคาสินค้า</th>
                      <th data-priority="4">#</th>
                    </tr>
                  </thead>
                </table>
                <div class='js-pscroll ListGoods' id='style-2'>
                  <table class="table">
                    <tbody class='ListGoods_body'>
                      

                    </tbody>
                  </table>
                </div>
                
              </div>
            </div>

            <div class='col-12 wh_10'>
              <div class="content_detail__pagination cdp pageListGood" actpage="1">
              </div>
            </div>

          </div>
        </div>
    </div>
</div>