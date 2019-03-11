<script src="<?php echo base_url(); ?>extensions/scripts/App/Goods/Goods.js"></script>
<!-- Modal -->
<div class="modal fade" id="GoodsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">New Goods (เพิ่มสินค้า)</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        <div id='frmGoods'>
            <div class="form-group row">
                <label for="GoodsNo" class="col-sm-2 col-form-label">รหัสสินค้า : </label>
                <div class="frm-content col-sm-10">
                    <input type="text" class="form-control" id="GoodsNo" data-maxlength='10' disabled>
                </div>
            </div>
            <div class="form-group row">
                <label for="GoodsBarcode" class="col-sm-2 col-form-label require"><span class='text-red'></span>Barcode : </label>
                <div class="col-sm-10">
                    <div class="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" class="custom-control-input" id="IsBarcode">
                        <label class="custom-control-label" for="IsBarcode">ใช้งาน Barcode</label>
                    </div>
                    <input type="text" class="form-control" id="GoodsBarcode" name="GoodsBarcode" data-maxlength='10' disabled>
                </div>
            </div>
            <div class="form-group row">
                <label for="GoodsName" class="col-sm-2 col-form-label require"><span class='text-red'>*</span>ชื่อสินค้า : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="GoodsName" name="GoodsName" data-maxlength='250'>
                </div>
            </div>
            <!-- <div class="form-group row">
                <label for="GoodsQty" class="col-sm-2 col-form-label">จำนวนสินค้า : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control _number" id="GoodsQty" data-maxlength='100'>
                </div>
            </div> -->
            <div class="form-group row">
                <label for="GoodsPrice" class="col-sm-2 col-form-label require"><span class='text-red'>*</span>ราคาสินค้า : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control _number" id="GoodsPrice" name="GoodsPrice">
                </div>
            </div>
            <div class="form-group row">
                <label for="GoodsCost" class="col-sm-2 col-form-label">ต้นทุนสินค้า : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control _number" id="GoodsCost" name="GoodsCost">
                </div>
            </div>
            <div class="form-group row">
                <label for="GoodsUnit" class="col-sm-2 col-form-label">หน่วยนับ : </label>
                <div class="col-sm-10">
                    <select class='js-example-basic-single' name='GoodsUnit' id='GoodsUnit'>
                    </select>
                </div>
            </div>
            <input type='hidden' id='GoodsUnitID' name='GoodsUnitID'>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="btn-Save-Goods">Save changes</button>
      </div>
    </div>
  </div>
</div>