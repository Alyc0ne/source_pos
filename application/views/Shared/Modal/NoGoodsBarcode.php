<link href="<?php echo base_url(); ?>extensions/css/content/multicheck.css" rel="stylesheet">
<script src="<?php echo base_url(); ?>extensions/scripts/App/Goods/NoGoodsBarcode.js"></script>

<div class="modal fade" id="NoGoodsBarcodeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">NoGoodsBarcode (สินค้าไม่มีบาร์โค้ด)</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- <div class='m_b20 text-right'>
          <input type='textbox' class="form-control form-control" id='SearchNoGoodsBarcode' name='SearchNoGoodsBarcode' placeholder='ค้นหา'>
        </div> -->

        <div class="input-group m_b10">
          <input class="form-control py-2" type="search" value="search" id="SearchNoGoodsBarcode" name='SearchNoGoodsBarcode' placeholder='ค้นหา'>
          <span class="input-group-append">
            <button class="btn btn-outline-secondary border-left-0 border" id='btn-SearchNoGoodsBarcode' class='btn-SearchNoGoodsBarcode' type="button">
                <i class="fa fa-search"></i>
            </button>
          </span>
        </div>

        <div class="table-responsive">

        </div>
        <div class="page">
            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="btn-Select-NoGoodsBarcode">Select</button>
      </div>
    </div>
  </div>
</div>