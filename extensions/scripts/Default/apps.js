var navLink_Click = "";
var path_link = "";

function GetPath() {
    var pathArray = window.location.pathname.split('/');
    return pathArray;
}

$(document).on("keypress", "._number", function(e) {
    // data length validate
    // Length | Num | Decimal | Comma | Dot
    //   14   |  9  |    2    |   2   | 1
    //   22   |  15 |    2    |   4   | 1

    var t = $(this);
    var value = t.val();
    if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46) {
        return true;
    } else {
        if ($(this).hasClass("_numzero") && e.keyCode == 45) {
            return true;
        } else {
            return false;
        }
    }
    if ((e.shiftKey || (e.keyCode < 46 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 110) {
        return false;
        e.preventDefault();
    }
});

$(document).on("click", ".nav-link", function () {
    openloading(true);
    var ID = this.getAttribute('aria-controls');
    setTimeout(function(){ 
        $("#right-page #v-pills-tabContent").find("div.active").removeClass("show active");
        $("#right-page #v-pills-tabContent").find("div#" + ID).addClass("show active");
        openloading(false);
    }, 1000);         
});

$(document).on("blur", "._number", function(e) {
    var t = $(this);
    var value = t.val();
    if (value != "") {
        var nDecimal = parseFloat(value).toFixed(2);
        var form_id = this.id;
        $('#' + form_id).val(nDecimal);
    }
});

function openloading(isLoad) {
    if (isLoad != null && isLoad != undefined) {
        var html = "";
        html += "<div class=\"overray-loading\">";
        html += "   <div class=\"bg-backdrop\"></div>";
        html += "   <div class=\"loading-wrapper\">";
        //html += "      <div class=\"load-dots\"></div>";
        html += "      <div class=\"load-icon\"></div>";
        html += "   </div>";
        html += "</div>";

        if (isLoad) {
            $("html").find(".overray-loading").remove();
            $("html").find(".loading-wrapper").remove();
            $("body").append(html);
        } else {
            $("html").find(".overray-loading").remove();
        }
    }
}

function bindValidate(frm) {
    var IsResult = true;
    if ($(frm).length > 0) {
        $(frm).find("div.error").remove();
        $(frm).find("input.border_red").removeClass("border_red");
        var tab = [];
        var frmControl = $(frm + " .require").parent();
        $.each(frmControl, function(i, e) {
            var valResult = true;
            var el = $(e).find("input[type=text],input[type=password], select, textarea");
            if (($(frm).closest(".modal").length == 0 && el.closest(".modal").length == 0) || $(frm).closest(".modal").length > 0) { //check is form = modal

                if (el.length > 0) {
                    el.each(function() {
                        if (!!$(this).attr("name") && $(this).attr("name") != "TitleNameEnumID") {
                            var dis = $(this).prop('disabled');
                            var visible = $(this).is(":visible");
                            if (!dis) {
                                if (visible) {
                                    var textsVal = $(this).val();
                                    if (!textsVal) {
                                        valResult = false;
                                    }
                                }
                            }
                            if (visible) {
                                var textsVal = $(this).val();
                                if (!dis) {
                                    if (!textsVal) {
                                        valResult = false;
                                    }
                                }
                            } else {
                                var textsVal = $(this).val();
                                if (!dis) {
                                    if (!textsVal) {
                                        valResult = false;
                                    }
                                }
                            }
                        }
                    });
                }
                if (!valResult) {
                    $(this).find("input[type=text],input[type=password], select, textarea").eq(0).addClass("border_red");
                    $(this).find("input[type=text],input[type=password], select, textarea").eq(0).parent().find("div.error").remove();
                    $(this).find("input[type=text],input[type=password], select:not('#TitleNameEnumID'), textarea").eq(0).parent().append("<div class='error'><label class='error'>กรุณากรอกข้อมูล</label></div>");
                }
            }
        });

        var checkError = $(frm).find("div.error").length;
        if (checkError > 0) {
            var IsResult = false;
        }
    }
    return IsResult;

}
/*---------------Messenger Alert----------------*/
Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'air'
}

function HideMsg() {
    Messenger().hideAll();
}

function PostMsgSuccess(msg) {
    Messenger().hideAll();
    Messenger().post({
        //     id: 'success-post-msg',
        message: msg,
        //     type: 'success',
        hideAfter: 2,
        //     hideOnNavigate: true
    });
}

function GenRunningNumber(system) {
    var Running = "";
    $.ajax({
        type: 'POST',
        url: base_url + "Base/BaseController/GenRunningNumber",
        data: { "System": system },
        datatype: "json",
        traditional: true,
        async: false,
        success: function(e) {
            Running = e;
        },
        error: function(e) {
            //openloading(false);
        }
    });
    return Running;
}

function GetDataJson(system, idSelect2 = null) {
    var Result = "";
    $.ajax({
        type: 'POST',
        url: base_url + "Base/BaseController/GetDataJson",
        data: { "System": system },
        dataType: "json",
        traditional: true,
        async: false,
        success: function(e) {
            //Result = JSON.parse(e);
            if (idSelect2 != null) { SetDataSelect2(e, idSelect2) }
        },
        error: function(e) {
            //openloading(false);
        }
    });
    return Result;
}

function SetDataSelect2(arr, name) {
    var data = [];
    var item = {};
    for (var i = 0; i < arr.length; i++) {
        item = {
            id: arr[i].UnitID,
            text: arr[i].UnitName
        };
        data.push(item);
    }

    var ID = $(name);
    ID.select2({
        data: data
    })
}

function checkDataTable(system) {
    var result = false;
    $.ajax({
        type: 'POST',
        url: base_url + "Base/BaseController/checkDataTable",
        data: {
            "System": system
        },
        datatype: "json",
        traditional: true,
        async: false,
        success: function(e) {
            var txtAlert = "";
            if (e > 0) {
                result = true;
            } else {
                switch (system) {
                    case "Unit":
                        txtAlert = "<img src='" + base_url + "extensions/images/icon/trolley.png'><h3 class='text-center text-red'>กรุณากำหนดหน่วยนับสินค้าก่อน!</h3>";
                    break;
                    default:
                        break;
                }
                AlertModal(txtAlert);
                openloading(false);
            }
        },
        error: function(e) {
            openloading(false);
        }
    });
    return result;
}

function getFirstPath() {
    var first = $(location).attr('pathname');

    first.indexOf(1);

    first.toLowerCase();

    first = first.split("/")[1];

    return first;
}

function clearModal(name) {
    var ID = $(name);
    ID.on('hidden.bs.modal', function(e) {
        $(this)
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    })
}

function PathLink(system) {
    var url = "";
    switch (system) {
        case "Goods":
            url = "Goods/GoodsController/index";
            break;
    }
    $.ajax({
        type: 'POST',
        url: base_url + url,
        data: {
            "System": system
        },
        datatype: "json",
        traditional: true,
        async: false,
        success: function(e) {
            console.log("KIKI");
        },
        error: function(e) {

        }
    })
}

function RandomMath() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function AlertModal(AlertIcon,AlertText) {
    $("#AlertModal").modal();
    $("#Alert-body-img").html(AlertIcon);
    $("#Alert-body").html(AlertText);
}

function callImages(type) {
    switch (type) {
        case cart: base_url + "";
            
            break;
    
        default:
            break;
    }
}

function CheckPage() {
    return $("#PageSystem").val();
}