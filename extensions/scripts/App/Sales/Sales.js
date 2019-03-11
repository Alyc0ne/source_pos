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
        var GoodsPrice = transacSalesGoods.gridControl.addData(DataGoods.GoodsID,DataGoods.GoodsName,DataGoods.GoodsPrice,QtyBarcode);
        transacSalesGoods.gridControl.calSummary(true,parseFloat(GoodsPrice));
    }else{
        transacSalesGoods.gridControl.updateGoodsByIndex(index.uid,DataGoods.GoodsPrice,QtyBarcode);
    } 
}

$(document).on("click",".imageDel", function(e){
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
    var GridGoods = transacSalesGoods.gridControl.selectDataGrid().length;
    if (GridGoods > 0) {
        $("#ConfrimModal").modal();
        //if ($('#ConfrimModal').is(':visible')) {
            $("#Confrim_SaveInvoice").click(function () {
                SaveInvoice(function (callback) {
                    if (!!callback) {
                        console.log("true");
                    }else{  
                        bootbox.alert("<center>ไม่สามารถดำเนินการต่อได้<br>กรุณาติดต่อผู้ดูแลระบบ</center>");
                    }
                });
            });
        //}
    }else{
        bootbox.alert("<center>ไม่สามารถดำเนินการต่อได้<br>กรุณาเพิ่มสินค้า</center>");
    }
    
})

function SaveInvoice(callback) {
    var GridGoods = transacSalesGoods.gridControl.selectDataGrid();
    if (GridGoods.length > 0) {
        $.ajax({
            type: 'POST',
            url: base_url + "Invoice/InvoiceController/SaveInvoice",
            dataType: 'json',
            data: {
                "GoodsData" : JSON.stringify(GridGoods)
            },
            async: false,
            traditional: true,
            success: function (e) {
                callback(true);
            },
            error: function (e) {
                callback(false);
            }
        });
    }else{

    }
}