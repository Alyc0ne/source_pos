<script src="<?php echo base_url(); ?>extensions/scripts/App/Unit/Unit.js"></script>

<!-- Modal -->
<div class="modal fade" id="UnitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">New Unit (เพิ่มหน่วนนับ)</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id='frmUnit'>
            <div class="form-group row">
                <label for="UnitNo" class="col-sm-2 col-form-label require">รหัสหน่วยนับ : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="UnitNo" name="UnitNo" data-maxlength='10' disabled>
                </div>
            </div>
            <div class="form-group row">
                <label for="UnitName" class="col-sm-2 col-form-label require"><span class='text-red'>*</span> ชื่อหน่วยนับ : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="UnitName" name="UnitName" data-maxlength='250' >
                </div>
            </div>
            <!-- <div class="form-group row">
                <label for="UnitQty" class="col-sm-2 col-form-label">จำนวนหน่วยนับ : </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="UnitQty" name="UnitQty" data-maxlength='100' value='1'>
                </div>
            </div> -->
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id='btn-SaveUnit'>Save changes</button>
      </div>
    </div>
  </div>
</div>