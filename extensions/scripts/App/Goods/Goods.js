var TempDataNoGoodsBarcode = null;
let TempGoodsIDNoGoodsBarcode = new Array();
let numClick = 0;

$(document).ready(function() {
    $('.js-example-basic-single').select2();

    $("#GoodsUnitName").change(function () {
        
    });
});

$(document).on("click", "#btn-Save-Goods", function () {
    if (bindValidate("#frmGoods")){
        //openloading(true);
        $.ajax({
            type: 'POST',
            url: base_url + "Goods/GoodsController/BindSave",
            data: {
                "GoodsNo" : $("#GoodsNo").val(),
                "IsBarcode" : $("#IsBarcode:checkbox:checked").length,
                "GoodsBarcode" : $("#GoodsBarcode").val(),
                "GoodsName" : $("#GoodsName").val(),
                "GoodsPrice" : $("#GoodsPrice").val(),
                "GoodsCost" : $("#GoodsCost").val(),
                "goods_unit_id" : $("#GoodsUnit").val()
            },
            datatype: "json",
            traditional: true,
            success: function (e) {
                //openloading(false);
                //PostMsgSuccess(" บันทึกข้อมูลสำเร็จ");
                $("#GoodsModal").modal('toggle');
                clearModal("#frmGoods");
            },
            error: function (e) {
                //openloading(false);
            }
        });
    }
});

//Goods
function ShowModalGoods() {
    //openloading(true);
    if(checkDataTable('Unit')){
        $("#GoodsNo").val(GenRunningNumber("Goods"));
        GetDataJson('Unit','#GoodsUnit');
        $("#GoodsModal").modal();
        setTimeout(function(){
            $("#GoodsBarcode").focus();
            openloading(false);
        },700);
    }
}

$(document).on('click', '.page-link', function(){  
    var page = $(this).attr("id");  
    //GetNoGoodsBarcode(page);  
});  