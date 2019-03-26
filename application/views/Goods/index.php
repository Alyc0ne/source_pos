<script src="<?php echo base_url(); ?>extensions/scripts/App/Goods/Goods.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/css/content/pagination.css">
<input type='hidden' id='PageSystem' value='ListGoods'>
<div class="col-md-12">
    <div class="card shadow mb-4 h_detail_pos">
        <div class="card-body p_a0" style="height:100%!important;">
          <div class="row h_100">
            <div class='col-12 wh_15 m_b10'>
            </div>

            <div class='col-12 wh_75'>
              <div class="table-responsive" style='padding:0px 10px 0px 10px;'>
                <table class="tablehead m_a0">
                  <thead>
                    <tr>
                      <th class='column1'>Barcode</th>
                      <th class='column2'>ชื่อสินค้า</th>
                      <th class='column3'>จำนวนสินค้า</th>
                      <th class='column4'>ราคาสินค้า</th>
                      <th class='column5'>#</th>
                    </tr>
                  </thead>
                </table>

                <div class='ListGoods' id='style-2'> 
                  <table class="tablebody">
                    <tbody class='ListGoods_body'>
                      

                    </tbody>
                  </table>
                </div>

              </div>

            <div class='col-12 w_100 h_10'>
              <div class='w_50' style='float:left;margin:12px 0px 12px 0px;'>
                <p>Showing 1 to 10 of 57 entries</p>
              </div>
              <div class='w_50' style='float:right;'>
                <div class="content_detail__pagination cdp pageListGood" actpage="1">
              </div>
              </div>
            </div>

          </div>
        </div>
    </div>
</div>