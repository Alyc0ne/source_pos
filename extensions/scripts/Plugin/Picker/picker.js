$(function () {
    $(".picker-wrapper").each(function (e) {
        try {
            var t = $(this);
            var pickername = t.data("pickername");
            var modalname = t.data("modal");
            if (pickername != null && pickername != undefined) {
                if (window["picker" + pickername] != undefined) {
                    window["picker" + pickername] = undefined;
                    window["picker" + pickername] = new setPickerController($(this));
                }
            }
        } catch (e) {

        }
    });
    $(".picker-no").change(function () {
        $(this).blur();
    });
})
function setPickerController(Obj) {
    var t = this;
    var isTab = false;
    var isCount = false;
    var gridTabSelected = "";
    t.tempData = null;
    t.picker = "";
    t.pickerName = "";
    t.modalname = "";
    t.gridname = "";
    t.dataInfo = null;
    t.dataInfoRow = null;
    t.dataRelate = null;
    t.callBackFunction = "";

    init = function () { 
        if (Obj != null && Obj != undefined) {
            t.picker = Obj;
            t.pickerName = Obj.data("pickername");
            t.modalname = Obj.data("modalname");
            t.gridname = Obj.data("gridname");
            t.callBackFunction = Obj.data("callback");
            isTab = convert.toBoolean(Obj.data("pickertab"));
            isCount = convert.toBoolean(Obj.data("pickercount"));
            gridTabSelected = Obj.data("gridselected");
            $("#" + t.modalname).data("picker", "picker" + t.picker);
            $(document).off("click", "#" + Obj.attr("id") + " .input-img-search");
            $(document).on("click", "#" + Obj.attr("id") + " .input-img-search", function (e) { 
                if ($("#" + t.modalname).find(".searchgrid").length > 0) {
                    $("#" + t.modalname).find(".searchgrid").val("");
                }

                if (t.picker.data("openmanual")) {
                    return false;
                }
                var isGrid = $(this).closest(".picker-wrapper").parent("td");
         
                if (checkPageType() != "detail" && !t.picker.hasClass("disabled")) {
                    var reset = isGrid.length > 0 ? true : false;
                    t.refreshGrid(reset, $(this).closest(".picker-wrapper"));
                    t.getPickerSelectData();
                }
            })
            $(document).off("click", "#" + t.modalname + " .btn-select-picker");
            $(document).on("click", "#" + t.modalname + " .btn-select-picker", function () {
                t.setPickerByGridSelect();
                $(".grid-filter-backdrop").remove();
            })
            $(document).on("keypress", "#" + Obj.attr("id") + " .picker-no", function (e) { 
                if (e.keyCode == 13) {
                    return false;
                }
            })

            $(document).on("click", ".modal .btn-close-modal", function () {
                $(this).closest(".modal").modal("hide");
                $(".grid-filter-backdrop").remove();
            })

            
            t.getPickerSelectData();
            t.getPickerRelateData();
            t.autoComplete(t.picker);
        }
    }
    t.autoComplete = function (picker) {

        var pickerAutoComplete = null;
        if (!$(picker).hasClass("picker-auto-complete"))
            pickerAutoComplete = $(picker).find(".picker-auto-complete").find(".picker-no");
        else
            pickerAutoComplete = $(picker).find(".picker-no");

        if(pickerAutoComplete != null && pickerAutoComplete.length > 0)
        {
            $(pickerAutoComplete).autocomplete({
                source: t.autoCompleteBride,
                minLength: 3,
                delay:100,
                select: function (event, ui) { 
                    t.autoCompleteSelect(ui.item);
                }
            }).change(function (e) {
                e.preventDefault();
                if ($(this).val().length < 3) {
                    $(this).val("");
                    t.clearData();
                } else {
                    var _pk = $(this).parent().find(".picker-pk").val();
                    var _no = $(this).parent().find(".picker-pk").data("doc-no"); 
                    var _current_no = t.picker.find(".picker-no").val();
                    if (_pk == "") {
                        t.clearData();
                    } else if (_no != _current_no) {
                        t.clearData();
                    } 
                }
            });
        }
    };
    t.autoCompleteSelect = function (item) {
        var id = item.id; 
        $("#" + t.modalname).find(".grid-check-item[value='" + id + "']").click();
        $("#" + t.modalname).find(".btn-select-picker").click();
    };
    t.autoCompleteConverter = function (data) {
        var picker = t.picker;
        var pickerAuto = $(picker).find(".picker-no");
        var pickerPK = $(picker).find(".picker-pk");
        var pickerText = $(picker).find(".picker-text");
        var gridName = t.gridname;
        var fieldName = $(pickerAuto).data("name"); 
        var fieldID = $(pickerPK).data("name");
        var fieldText = $(pickerText).data("name");
        var fnComplete = window[gridName].eventFactory.eventHook.OnPickerAutoCompleteResponse;
        if (fnComplete != null && typeof fnComplete == "function")
        { 
            if (data != null && data.length > 0)
            { 
                var rows = [];
                for(var i = 0; i < data.length; i++)
                {
                    var rowNo = String(data[i][fieldName]).toLowerCase();
                    var txtNo = String(pickerAuto.val()).toLowerCase(); 
                    if (rowNo.search(txtNo) > -1) {
                        rows.push({
                            id: data[i][fieldID],
                            label: data[i][fieldName],
                            value: data[i][fieldName]
                        });
                    }
                } 
                if (rows.length > 0) {
                    fnComplete(rows);
                } else {
                    t.clearData();
                }
            } else {
                t.clearData();
            }
        }
        window[gridName].eventFactory.eventHook.OnPickerAutoCompleteResponse = null;
        window[gridName].eventFactory.eventHook.OnPickerAutoComplete = null;
    };
    t.autoCompleteBride = function (request, response) {  
        var picker = t.picker;
        var pickerAuto = !$(picker).hasClass("picker-auto-complete") ? $(picker).find(".picker-auto-complete").find(".picker-no") : $(picker).find(".picker-no");
        var gridName = t.gridname;
        var termSearch = request.term;
        var fieldName = $(pickerAuto).data("name");

        $("#" + t.modalname).find(".searchgrid").val(termSearch);
        window[gridName].eventFactory.eventHook.OnPickerAutoCompleteResponse = response;
        window[gridName].eventFactory.eventHook.OnPickerAutoComplete = t.autoCompleteConverter;
        window[gridName].gridInfo.gridDatasource.pageSize(5);
    };
    t.getPickerSelectData = function () {
        t.dataInfo = {
            no: t.picker.find(".picker-no").val(),
            pk: t.picker.find(".picker-pk").val(),
            text: t.picker.find(".picker-text").val(),
            gridselected: t.picker.find(".picker-grid-selected").val()
        };
        t.picker.find(".picker-pk").data("doc-no", t.dataInfo.no);
    }
    t.getPickerRelateData = function () { 
        var relate = t.picker.find(".picker-relate");
        if (relate.length > 0) {
            t.dataRelate = new Array();
            for (var i = 0; i < relate.length; i++) {
                var dataName = $(relate[i]).data("name");
                var relatecode = $(relate[i]).data("relateother");
                t.dataRelate.push({
                    name: dataName,
                    value: $(relate[i]).val(),
                    code: relatecode
                })
            }
            t.setPickerRealteByOnload();
        } 
    }
    t.setPickerByGridSelect = function () {
        t.dataInfo = null;
        t.dataRelate = null;
        t.dataInfoRow = null;

        var dataNo = t.picker.find(".picker-no").data("name");
        var dataPK = t.picker.find(".picker-pk").data("name");
        var dataText = t.picker.find(".picker-text").data("name");
        var dataSelected = null;
        var gridselected = "";
         
        if (isCount) {
            dataSelected = window[gridTabSelected].dataFactory.getItem();
            gridselected = t.gridname;
        } else {
            if (!isTab) { 
                dataSelected = window[t.gridname].dataFactory.getItemSelect();
                gridselected = t.gridname;
            } else {
                var gridname = $("#" + t.modalname).find(".grid-check-item:checked").closest(".k-grid").attr("id");
                dataSelected = window[gridname].dataFactory.getItemSelect();
                t.picker.find(".picker-grid-selected").val(gridname);
                gridselected = gridname;
            }
        } 

        if (dataSelected.length > 0) { 
            t.dataInfoRow = dataSelected[0];
            t.dataInfo = {
                no: dataSelected[0][dataNo],
                pk: dataSelected[0][dataPK],
                text: dataSelected[0][dataText],
                gridselected: gridselected
            };

            var relate = t.picker.find(".picker-relate");
            if (relate.length > 0) {
                t.dataRelate = new Array();
                for (var i = 0; i < relate.length; i++) {
                    var dataName = $(relate[i]).data("name");
                    var relatecode = $(relate[i]).data("relateother");
                    t.dataRelate.push({
                        name: dataName,
                        value: dataSelected[0][dataName],
                        code: relatecode
                    })
                }
            }
        } else { 
            t.picker.find(".picker-no").val("");
            t.picker.find(".picker-pk").val("").data("doc-no", null);;
            t.picker.find(".picker-text").val("");
            t.picker.find(".picker-relate").val(""); 
        }

        if (t.dataInfo != null) {
            if (!isCount) { 
                t.picker.find(".picker-no").val(t.dataInfo.no);
                t.picker.find(".picker-pk").val(t.dataInfo.pk).data("doc-no", t.dataInfo.no);
                t.picker.find(".picker-text").val(t.dataInfo.text);

                if (t.dataRelate != null && t.dataRelate.length > 0) {
                    for (var i = 0; i < t.dataRelate.length; i++) {
                        var relateObj = t.picker.find(".picker-relate[data-name=" + t.dataRelate[i].name + "]");
                        if (relateObj != null && relateObj.length > 0) {
                            relateObj.val(t.dataRelate[i].value)
                        } 
                        var relateTo = $("body").find("input[data-relateto=" + t.dataRelate[i].code + "]");
                        if (relateTo != null && relateTo.length > 0) {
                            relateTo.each(function () {
                                $(this).val(t.dataRelate[i].value);
                            })
                        }
                    }
                }
            } else {
                var count = dataSelected.length;
                var countName = Obj.data("gridcountname");
                t.picker.find(".picker-no").val(count + " " + countName);
                t.picker.data("row-selected", dataSelected);
            }
        } else {
            t.picker.find(".picker-no").val("");
            t.picker.find(".picker-pk").val("").data("doc-no", null);;
            t.picker.find(".picker-text").val("");
            t.picker.find(".picker-relate").val("");

            if (isCount) { 
                t.picker.data("row-selected", new Array());
            }
        }

        if (!!t.picker.parents(".k-grid") && t.picker.parents(".k-grid").length > 0)
        {
            var gridName = t.picker.parents(".k-grid").attr("id");
            if (window[gridName].eventFactory.eventHook.OnSelectPicker != null) {
                window[gridName].eventFactory.eventHook.OnSelectPicker(t.picker.attr("id"), dataSelected);
            }
        }
        var _noHtmlID = t.picker.find(".picker-no").attr("id");
        if (!!t.dataInfoRow) {
            HighlightErrorForm("#" + _noHtmlID, false, "required field");
        } else {
            HighlightErrorForm("#" + _noHtmlID, false, "required field");
        }


        $("#" + t.modalname).modal("hide");
        if (!!t.callBackFunction) { 
            window[t.callBackFunction](t.dataInfoRow);
        }
    }
    t.setPickerRealteByOnload = function () {
        if(t.dataRelate != null)
        {
            for (var i = 0; i < t.dataRelate.length; i++) { 
                var relateTo = $("input[data-relateto=" + t.dataRelate[i].code + "]");
                if (relateTo.length > 0) {
                    relateTo.each(function() {
                        $(this).val(t.dataRelate[i].value);
                    })
                }
            }
        }
    }
    t.setPickerHrefDetail = function (url, pickername, id) { 
        if (!!url) {
            var str = "";
            var pickerpk = t.picker.find(".picker-pk").val();
            var linkURL = GetUrl(url + pickerpk);
            var inputText = $("#" + pickername).find("#" + id).prop('outerHTML');
            str += "<a class='picker-link' href=" + linkURL + " target='_blank'>" + inputText + "</a>" 
            //t.picker.find(".picker-text").remove(); 
            t.picker.find(".picker-text").parent().html(str);
        }
    }
    t.refreshGrid = function (reset,obj) {
        if (reset && !!obj) { 
            try { 
                var pickername = obj.data("pickername");
                var modalname = obj.data("modal");
                if (pickername != null && pickername != undefined && window["picker" + pickername].constructor == HTMLDivElement) {
                    window["picker" + pickername] = new setPickerController(obj);
                    window["picker" + pickername].refreshGrid();
                }
                else
                {
                    window["picker" + pickername].picker = obj;
                    window["picker" + pickername].refreshGrid();
                }
            } catch (e) {

            } 
        } else {
            $("#" + t.modalname).modal("show");
            if (!isTab) {
                window[t.gridname].eventFactory.eventHook.OnDataBound = t.setGridSelectedByPickerData;
                var size = window[t.gridname].gridInfo.gridDefaultPageSize;
                window[t.gridname].gridInfo.gridDatasource.pageSize(size);
            } else {
                $("#" + t.modalname).find(".k-grid[id="+gridTabSelected+"]").each(function () { 
                    window[$(this).attr("id")].eventFactory.eventHook.OnDataBound = t.setGridSelectedByPickerData($(this).attr("id")); 
                });

                $("#" + t.modalname).find(".k-grid").each(function () { 
                    if ($(this).attr("id") != gridTabSelected)
                    {
                        var size = window[$(this).attr("id")].gridInfo.gridDefaultPageSize;
                        window[$(this).attr("id")].eventFactory.eventHook.OnDataBound = t.setGridSelectedByPickerData;
                        window[$(this).attr("id")].gridInfo.gridDatasource.pageSize(size);
                    } 
                }); 
            }
        }
    }
    t.setGridSelectedByPickerData = function (gridNamePass) { 
        if (!isCount) {
            if (t.dataInfo != null) {
                t.dataInfo.gridselected = !!t.dataInfo.gridselected ? t.dataInfo.gridselected : t.gridname;
                window[t.dataInfo.gridselected].checkboxFactory.selectRowByID(t.dataInfo.pk);
            }
        } else {
            if (!!gridNamePass) { 
                if (gridNamePass.indexOf(gridTabSelected) > -1) {
                    var arr_alldata = new Array();
                    var alldata = $("#picker" + t.pickerName).data("row-selected");
                    if (!!alldata) { 
                        for (var i = 0; i < alldata.length; i++) {
                            arr_alldata.push(alldata[i]);
                        }
                    } 
                    window[gridTabSelected].dataFactory.removeItemAll(); 
                    if (!!arr_alldata) {
                        for (var i = 0; i < arr_alldata.length; i++) {
                            window[gridTabSelected].dataFactory.addItem(arr_alldata[i]);
                        }
                        $("#" + gridTabSelected).find("#grid-check-all").prop("checked", true);
                        window[gridTabSelected].checkboxFactory.checkAll($("#" + gridTabSelected).find("#grid-check-all"));
                    } else {
                        $("#" + gridTabSelected).find("#grid-check-all").prop("checked", false);
                        $("#" + t.modalname).find(".nav-tabs li:first").click();
                        $("#" + t.modalname).find(".k-grid").each(function () {
                            if ($(this).attr("id") != gridTabSelected) {
                                window[$(this).attr("id")].dataFactory.clearItemSelected();
                            }
                        });
                    }
                }
            }
        }
    }
    t.clearData = function (notClearTxt) {
        notClearTxt = notClearTxt == undefined ? true : notClearTxt;
        t.picker.find(".picker-pk").val("").data("doc-no", null);;
        t.picker.find(".picker-text").val("");
        if (notClearTxt) {
            t.picker.find(".picker-no").val("");
        }
        t.picker.find(".picker-relate").val("");

        t.dataInfo = null;
        t.dataRelate = null;
        t.dataInfoRow = null;

        if (!!t.picker.parents(".k-grid") && t.picker.parents(".k-grid").length > 0) {
            var gridName = t.picker.parents(".k-grid").attr("id");
            if (window[gridName].eventFactory.eventHook.OnSelectPicker != null) {
                window[gridName].eventFactory.eventHook.OnSelectPicker(t.picker.attr("id"), null);
            }
        }
        if (!!t.callBackFunction) {
            window[t.callBackFunction](t.dataInfoRow);
        }

    }
    t.setDisabled = function(dis) {
        if (dis) {
            t.picker.find(".picker-no").attr("disabled", true);
            t.picker.addClass("disabled")
        } else {
            if (!dis) {
                t.picker.removeClass("disabled")
                t.picker.find(".picker-no").attr("disabled", false);
            }
        }
    }
    init();
}


function addRowToSelected(e, g, gFrom, ischeck) { 
    if (!!e && !!g) { 
        var pk = g.gridInfo.gridDatasource.options.schema.model.id;
        var allItem = g.dataFactory.getItem();

        var findID = $.grep(allItem, function (element, index) {
            return element[pk] == e[pk];
        });

        if (ischeck) {
            if (findID.length == 0) {
                e["gridName"] = gFrom.gridInfo.gridName;
                g.dataFactory.addItem(e); 
            }
        } else { 
            if (findID.length > 0) { 
                g.dataFactory.removeItem(findID[0]);
            }
        }

        $("#" + g.gridInfo.gridName).find("#grid-check-all").prop("checked", true)
        g.checkboxFactory.checkAll($("#" + g.gridInfo.gridName).find("#grid-check-all"));
        allItem = g.dataFactory.getItem();
        if (allItem.length == 0) {
            $("#" + g.gridInfo.gridName).find("#grid-check-all").prop("checked", false)
        }
    } 
}
function removeRowSelected(e, g) {
    if (window[e["gridName"]]) {
        var allItem = window[e["gridName"]].dataFactory.getItem();
        var pk = g.gridInfo.gridDatasource.options.schema.model.id;
        var pkObj = window[e["gridName"]].gridInfo.gridDatasource.options.schema.model.id;
        var findID = $.grep(allItem, function (element, index) {
            return element[pkObj] == e[pk];
        });
        if (findID.length > 0) {
            $("#" + window[e["gridName"]].gridInfo.gridName).find("tr[data-uid=" + findID[0]["uid"] + "]").find(".grid-check-item").prop("checked", false);
            $("#" + window[e["gridName"]].gridInfo.gridName).find("tr[data-uid=" + findID[0]["uid"] + "]").removeClass("k-state-selected");
        }
    }
    g.dataFactory.removeItem(e); 
    $("#" + g.gridInfo.gridName).find("#grid-check-all").prop("checked", true)
    g.checkboxFactory.checkAll($("#" + g.gridInfo.gridName).find("#grid-check-all"));
    allItem = g.dataFactory.getItem();
    if (allItem.length == 0) {
        $("#" + g.gridInfo.gridName).find("#grid-check-all").prop("checked", false)
    }
} 