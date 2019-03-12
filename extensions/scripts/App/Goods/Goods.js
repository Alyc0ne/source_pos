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
    GetGoods(page);  
});  

function GetGoods(page) {
    $.ajax({
        type: 'POST',
        url: base_url + "Goods/GoodsController/index",
        data: {
            page : page,
        },
        dataType: "json",
        traditional: true,
        success: function (e) {
            TempDataNoGoodsBarcode = e.GoodsData;
            $(".table-responsive").html("");
            $(".page").html("");
            $(".table-responsive").append(e.TableData);

            var pagination = '<nav aria-label="...">';
            pagination += '<ul class="pagination  justify-content-center">';
            pagination += '<li class="page-item disabled">';
            pagination += '<a class="page-link" href="#" tabindex="-1">Previous</a>';
            pagination += '</li>';

            for (let c = 0; c < e.PageData; c++) {
                var numPage = c+1;
                pagination += '<li class="page-item"><a class="NoBarcode_Page-link" id=' + numPage + ' href="#">' + numPage + '</a></li>';
            }
            
            if (e.PageData > page) {
                pagination += '<li class="page-item">';
                pagination += '<a class="page-link" href="#" id=' + page + 1 + '>Next</a>';
                pagination += '</li>';
            }
            
            pagination += ' </nav>';
            $('.page').append(pagination);
        },
        error: function (e) {
            //openloading(false);
        }
    });
}