<style>
.btn-Confrim{
    color: black !important;
    background-color: white !important;
    border-color: #ccc !important;
}
.btn-Confrim:hover{
    color: #333 !important;
    background-color: #d4d4d4 !important;
    border-color: #ccc !important;
}
.btn-primary_Confrim{
    color: #fff !important;
    background-color: #337ab7 !important;
    border-color: #2e6da4 !important;
}
</style>
<!-- Modal -->
<div class="modal fade" id="ConfrimModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">ยืนยันการขายสินค้า ?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-Confrim" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary btn-primary_Confrim" id='Confrim_SaveInvoice'><i class="mdi mdi-check"></i> Save</button>
      </div>
    </div>
  </div>
</div>