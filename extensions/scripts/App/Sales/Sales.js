var update = false;
$(document).ready(function() {
    setTimeout(function(){ $("#GoodsBarcode").focus(); }, 500);
});

$("#discountCash").change(function(e) {
    $subTotal = $("#subTotal").val();
    $discount = $("#discountCash").val();

});

function manageAdd_updateGoods(QtyBarcode,DataGoods,TransactionGoods) {
    var index = null;
    if(TransactionGoods.length >= 1){
        index = TransactionGoods.find((x => x.GoodsID == DataGoods.GoodsID));
    }

    if(index == null){
        var GoodsPrice = transacSalesGoods.gridControl.addData(DataGoods,QtyBarcode);
        transacSalesGoods.gridControl.calSummary(true,parseFloat(GoodsPrice));
    }else{
        transacSalesGoods.gridControl.updateGoodsByIndex(index.uid,DataGoods.GoodsPrice,QtyBarcode);
    } 
}

$(document).on("click","#RemoveGoods", function(e){
    var uid = $(this).closest("#GoodDetail").data("uid");
    bootbox.confirm(
        "ต้องการลบสินค้าชิ้นนี้ ใช่หรือไม่ ?"
    , function(result){ 
        if (result) {
            transacSalesGoods.gridControl.removeGoods(uid);
        }
    });
});

$(document).on("change","#discount", function () {
   var dis = $("#discount").val();
   var sdis = dis.split('%');
   var txtDiscount = 0;
   if (sdis.length > 1) {
        txtDiscount = sdis[0] + "%";
   }else{
        txtDiscount = numberWithCommas(parseFloat(sdis[0]).toFixed(2));
   }
   if(transacSalesGoods.gridControl.countGoodsTransac() > 0){
        $("#discount").val(txtDiscount);
   }else{
        $("#discount").val("");
   }

   transacSalesGoods.gridControl.calSummary("","",txtDiscount);
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).on("click","#SaveInvoice", function () {
    Confirm_POS();
})

function SaveInvoice() {
    var GridGoods = transacSalesGoods.gridControl.selectDataGrid();
    var InvoiceData = {
        InvoiceNo : GenRunningNumber("Invoice"),
        TotalAmnt : $("#TotalAmnt").val(),
        ReceiveAmnt : $("#ReceiveAmnt").val(),
        ChangeAmnt : $("#ChangeAmnt").val(),
        Discount : null,
        DiscountAmnt : null,
        NetAmnt : $("#TotalAmnt").val()
    };
    if (GridGoods.length > 0) {
        $.ajax({
            type: 'POST',
            url: base_url + "Invoice/InvoiceController/SaveInvoice",
            dataType: 'json',
            data: {
                "GoodsData" : JSON.stringify(GridGoods),
                "InvoiceData" : JSON.stringify(InvoiceData)
            },
            async: false,
            traditional: true,
            success: function (e) {
                callback(true);
            },
            error: function (e) {
                //callback(false);
            }
        });
    }else{

    }
}

function myFunction() {
    var myWindow = window.open("", "myWindow", "width=200,height=100");
    myWindow.document.write("<p>This is 'myWindow'</p>");
    //myWindow.opener.document.write("<p>This is the source window!</p>");
  }