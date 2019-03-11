var transacSalesGoods = new setTransac();

$(document).ready(function () {
    transacSalesGoods.init();
});

var GrandTotal = 0;
var sub_total = 0;
var arr_Data = new Array();
function setTransac() {
    var _t = this;
    _t.Name = "Sell-PageRight";
    _t.Element = null;
    _t.init = function(){
        _t.htmlControl.getElement();
        _t.htmlControl.genGrid();
        //11
    };

    _t.htmlControl = {
        getElement: function () {
            _t.Element = $("#" + _t.Name);
            return _t.Element;
        },
        genGrid: function () {
            // var LeftBox = $('<div class="row" style="height:100%!important;"></div>');
            // LeftBox.append("<input type='text' style='border:none;height:5%;' class='w_15' value='Qty (จำนวนสินค้า) : '> ");
            // LeftBox.append("<input type='number' style='height:5%;' class='w_5 text-center m_l10' id='QtyBarcode' name='QtyBarcode' min='1' max='99' value='1'>");
            // LeftBox.append("<input list='Goods' class='w-75 input-icon-barcode' id='GoodsBarcodeSearch' style='height:5%;margin: 0 auto;'>");
            // LeftBox.append("<datalist id='Goods'></datalist>");

            var Rightbox = $('<div class="row" style="height:100%!important;"></div>');
            var gridStart = $('<div id="gridStart" style="width:100%;"></div>');
            gridStart.append("<div class='col-12 p_a5' style='height:5%;border:solid 1px red;'></div>");
            gridStart.append("<div class='col-12 p_a5' style='overflow:auto;height:70%;border:solid 1px blue;' id='transac-body'></div>");

            var gridEnd = $('<div id="gridEnd" style="width:100%;"></div>');
            var table = "<table style='width:100%;margin:7px;'>";
            table += "<tr style='width:100%;'><td style='width:30%;'>รวมเงิน</td><td style='width:5%;'> : </td><td style='width:65%;'><input type='text' class='w-100 float-right text-right' id='sub_total' name='sub_total' value='' readonly></td></tr>";
            table += "<tr style='width:100%;'><td style='width:30%;'>ส่วนลด</td><td style='width:5%;'> : </td><td><input type='text' class='w-100 float-right text-right _number' id='discount' name='discount' value=''></td></tr>";  
            table += "<tr style='width:100%;'><td style='width:30%;'>จำนวนเงินทั้งสิ้น</td><td style='width:5%;'> : </td><td><input type='text' class='w-100 float-right text-right' id='totalPrice' name='totalPrice' value='' readonly></td></tr>";  
            table += "</table>";
            gridEnd.append(table);
            gridEnd.append("<div class='w-100'></div>");
            gridEnd.append("<button class='btn btn-success w-100 p-3' id='SaveInvoice'>จ่ายชำระ</button>");
            
            gridStart.append(gridEnd);
            Rightbox.append(gridStart);
            _t.Element.append(Rightbox);
            //$("#Sell-PageLeft").append(LeftBox);
        }
    };
    _t.gridControl = {
        getData_uid: function (uid){
            if(uid != null || uid != ""){
                var GoodDetail = _t.Element.find("#transac-body #GoodDetail[data-uid='" + uid +  "']");
                var obj = {
                    GoodsQty: GoodDetail.children()[1].textContent,
                    GoodsName:GoodDetail.children()[2].textContent,
                    GoodsPrice:GoodDetail.children()[3].textContent,
                }
                return obj;
            }
        },
        addData: function (GoodsID,GoodsName,GoodsPrice,QtyBarcode) { //QtyBarcode : Number Of Goods
            var _t_body = _t.Element.find('#transac-body');
            var uid = RandomMath();
            var TotalAmnt = GoodsPrice * QtyBarcode;
            var PricePerGoods = QtyBarcode > 1 ? "@" + String(numberWithCommas(parseFloat(GoodsPrice).toFixed(2))) : "";
            var Goods = $('<div class="w_100 h_5 bg_white m_b5" id="GoodDetail" data-uid="' + uid + '"></div>');
            Goods.append("<div class='w_5 float-left text-left'><span class='imageDel' style='cursor:pointer;'><input type='hidden' value='1234'></span></div>");
            Goods.append("<div class='w_10 float-left text-center m_r5'><span class='w_100 h_0 text-center' name='GoodsQty'>"  + QtyBarcode + "</span></div>");
            Goods.append("<div class='w_40 float-left text-left text-ellipsis' alt = '" + GoodsName + "'><span>" + GoodsName + "</span></div>");
            Goods.append("<div class='w_20 float-left text-right'><span id='PricePerGoods' style='display:inline-block;'>"  + PricePerGoods + "</span></div>");
            Goods.append("<div class='w_20 float-left text-right'><span id='TotalAmnt'>" + numberWithCommas(parseFloat(TotalAmnt).toFixed(2)) + "</span></div>");
            _t_body.append(Goods);
            arr_Data.push({
                uid : uid,
                GoodsID : GoodsID,
                GoodsName : GoodsName,
                GoodsQty : QtyBarcode,
                GoodsPrice : GoodsPrice,
                TotalAmnt : TotalAmnt
            });
            var sumPrice = QtyBarcode * GoodsPrice;
            return sumPrice;
        },
        calSummary: function (plus,GoodsPrice,Discount) {
            if (GoodsPrice != null || GoodsPrice != "" || GoodsPrice != 0 || typeof GoodsPrice == "undefined") {
                if(plus){
                    GrandTotal += GoodsPrice;
                    sub_total += GoodsPrice;
                }else{
                    GrandTotal -= GoodsPrice;
                    sub_total -= GoodsPrice;
                }
            }
        
            if (Discount != null && Discount != "" && Discount != 0 && typeof Discount != "undefined") {
                if (Discount.indexOf('%') >= 0) {
                    var dis = Discount.split('%');
                    var sumDis = (GrandTotal * dis) / 100;
                    GrandTotal = sumDis;
                }else{
                    GrandTotal -= Discount;
                }
            }else{
                $("#totalPrice").val(); 
            }

            $("#sub_total").val(numberWithCommas(sub_total.toFixed(2)));
            $("#totalPrice").val(numberWithCommas(GrandTotal.toFixed(2))); 
            
        },
        removeGoods: function (uid){
            var index = arr_Data.map(x => {
                return x.uid;
            }).indexOf(uid);
            arr_Data.splice(index,1);

            var GoodDetail = _t.Element.find("#transac-body #GoodDetail[data-uid='" + uid +  "']");
            var dataOneRow = _t.gridControl.getData_uid(uid);
            var GoodsPrice = parseFloat(dataOneRow.GoodsQty) * parseFloat(dataOneRow.GoodsPrice.replace(/,/g, ''));
            _t.gridControl.calSummary(false,GoodsPrice);
            GoodDetail.remove();
        },
        countGoodsTransac: function () {
            var tGrid = _t.Element.find("#transac-body #GoodDetail");
            return tGrid.length;
        },
        selectDataGrid: function (){
            return arr_Data;
        },
        updateGoodsByIndex: function (uid,GoodsPrice,GoodsBarcode) {
            var Goods = _t.gridControl.selectDataGrid();
            if (Goods.length != 0) {
                var index = Goods.findIndex((x => x.uid == uid));
                if (index != null) {
                    var Old_qty = Goods[index].GoodsQty;
                    Goods[index].GoodsQty = parseFloat(Old_qty) + parseFloat(GoodsBarcode);
                    var ThisGoodsPrice = GoodsPrice * GoodsBarcode; //Goods Price This Goods!!
                    Goods[index].GoodsPrice = parseFloat(ThisGoodsPrice) + parseFloat(Goods[index].GoodsPrice); //Last GoodsPrice Atfer Update

                    _t.Element.find("#transac-body #GoodDetail[data-uid='" + uid +  "']").children().eq(1).html("<span class='w_100 h_0 text-center' name='GoodsQty'>"  + Goods[index].GoodsQty + "</span>");
                    _t.Element.find("#transac-body #GoodDetail[data-uid='" + uid +  "']").children().eq(3).html("<span id='GoodsPrice'>" + numberWithCommas(Goods[index].GoodsPrice.toFixed(2)) + "</span>");
                    _t.gridControl.calSummary(true,ThisGoodsPrice);
                }
            }
        }
    };
};