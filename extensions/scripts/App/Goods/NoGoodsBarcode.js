$(document).on("click", "#IsBarcode", function () {
    var IsBarcode = $("#IsBarcode:checkbox:checked").length;
    if (IsBarcode > 0) {
        $("#GoodsBarcode").prop("disabled",false);
        $("#GoodsBarcode").closest("div.form-group").find("span.text-red").html("*");
    }else{
        $("#GoodsBarcode").prop("disabled",true);
        $("#GoodsBarcode").closest("div.form-group").find("span.text-red").html("");
    }
});

function ShowModalNoGoodsBarcode() {
    GetNoGoodsBarcode();
    $("#NoGoodsBarcodeModal").modal();
}

function GetNoGoodsBarcode(page) {
    $.ajax({
        type: 'POST',
        url: base_url + "Goods/GoodsController/getNoGoodsBarcode",
        data: {
            page : page,
        },
        dataType: "json",
        traditional: true,
        success: function (e) {
            TempGoodsIDNoGoodsBarcode = [];
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
            
            // pagination += ' </nav>';
            $('.page').append(pagination);
        },
        error: function (e) {
            //openloading(false);
        }
    });
}

$(document).on('click', '.NoBarcode_Page-link', function(){  
    var page = $(this).attr("id");  
    GetNoGoodsBarcode(page);  
});  

$(document).on("click", ".chkNoGoodsBarcode", function (e) {
    var GoodsID = $(this).closest('tr').data("goodsid"); //GoodsID for rowGoods
    if($(".chkNoGoodsBarcode:checkbox:checked").length > numClick){
        TempGoodsIDNoGoodsBarcode.push(GoodsID);
        numClick++;
    }else{
        var index = TempGoodsIDNoGoodsBarcode.map(x => {
            return x.GoodsID;
        }).indexOf(GoodsID);
        TempGoodsIDNoGoodsBarcode.splice(index,1);
        numClick--;
    }
});

$(document).on("click", "#btn-Select-NoGoodsBarcode", function (e) {
    numClick =0;
    var arrResult = new Array();
    if (TempGoodsIDNoGoodsBarcode != null && TempGoodsIDNoGoodsBarcode.length > 0) {
        for (let c = 0; c < TempGoodsIDNoGoodsBarcode.length; c++) {
            var result = TempDataNoGoodsBarcode.find(x => x.GoodsID == TempGoodsIDNoGoodsBarcode[c]);
            arrResult.push(result);
        }
        
        var GridGoods = transacSalesGoods.gridControl.selectDataGrid();
        if (arrResult != null && arrResult.length > 0) {
            for (let a = 0; a < arrResult.length; a++) {
                var QtyBarcode = $(".NoGoodsBarcode_Body").find('tr[data-goodsid=' + arrResult[a].GoodsID + '] td#NoGoodsBarcode_QtyBarcode input#QtyBarcode').val();
                manageAdd_updateGoods(QtyBarcode,arrResult[a],GridGoods);
            }
        }
    }
    $('#NoGoodsBarcodeModal').modal('toggle');
    $(".table-responsive").html("");
    $(".page").html("");
});

$(document).on("change", "#GoodsBarcodeSearch", function(ae) {
    openloading(true);
    var QtyBarcode = $("#QtyBarcode").val();
    $.ajax({
        type: 'POST',
        url: base_url + "Goods/GoodsController/getGoods",
        dataType: 'json',
        data: {GoodsBarcode: $("#GoodsBarcodeSearch").val()},
        async: false,
        success: function(e) {
            if(e != null){
                var GridGoods = transacSalesGoods.gridControl.selectDataGrid();
                manageAdd_updateGoods(QtyBarcode,e,GridGoods,GridGoods);
            }
        },
        error: function(e) {
            openloading(false);
        }
    });
    $("#GoodsBarcodeSearch").val("");
    openloading(false);
});