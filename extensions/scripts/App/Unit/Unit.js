//Unit
function ShowModalUnit() {
    //openloading(true);
    $("#GoodsModal").html();
    $.ajax({
        type: 'POST',
        url: base_url + "Base/BaseController/GenRunningNumber",
        data: {"System" : "Unit"},
        datatype: "json",
        traditional: true,
        success: function (e) {
            //openloading(false);
            $("#UnitNo").val(e);
            $("#UnitModal").modal();
            setTimeout(function(){
                $("#UnitName").focus();
            },700);
        },
        error: function (e) {
            //openloading(false);
        }
    });
}


$(document).on("click", "#btn-SaveUnit", function () {
    if (bindValidate("#frmUnit")){
        openloading(true);
        $.ajax({
            type: 'POST',
            url: base_url + "Unit/UnitController/BindSave",
            data: {
                "UnitNo" : $("#UnitNo").val(),
                "UnitName" : $("#UnitName").val(),
                "UnitQty" : $("#UnitQty").val()
            },
            datatype: "json",
            traditional: true,
            success: function (e) {
                openloading(false);
                //PostMsgSuccess(" บันทึกข้อมูลสำเร็จ");
                $("#UnitModal").modal('toggle');
                clearModal("#UnitModal");
            },
            error: function (e) {
                //openloading(false);
            }
        });
    }
});