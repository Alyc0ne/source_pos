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
.input-l{
  width:40%;
  height:40%;
  font-size:16pt;
  border:none;
  margin-right:5px;
  background-color:white !important;
  color:black;
}
.input_r{
  width:55%;
  height:40%;
  font-size:36pt;
}
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
<!-- Modal -->
<div class="modal fade" id="Confrim_POS" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">ยืนยันการขายสินค้า ?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div style='width:80%;height:20%;margin: 0 auto;'>
          <div style='width:100%;height:20%;float:right;'>
            <input type='text' class='input-l' value='จำนวนเงินทั้งสิ้น' disabled>
            <input type='text' class='text-right input_r' id='TotalAmnt' disabled>
          </div>
        </div>

        <div style='width:80%;height:20%;margin: 0 auto;'>
          <div style='width:100%;height:20%;float:right;'>
            <input type='text' class='input-l' value='จำนวนเงินที่รับมา (เงินสด)' disabled>
            <input type='text' class='text-right input_r' id='CashAmnt' value='0.00'>
          </div>
        </div>

        <div style='width:80%;height:20%;margin: 0 auto;'>
          <div style='width:100%;height:20%;float:right;'>
            <input type='text' class='input-l' value='จำนวนเงินที่รับมา (บัตร)' disabled>
            <input type='text' class='text-right input_r' id='BlueFlagAmnt' value='0.00'>
          </div>
        </div>

        <div style='width:80%;height:20%;margin: 0 auto;'>
          <div style='width:100%;height:20%;float:right;'>
            <input type='text' class='input-l' value='เงินถอน' disabled>
            <input type='text' class='text-right input_r' id='ChangeAmnt' disabled>
          </div>
        </div>

        
        <div style='width:80%;height:20%;margin: 0 auto;'>
          <div style='width:100%;height:20%;float:right;'>
            <span id='BalanceAmnt' class='text-red' hide></span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <!-- <button type="button" class="btn btn-secondary btn-Confrim" data-dismiss="modal">Cancel</button> -->
        <button type="button" class="btn btn-primary btn-primary_Confrim" id='Confrim_SaveInvoice' onclick='javascript:SaveInvoice();'><i class="mdi mdi-check"></i>ชำระเงิน</button>
      </div>
    </div>
  </div>
</div>

<script>
$(document).on("blur","#CashAmnt", function () {
  CalAmnt();
});

$(document).on("blur","#BlueFlagAmnt", function () {
  CalAmnt();
});

function CalAmnt() {
  var CashAmnt = $("#CashAmnt").val();
  var BlueFlagAmnt = $("#BlueFlagAmnt").val();
  var TotalAmnt = parseFloat($("#TotalAmnt").val());
  var ChangeAmnt = 0;
  var ReceiveAmnt = parseFloat(CashAmnt) + parseFloat(BlueFlagAmnt);

  if (CashAmnt != "" && BlueFlagAmnt != "") {
    if (ReceiveAmnt >= TotalAmnt) {
      ChangeAmnt = TotalAmnt - ReceiveAmnt;
      $("button#Confrim_SaveInvoice").prop('disabled',false);
      $("span#BalanceAmnt").hide();
    }else{
      ChangeAmnt = 0;
      $("button#Confrim_SaveInvoice").prop('disabled',true);
      $("#BalanceAmnt").prop("type",'text');
      var BalanceAmnt = TotalAmnt - ReceiveAmnt;
      $("span#BalanceAmnt").show().text("ยอดต้องชำระคงเหลือ : " + numberWithCommas(parseFloat(BalanceAmnt).toFixed(2)));
    }
    
    $("#CashAmnt").val(numberWithCommas(parseFloat(CashAmnt).toFixed(2)));
    $("#BlueFlagAmnt").val(numberWithCommas(parseFloat(BlueFlagAmnt).toFixed(2)));
    $("#ChangeAmnt").val(numberWithCommas(parseFloat(ChangeAmnt).toFixed(2)));
  }else{
    $("#CashAmnt").val(numberWithCommas(parseFloat(0).toFixed(2)));
    $("#BlueFlagAmnt").val(numberWithCommas(parseFloat(0).toFixed(2)));
  }
}
</script>