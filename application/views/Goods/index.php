<script src="<?php echo base_url(); ?>extensions/js/Goods.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/content/Default/table.css">
<link rel="stylesheet" href="<?php echo base_url(); ?>extensions/content/App/pagination.css">

<div class="col-md-12">
    <div class="h_detail_pos">
        <div class="p_a0" style="height:100%!important;">
          <div class="row h_100">
            <div class='col-12 wh_15 m_b5' style='border:black 1px;'>
            </div>

            <div class='col-12 wh_75'>
              <div class="table-responsive-xl m_a5 box_shadow">

                <div class="container-table100">
                  <div class="wrap-table100">
                    <div class="table100 ver5 m-b-110 ListGoods"> 
                      <div class="table100-head">

                        <table>
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
                      </div>

                      <div class="table100-body js-pscroll">
                        <table>
                          <tbody class='ListGoods_body'>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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