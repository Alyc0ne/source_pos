function gridApplication(name, fieldno, systemname, selected, form, firstload, validation, dupplicate)
{
    var t = this; 
    var itemselected = new Array();

    t.gridInfo = {
        gridID: null,
        gridName: "",
        gridSelected: "",
        gridFieldNo: "",
        gridSystemName: "",
        gridDatasource: null,
        gridKendoGrid: null,
        gridProp: null,
        gridValidate: null,
        gridInlineMode: "",
        gridCurrentUsage: null,
        gridDatasourceOrigin: [],
        gridDataTemp: null,
        gridDatasourceCopy: null,
        gridSaveDirectCommand: false,
        gridDefaultPageSize: 0,

    };
    t.dataInfo = { 
        dataDeleteRow: [],
        dataDeleteID: [],
        setDataDeleteRow: function (item) {
            if (!!item) {
                t.dataInfo.dataDeleteRow.push(item);
            }
        },
        setDataDeleteID: function (item) {
            if (!!item) {
                t.dataInfo.dataDeleteID.push(item);
            }
        },
    }
    t.inlineFactory = {
        inlineType: {
            0: "textbox",
            1: "numberbox",
            2: "dropdown",
            3: "datepicker",
            4: "picker",
            5: "checkbox",
            6: "textarea"
        },
        inlineFormElement: {},
        btnManager: {
            btnSave: function () {
                var btn = t.inlineFactory.inlineFormElement["btnSave"];
                !!btn ? btn.click() : false;
            },
            btnCancel: function () {
                var btn = t.inlineFactory.inlineFormElement["btnCancel"];
                !!btn ? btn.click() : false;
            },
            btnSaveRow: function () {
                t.gridInfo.gridSaveDirectCommand = true;
                t.gridInfo.gridID.find(".k-grid-update").click();
            }
        },
        openEditInline: function (button) {
            try
            {
                if(!!button && t.gridInfo.gridInlineMode == "")
                {
                    var isEditButton = $(button).hasClass("k-grid-edit");
                    var isAddButton = $(button).hasClass("k-grid-add");
                    if (isEditButton || isAddButton)
                    {
                        t.gridInfo.gridInlineMode = isEditButton ? "edit" : "insert";
                        t.inlineFactory.prepareInlineForm();
                        t.checkboxFactory.setTitleBtn();
                        var itemCurrent = t.dataFactory.getItemSelect();
                        if(!!itemCurrent && itemCurrent.length > 0)
                        {
                            if (t.gridInfo.gridProp) {

                            }
                            t.gridInfo.gridCurrentUsage = itemCurrent[0].uid;
                            t.inlineFactory.refreshEventPicker();

                            var funcHook = t.eventFactory.eventHook.onOpenInline;
                            if (!!funcHook && typeof funcHook == "function")
                            {
                                var inlineForm = t.gridInfo.gridID.find(".k-grid-edit-row");
                                funcHook(inlineForm);
                            }
                        }
                    }
                }
            }
            catch (err)
            {
                console.log(err);
            }
        },
        closeEditInline: function () {
            try
            {
                t.gridInfo.gridCurrentUsage = null;
                t.gridInfo.gridInlineMode = "";
                t.inlineFactory.inlineFormElement = {};
                t.checkboxFactory.setTitleBtn();
            }
            catch(err)
            {
                console.log(err);
            }
        },
        addInline: function () {
            try
            {
                var grid = t.gridInfo.gridID;
                grid.find(".k-grid-add").click();
                t.checkboxFactory.setTitleBtn();
            }
            catch (err)
            {
                console.log(err);
            }
        },
        editInline: function () {
            try
            {
                var grid = t.gridInfo.gridID;
                var mode = t.gridInfo.gridInlineMode;
                var data = t.dataFactory.getItemSelectUID();
                if (!!data && data.length > 0 && mode == "")
                {
                    var uid = data[0];
                    var row = grid.find("tr[data-uid='" + uid + "']"); 
                    if (!!row)
                    {
                        var buttonManager = row.find("td a.k-grid-edit");
                        var buttonManagerGroup = row.find("td a");
                        if(!!buttonManager)
                        {
                            t.inlineFactory.refreshEventButton();
                            t.checkboxFactory.setTitleBtn();
                            buttonManager.click();
                            buttonManagerGroup.removeClass("hide");
                        }
                    }
                }
            }
            catch(err)
            {
                console.log(err);
            }
        },
        refreshEventPicker: function () {
            var gridName = t.gridInfo.gridName;
            var pickerWrapper = "#" + gridName + " .picker-wrapper";
            $(pickerWrapper).each(function (e) {
                var picker = $(this);
                var pickername = picker.data("pickername");
                var pickerWind = "picker" + pickername;
                if (window[pickername])
                    window[pickerWind].picker = $(this);
                else
                    window[pickerWind] = new setPickerController($(this));
            });
        },
        refreshEventButton: function (event) {
            var gridID = t.gridInfo.gridID;
            var gridName = t.gridInfo.gridName;
            var gridButton = "#" + gridName + " .k-button";
            $(gridButton).on("click", function (event) {
                if (gridID.find(".k-grid-edit-row").length == 0)
                {
                    var button = this;
                    if (!$(button).hasClass("k-grid-delete"))
                    {
                        setTimeout(function () {
                            t.checkboxFactory.checkCurrentRow(button);
                            t.inlineFactory.openEditInline(button);
                        }, 0000);
                    }
                    else {
                        //แก้ปัญหา Item Description Delete จากปุ่ม ลบของแต่ละ Row ไม่ได้ --Fluke
                        if (gridName == 'gridTransacModalDescription') {
                            t.checkboxFactory.checkCurrentRowDel(button);
                        }                        
                    }
                }
                else
                {
                    var checked = gridID.find("input.grid-check-item:checked");
                    var selected = gridID.find(".k-state-selected");

                    gridID.find(".k-grid-content").find(".k-state-selected").removeClass("k-state-selected");
                    if (!!checked && checked.length > 0)
                        checked.parents("tr").addClass("k-state-selected");

                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        },
        prepareInlineForm: function () {
            try
            {
                var gridID = t.gridInfo.gridID;
                var gridProp = t.gridInfo.gridProp;
                var dataCopy = t.gridInfo.gridDatasourceCopy;
                //console.log(dataCopy);
                if (!!gridProp)
                {
                    var propkey = $.map(gridProp, function (n, i) { return i; });
                    for (var i = 0; i < propkey.length; i++)
                    {
                        var propField = propkey[i];
                        var propItem = gridProp[propField];
                        switch(propItem.Type)
                        {
                            case 0:
                                var value = (dataCopy != null) ? dataCopy[propField] : gridID.find("#" + propField).val();
                                value = (!!value && t.gridInfo.gridDatasource.options.schema.model.fields[propField].type == "date") ? convert.toDateFormat(value) : value;
                                var readonly = gridProp[propField].ReadOnly;
                                var placeholder = gridProp[propField].PlaceHolder;
                                var classstyle = gridProp[propField].Class;
                                var classText = !!classstyle ? "class='" + classstyle + "'" : "";

                                var readonlyText = readonly ? "disabled='disabled'" : "";
                                var placeholderText = !!placeholder ? "placeholder='" + placeholder + "'" : "";
                                var html = "<input type='text' id='form-" + propField + "' name='form-" + propField + "' " + readonlyText + " " + placeholderText + " " + classText + " style='width:95%;margin-left:0px;'>";
                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html);
                                gridID.find(idForm).val(value);
                                t.inlineFactory.inlineFormElement[propField] = $(idForm);
                                break;
                            case 1:
                                var decimalPoint = $("#_hid_decimalDegit").val();
                                var value = dataCopy != null ? dataCopy[propField] : gridID.find("#" + propField).val();
                                var readonly = gridProp[propField].ReadOnly;
                                var readonlyText = readonly ? "disabled='disabled'" : "";
                                var placeholderText = !!placeholder ? "placeholder='" + placeholder + "'" : "";
                                var classstyle = gridProp[propField].Class; 
                                decimalPoint = classstyle.indexOf("_stddegit") > -1 ? decimalPoint : 2;
                                    
                                var classText = !!classstyle ? "class='" + classstyle + "'" : "";
                                value = !!value && value != "" ? value.replace(",", "") : "";
                                value = /^\d+/.test(value) ? value : 0;

                                var html = "<input type='text' id='form-" + propField + "' name='form-" + propField + "' " + readonlyText + " " + placeholderText + " " + classText + " style='width:95%;margin-left:0px;' class='_number _comma'>";
                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html);
                                gridID.find(idForm).val(kendo.toString(parseFloat(value), "n" + decimalPoint));
                                t.inlineFactory.inlineFormElement[propField] = $(idForm);
                                break;
                            case 2:
                                var mode = t.gridInfo.gridInlineMode;
                                var options = gridProp[propField].DataDropdown.Option;
                                var dataID = gridProp[propField].DataDropdown.ValueID;
                                var fieldIDUpdate = gridProp[propField].DataDropdown.FieldIDUpdate;
                                var fieldTextUpdate = gridProp[propField].DataDropdown.FieldTextUpdate;
                                var classstyle = gridProp[propField].Class;
                                var classText = !!classstyle ? "class='" + classstyle + "'" : "";
                                var readonly = gridProp[propField].ReadOnly;
                                var readonlyText = readonly ? "disabled='disabled'" : "";

                                var value = dataCopy != null ? dataCopy[propField] : gridID.find("#" + propField).val();
                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;
                                var html = "<select id='form-" + propField + "' name='form-" + propField + "' data-datavalue='" + dataID + "' " + readonlyText + " " + classText + " style='width:90%;margin-left:0px;height:30px'>";

                                if (!!options)
                                {
                                    for (var j = 0; j < options.length; j++)
                                    {
                                        var text = options[j].Text;
                                        var vals = options[j].Value;
                                        var select = "";
                                        var select_txt = "";

                                        if (mode != "edit")
                                        {
                                            select = options[j].Selected;
                                            select_txt = (select ? "selected" : "");
                                        }
                                        else
                                        {
                                            select = (vals.toString() == t.dataFactory.getItemSelect()[0][fieldIDUpdate].toString());
                                            select_txt = (select ? "selected" : "");
                                        }
                                        html += "<option value='" + vals + "' " + select_txt + ">" + text + "</option>";
                                    }
                                }
                                html += "</select>";

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html);
                                t.inlineFactory.inlineFormElement[propField] = $(idForm);
                                break;
                            case 3:
                                var value = dataCopy != null ? dataCopy[propField] : gridID.find("#" + propField).val();
                                var readonly = gridProp[propField].ReadOnly;
                                var placeholderText = !!placeholder ? "placeholder='" + placeholder + "'" : "";
                                var readonlyText = readonly ? "disabled='disabled'" : "";
                                var classstyle = gridProp[propField].Class;
                                var classText = !!classstyle ? "class='" + classstyle + "'" : "";

                                var html = "<div class='frm-btngroup'>";
                                html += "<input type='text' id='form-" + propField + "' name='form-" + propField + "' " + readonlyText + " " + placeholderText + " " + classText + " class='input-datepicker input-datepicker-grid' style='width:100%'>";
                                html += "<i class='input-img-calendar' style='padding-top:2px;'></i>";
                                html += "</div>";

                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html);
                                if (!readonly)
                                {
                                    var lang = $("#_hid_yeartype").val().toLowerCase();
                                    var params = {
                                        format: "dd/mm/yyyy",
                                        clearBtn: true,
                                        autoclose: true,
                                        todayHighlight: true
                                    };
                                    if (lang == "th"){
                                        gridID.find(idForm).val(value != "" ? convert.toDatetimeEngToThai(new Date(value)) : "");
                                        params.language = "th";
                                    }
                                    else {
                                        gridID.find(idForm).val(value != "" ? convert.toDateFormat(new Date(value)) : "");
                                    }
                                    $('.input-datepicker').datepicker(params);
                                }
                                else
                                {
                                    if ($("#_hid_yeartype").val().toLowerCase() == "th")
                                    {
                                        gridID.find(idForm).val(value != "" ? convert.toDatetimeEngToThai(new Date(value)) : "");
                                    }
                                    else 
                                    {
                                        gridID.find(idForm).val(value != "" ? convert.toDateFormat(new Date(value)) : "");
                                    }
                                }
                                t.inlineFactory.inlineFormElement[propField] = $(idForm);
                                break;
                            case 4:
                                var readonly = gridProp[propField].ReadOnly;
                                var readonlyText = readonly ? "disabled='disabled'" : "";

                                var pickerName = gridProp[propField].DataPicker.Name;
                                var pickerGridName = gridProp[propField].DataPicker.GridName;
                                var pickerModalName = gridProp[propField].DataPicker.ModalName;
                                var pickerSuggest = gridProp[propField].DataPicker.PickerSuggest;

                                var fieldNo = gridProp[propField].DataPicker.FieldNo;
                                var fieldID = gridProp[propField].DataPicker.FieldID;
                                var fieldNoUpdate = gridProp[propField].DataPicker.UpdateFieldNo;
                                var fieldIDUpdate = gridProp[propField].DataPicker.UpdateFieldID;
                                var pickerDefaultValue;
                                var pickerDefaultID;

                                if (t.gridInfo.gridInlineMode == "insert")
                                {
                                    if(dataCopy != null)
                                    {
                                        pickerDefaultValue = dataCopy[fieldNoUpdate];
                                        pickerDefaultID = dataCopy[fieldIDUpdate];
                                        pickerDefaultValue = !!pickerDefaultValue ? pickerDefaultValue : "";
                                        pickerDefaultID = !!pickerDefaultID ? pickerDefaultID : "";
                                    }
                                    else
                                    {
                                        pickerDefaultValue = gridProp[propField].DataPicker.DefaultValue;
                                        pickerDefaultID = gridProp[propField].DataPicker.DefaultID;
                                        pickerDefaultValue = !!pickerDefaultValue ? pickerDefaultValue : "";
                                        pickerDefaultID = !!pickerDefaultID ? pickerDefaultID : "";
                                    }
                                }
                                else
                                {
                                    var data = t.dataFactory.getItemSelect()[0];
                                    pickerDefaultValue = data[fieldNoUpdate];
                                    pickerDefaultID = data[fieldIDUpdate];
                                    pickerDefaultValue = !!pickerDefaultValue ? pickerDefaultValue : "";
                                    pickerDefaultID = !!pickerDefaultID ? pickerDefaultID : "";
                                }

                                var html = "<div class=\"frm-group picker-wrapper\" id=\"picker" + pickerName + "\" data-pickername=\"" + pickerName + "\" data-modalname=\"" + pickerModalName + "\" data-gridname=\"" + pickerGridName + "\" style='margin-bottom: 0px;'>";
                                html += "<div class=\"frm-content\">";
                                //console.log(pickerSuggest);
                                if (pickerSuggest)
                                    html += "<div class=\"frm-btngroup picker-auto-complete\">";
                                else
                                    html += "<div class=\"frm-btngroup\">";
                                
                                html += "<input type=\"text\" id=\"txt" + pickerName + fieldNo + "\" name=\"txt" + pickerName + fieldNo + "\" class=\"picker-no\" data-name=\"" + fieldNo + "\" value=\"" + pickerDefaultValue + "\" style='width: 82%'>";
                                html += "<input type=\"hidden\" id=\"qq" + pickerName + fieldID + "\" name=\"qq" + pickerName + fieldID + "\" class=\"picker-pk\" data-name=\"" + fieldID + "\" value=\"" + pickerDefaultID + "\">";

                                if (!!gridProp[propField].DataPicker.FieldOther &&
                                    gridProp[propField].DataPicker.FieldOther.length > 0)
                                {
                                    var fieldHidden = gridProp[propField].DataPicker.FieldOther;
                                    for(var j = 0; j < fieldHidden.length; j++)
                                    {
                                        var fieldItem = fieldHidden[j];
                                        var fieldUsage = fieldItem.Field;
                                        var fieldUpdate = fieldItem.UpdateField;
                                        var fieldData = t.dataFactory.getItemSelect()[0];
                                        html += "<input type=\"hidden\" id=\"qq" + pickerName + fieldUsage + "\" name=\"qq" + pickerName + fieldUsage + "\" class=\"picker-relate\" data-name=\"" + fieldUsage + "\" value=\"" + fieldData[fieldUpdate] + "\">";
                                    }
                                }

                                html += "<i class=\"input-img-search\" style='padding-top:2px;left:85%'></i>";
                                html += "</div>";
                                html += "</div>";
                                html += "</div>";
                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html);
                                t.inlineFactory.inlineFormElement[propField] = gridID.find("#picker" + pickerName);
                                break;
                            case 5:
                                var readonly = gridProp[propField].ReadOnly;
                                var readonlyText = readonly ? "disabled='disabled'" : "";
                                var classstyle = gridProp[propField].Class;
                                var classText = !!classstyle ? "class='" + classstyle + "'" : "";
                                var html = "<input type='checkbox' id='form-" + propField + "' name='form-" + propField + "' " + readonlyText + " " + classText + " style='margin-left:0px;margin-top:0px;'>";
                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;
                                var data = t.dataFactory.getItemSelect()[0];

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html);
                                gridID.find(idForm)[0].checked = dataCopy != null ? dataCopy[propField] : data[propField];
                                t.inlineFactory.inlineFormElement[propField] = gridID.find(idForm);
                                break;
                            case 6:
                                if (window['gridDescription']) {
                                    var dataSelect = window[gridDescription.gridInfo.gridName].dataFactory.getItemSelect();
                                }
                                if (window['gridTransacModalDescription']) {
                                    var dataSelect = window[gridTransacModalDescription.gridInfo.gridName].dataFactory.getItemSelect();
                                } 
                                var value = "";
                                if (dataSelect.length  > 0) {
                                    value = dataSelect[0][propField];
                                } 
                                var readonly = gridProp[propField].ReadOnly;
                                var placeholder = gridProp[propField].PlaceHolder;
                                var classstyle = gridProp[propField].Class;
                                var classText = !!classstyle ? "class='" + classstyle + "'" : "";

                                var readonlyText = readonly ? "disabled='disabled'" : "";
                                var placeholderText = !!placeholder ? "placeholder='" + placeholder + "'" : "";
                                var html = "<textarea class='inline-textarea' id='form-" + propField + "' name='form-" + propField + "' " + readonlyText + " " + placeholderText + " " + classText + " style='width:95%;margin-left:0px;'></textarea>";
                                var idForm = "#form-" + propField;
                                var idInline = "#" + propField;

                                gridID.find(idForm).remove();
                                gridID.find(idInline).attr("style", "display:none;");
                                gridID.find(idInline).after(html); 
                                gridID.find(idForm).val(value); 
                                t.inlineFactory.inlineFormElement[propField] = $(idForm);
                                break;
                            default: break;
                        }
                    }
                    t.inlineFactory.inlineFormElement["btnSave"] = gridID.find(".k-grid-update");
                    t.inlineFactory.inlineFormElement["btnCancel"] = gridID.find(".k-grid-cancel");
                }

                t.gridInfo.gridDatasourceCopy = null;
                if(t.gridInfo.gridDataTemp != null)
                {
                    t.dataFactory.updateRow(t.gridInfo.gridCurrentUsage, t.gridInfo.gridDataTemp);
                    t.gridInfo.gridDataTemp = null;
                }
            }
            catch(err)
            {
                console.log(err);
            }
        },
        getValueInline: function () {
            try
            {
                var model = {};
                var gridID = t.gridInfo.gridID;
                var gridProp = t.gridInfo.gridProp;
                if (!!gridProp)
                {
                    var propkey = $.map(gridProp, function (n, i) { return i; });
                    if(!!propkey && propkey.length > 0)
                    {
                        for (var i = 0; i < propkey.length; i++)
                        {
                            var propType = gridProp[propkey[i]];
                            switch (propType.Type)
                            {
                                case 0:
                                    var news = "#form-" + propkey[i];
                                    var value = gridID.find(news).val();
                                    model[propkey[i]] = value;
                                    break;
                                case 1:
                                    var news = "#form-" + propkey[i];
                                    var value = gridID.find(news).val();
                                    value = !!value ? value.replace(new RegExp(',', 'g'), "") : null;
                                    model[propkey[i]] = !!value ? parseFloat(value) : value;
                                    break;
                                case 2:
                                    var news = "#form-" + propkey[i];
                                    var news_txt = "#form-" + propkey[i] + " option:selected";
                                    var id = gridID.find(news).data("datavalue");
                                    var value = gridID.find(news).val();
                                    var text = gridID.find(news_txt).text();
                                    if (id == propkey[i])
                                    {
                                        model[id] = value;
                                    }
                                    else
                                    {
                                        model[id] = value;
                                        model[propkey[i]] = text;
                                    }
                                    break;
                                case 3:
                                    var news = "#form-" + propkey[i];
                                    var value = gridID.find(news).datepicker("getDate");
                                    model[propkey[i]] = value;
                                    break;
                                case 4:
                                    var pickerName = gridProp[propkey[i]].DataPicker.Name;
                                    var pickerUpdateFieldID = gridProp[propkey[i]].DataPicker.UpdateFieldID;
                                    var pickerUpdateFieldNo = gridProp[propkey[i]].DataPicker.UpdateFieldNo;
                                    var pickerUsageFieldID = gridProp[propkey[i]].DataPicker.FieldID;
                                    var pickerUsageFieldNo = gridProp[propkey[i]].DataPicker.FieldNo;
                                    var txtPicker = "txt" + pickerName + pickerUsageFieldNo;
                                    var idPicker = "qq" + pickerName + pickerUsageFieldID;
                                    model[pickerUpdateFieldID] = gridID.find("#" + idPicker).val();
                                    model[pickerUpdateFieldNo] = gridID.find("#" + txtPicker).val();

                                    if (!!gridProp[propkey[i]].DataPicker.FieldOther &&
                                        gridProp[propkey[i]].DataPicker.FieldOther.length > 0) {
                                        var fieldHidden = gridProp[propkey[i]].DataPicker.FieldOther;
                                        for (var j = 0; j < fieldHidden.length; j++) {
                                            var fieldItem = fieldHidden[j];
                                            var fieldUsage = fieldItem.Field;
                                            var fieldUpdate = fieldItem.UpdateField;
                                            var fieldOther = "qq" + pickerName + fieldUsage;
                                            model[fieldUpdate] = gridID.find("#" + fieldOther).val();
                                        }
                                    }
                                    break;
                                case 5:
                                    var news = "#form-" + propkey[i];
                                    var value = gridID.find(news)[0].checked;
                                    model[propkey[i]] = value;
                                    break;

                                case 6:
                                    var news = "#form-" + propkey[i];
                                    var value = gridID.find(news).val();
                                    model[propkey[i]] = value;
                                    break;
                                default: break;
                            };
                        }
                    }
                }
                return model;
            }
            catch(err)
            {
                console.log(err);
            }
        },
        isOpenInline: function(){
            return t.gridInfo.gridInlineMode != "";
        },
        canCelEditInline: function () {
            var grid = t.gridInfo.gridID;
            var buttonControl = grid.find(".k-cancel");
            buttonControl.click();
        }
    };
    t.noticFactory = {
        errorAlert: function () { PostMsgError(lang.lblCantSave); },
        successAlert: function () { PostMsgSuccess(lang.lblSaveSuccess); },
        errorDelete: function () { PostMsgError(lang.lblCantDelData); },
        successDelete: function () { PostMsgSuccess(lang.lblDelSuccess); }
    },
    t.eventFactory = {
        eventHook: {
            LoadData: null,
            OnChange: null,
            OnEdit: null,
            OnSave: null,
            MsgValidate: null,
            OnSaveChange: null,
            OnRemove: null,
            OnCancel: null,
            OnDataBound: null,
            OnClickRow: null,
            OnClickEdit: null,
            OnClickDelete: null,
            OnCheckAll: null,
            onOpenInline: null,
            OnAfterSave: null,
            OnAfterRemove: null,
            OnSelectPicker: null,
            OnPickerAutoComplete: null,
            OnPickerAutoCompleteResponse: null,
        },
        eventLoadData: function () {
            try
            {
                var _default = {};
                var hook = t.eventFactory.eventHook.LoadData;
                if (!!hook && typeof hook == "function")
                    _default = $.extend(_default, hook(), {}); 
                return _default;
            }
            catch(err)
            {
                console.log(err);
            }
        },
        eventRequestStart: function (event) {
            openloading(true);
        },
        eventRequestEnd: function (event) {
            openloading(false);
            var response = event.response;
            if (event.type == "create" || event.type == "update")
            {
                var data = response.data;
                var result = response.IsResult;
                if (!result) {
                    setTimeout(function ()
                    {
                        t.noticFactory.errorAlert();
                        var gridID = t.gridInfo.gridID;
                        var uid = t.gridInfo.gridCurrentUsage;
                        var item = gridID.find("tr[data-uid='" + uid + "']");
                        if (!!item)
                        {
                            setTimeout(function () {
                                item = gridID.find("tr[data-uid='" + uid + "']");
                                $.each(item.children("td"), function (index, value) {
                                    if ($(value).find("a.k-grid-edit").length > 0)
                                    {
                                        t.gridInfo.gridInlineMode = "";
                                        t.inlineFactory.inlineFormElement = {};
                                        $(value).find("a.k-grid-edit").click();
                                    }
                                });
                            }, 0000);
                        }
                    }, 500);
                }
                else
                {
                    var uid = t.gridInfo.gridCurrentUsage;
                    var item = t.gridInfo.gridID.find("tr[data-uid='" + uid + "']");
                    var updateDataAfterResponse = $.extend(t.gridInfo.gridKendoGrid.dataItem(item), data, {});
                    t.dataFactory.updateRow(uid, updateDataAfterResponse);
                    t.noticFactory.successAlert();
                    t.gridInfo.gridInlineMode = "";
                    t.gridInfo.gridCurrentUsage = null;
                    t.inlineFactory.inlineFormElement = {};
                    t.dataFactory.refreshData();
                }
            }
            else if(event.type == "destroy")
            {
                if(!response.IsResult)
                {
                    t.noticFactory.errorDelete();
                    t.gridInfo.gridDatasource.page(t.gridInfo.gridCurrentUsage);
                    t.gridInfo.gridCurrentUsage = null;
                }
                else
                {
                    t.noticFactory.successAlert();
                    t.dataFactory.refreshData();
                }
            }
            else
            { 
                t.gridInfo.gridInlineMode = "";
                t.inlineFactory.inlineFormElement = {};
                if (t.gridInfo.gridID.find("#grid-check-all").length > 0)
                {
                    t.gridInfo.gridID.find("#grid-check-all")[0].checked = false;
                }
                if (!!event.response && !!event.response.Data)
                {
                    t.gridInfo.gridDatasourceOrigin = event.response.Data;
                    var OnPickerAutoComplete = t.eventFactory.eventHook.OnPickerAutoComplete;
                    if (OnPickerAutoComplete != null && typeof OnPickerAutoComplete == "function")
                    {
                        OnPickerAutoComplete(event.response.Data);
                    }
                }
            }
        },
        eventOnChange: function (event) {
            try
            {
                var objResult;
                var funcHook = t.eventFactory.eventHook.OnChange;
                if (!!funcHook && typeof funcHook == "function")
                {
                    objResult = funcHook(event);
                }
                event = objResult;
            }
            catch (err) {
                console.log("error eventOnEdit");
            }
        },
        eventOnEdit: function (event) {
            try
            {
                var objResult = {};
                var funcHook = t.eventFactory.eventHook.OnEdit;
                if (!!funcHook && typeof funcHook == "function")
                {
                    objResult = funcHook(event.model);
                }
                event.model = objResult;
            }
            catch (err) {
                console.log("error eventOnEdit");
            }
        },
        eventOnSave: function (event) {
            try
            {
                var itemSelected = t.dataFactory.getItemSelect()[0];
                var fieldAll = t.gridInfo.gridDatasource.options.schema.model.fields;
                var fieldList = $.map(fieldAll, function (n, i) { return i; });
                var formOld = {};
                $.each(fieldList, function (index, value) {
                    formOld[value] = itemSelected[value];
                });

                var formData = t.inlineFactory.getValueInline();
                event.model = $.extend(event.model, formData, {});
                t.dataFactory.updateRow(event.model.uid, event.model);

                if (!t.gridInfo.gridSaveDirectCommand) {
                    event._defaultPrevented = !t.eventFactory.eventOnValidate(event.model);
                    event._defaultPrevented = !event._defaultPrevented ? !t.eventFactory.eventOnCheckNo(event.model) : event._defaultPrevented;
                }

                var objResult = { canSave: event._defaultPrevented, model: event.model };
                var funcHook = t.eventFactory.eventHook.OnSave;
                if (!!funcHook && typeof funcHook == "function" &&
                    !event._defaultPrevented &&
                    !t.gridInfo.gridSaveDirectCommand)
                {
                    objResult = funcHook(event.model, !event._defaultPrevented);
                    objResult.canSave = !objResult.canSave;
                    objResult.model = objResult.model;
                }

                objResult.model = t.dataFactory.prepareDataBeforeRequest(objResult.model);
                t.inlineFactory.inlineFormElement = !objResult.canSave ? {} : t.inlineFactory.inlineFormElement;
                t.gridInfo.gridInlineMode = !objResult.canSave ? "" : t.gridInfo.gridInlineMode;

                var funcHook = t.eventFactory.eventHook.OnAfterSave;
                if (!!funcHook && typeof funcHook == "function" && !event._defaultPrevented) {
                    funcHook();
                }

                event.model = objResult.model;
                if (objResult.canSave)
                    event.model = $.extend(event.model, formOld, {});

                if (t.gridInfo.gridDatasource.options.serverAggregates &&
                    t.gridInfo.gridDatasource.options.serverFiltering &&
                    t.gridInfo.gridDatasource.options.serverGrouping &&
                    t.gridInfo.gridDatasource.options.serverPaging &&
                    t.gridInfo.gridDatasource.options.serverSorting)
                    t.gridInfo.gridDataTemp = formOld;
                else
                    if (!objResult.canSave)
                        t.gridInfo.gridCurrentUsage = null;

                event._defaultPrevented = objResult.canSave;
                t.dataFactory.updateRow(event.model.uid, event.model);
                t.gridInfo.gridSaveDirectCommand = false;
            }
            catch(err)
            {
                console.log(err);
            }
        },
        eventOnValidate: function (model) {
            try
            {
                var status = true;
                var validate = t.gridInfo.gridValidate;
                if (!!validate)
                {
                    var validateKey = $.map(validate, function (n, i) { return i; });
                    var funcHook = t.eventFactory.eventHook.MsgValidate;

                    if (!!funcHook && validateKey.length > 0)
                    {
                        for (var i = 0; i < validateKey.length; i++)
                        {
                            var value = model[validateKey[i]];
                            var valdt = validate[validateKey[i]];
                            var isRequired = valdt.isRequired;
                            var maxLength = valdt.maxLength;
                            var minLength = valdt.minLength;
                            var numberMax = valdt.numberMax;
                            var numberMin = valdt.numberMin;
                            var valCustom = (!!funcHook && !!funcHook[validateKey[i]] && !!funcHook[validateKey[i]].customValidate) ? funcHook[validateKey[i]].customValidate : null;

                            if (!!isRequired && isRequired && (value == null || value.toString() == ""))
                            {
                                var textError = (!!funcHook && !!funcHook[validateKey[i]] && !!funcHook[validateKey[i]].isRequired) ? funcHook[validateKey[i]].isRequired : "";
                                bootboxAlert({ title: lang.lblUnableToDone, message: textError });
                                i = validateKey.length;
                                status = false;
                            }
                            else if (!!maxLength && parseInt(maxLength) > 0 && (value.length > parseInt(maxLength)))
                            {
                                status = false;
                                var textError = (!!funcHook && !!funcHook[validateKey[i]] && !!funcHook[validateKey[i]].maxLength) ? funcHook[validateKey[i]].maxLength : "";
                                bootboxAlert({ title: lang.lblUnableToDone, message: textError });
                                i = validateKey.length;
                                status = false;
                            }
                            else if (!!minLength && parseInt(minLength) > 0 && (value.length < parseInt(minLength)))
                            {
                                status = false;
                                var textError = (!!funcHook && !!funcHook[validateKey[i]] && !!funcHook[validateKey[i]].minLength) ? funcHook[validateKey[i]].minLength : "";
                                bootboxAlert({ title: lang.lblUnableToDone, message: textError });
                                i = validateKey.length;
                                status = false;
                            }
                            else if (!!numberMax && parseFloat(numberMax) > 0 && (parseFloat(value) > parseFloat(numberMax))) {
                                status = false;
                                var textError = (!!funcHook && !!funcHook[validateKey[i]] && !!funcHook[validateKey[i]].numberMax) ? funcHook[validateKey[i]].numberMax : "";
                                bootboxAlert({ title: lang.lblUnableToDone, message: textError });
                                i = validateKey.length;
                                status = false;
                            }
                            else if (!!numberMin && parseFloat(numberMin) > 0 && (parseFloat(value) < parseFloat(numberMin))) {
                                status = false;
                                var textError = (!!funcHook && !!funcHook[validateKey[i]] && !!funcHook[validateKey[i]].numberMin) ? funcHook[validateKey[i]].numberMin : "";
                                bootboxAlert({ title: lang.lblUnableToDone, message: textError });
                                i = validateKey.length;
                                status = false;
                            }
                            else if (!!valCustom && typeof valCustom == "function"){
                                status = valCustom(model);
                                if(!status)
                                    i = validateKey.length;
                            }
                        }
                    }
                }
                return status;
            }
            catch(err)
            {
                console.log(err);
            }
        },
        eventOnCheckNo: function (model) {
            try
            {
                var result = true;
                var modelID = t.gridInfo.gridDatasource.options.schema.model.id;
                var modelNo = t.gridInfo.gridFieldNo;
                var serverOperation = t.gridInfo.gridDatasource.options.serverAggregates &&
                                      t.gridInfo.gridDatasource.options.serverFiltering &&
                                      t.gridInfo.gridDatasource.options.serverGrouping &&
                                      t.gridInfo.gridDatasource.options.serverPaging &&
                                      t.gridInfo.gridDatasource.options.serverSorting;

                if (!!modelID && !!modelNo)
                {
                    var dataID = model[modelID];
                    var dataNo = model[modelNo];
                    if (serverOperation && !!t.gridInfo.gridSystemName)
                    {
                        var systemName = t.gridInfo.gridSystemName;
                        var data = {
                            system: systemName,
                            id: dataID,
                            value: dataNo
                        };
                        openloading(true);
                        $.ajax({
                            url: GetUrl('Api/checkDuplicateRunning'),
                            data: data,
                            type: 'post',
                            datatype: "json",
                            async: false,
                            success: function (e) {
                                openloading(false);
                                result = e.result;
                                if (!e.result) {
                                    bootboxAlert({
                                        title: lang.lblUnableToDone,
                                        message: String.format(lang.lblDupliCheck, String(e.fieldName).toLowerCase())
                                    });
                                }
                            },
                            error: function (xhr) {
                                return false;
                            }
                        });
                    }
                    else
                    {
                        var data = t.dataFactory.getItem();
                        for(var i = 0; i < data.length; i++)
                        {
                            var item = data[i];
                            switch(t.gridInfo.gridInlineMode)
                            {
                                case "insert":
                                    if (item[modelNo] == dataNo && item[modelID] != "")
                                    {
                                        result = false;
                                        i = data.length;
                                        bootboxAlert({
                                            title: lang.lblUnableToDone,
                                            message: String.format(lang.lblDupliCheck, t.gridInfo.gridFieldDuplicate)
                                        });
                                    }
                                    break;
                                case "edit":
                                    if (item[modelNo] == dataNo && dataID != item[modelID] && dataID != "")
                                    {
                                        result = false;
                                        i = data.length;
                                        bootboxAlert({
                                            title: lang.lblUnableToDone,
                                            message: String.format(lang.lblDupliCheck, t.gridInfo.gridFieldDuplicate)
                                        });
                                    }
                                    break;
                                default:
                                    break;
                            };
                        }
                    }
                }
                return result;
            }
            catch(err)
            {
                console.log(err);
            }
        },
        eventOnSaveChange: function (event) { },
        eventOnRemoveDI: function (event) {
            try
            {
                var paging = t.gridInfo.gridDatasource.page();
                var result = t.eventFactory.eventOnRemove(event);
                if (result)
                {
                    t.gridInfo.gridKendoGrid._confirmation(event);
                    t.gridInfo.gridKendoGrid._removeRow(event);
                    t.gridInfo.gridCurrentUsage = paging;

                    var hook = t.eventFactory.eventHook.OnAfterRemove;
                    if (!!hook && typeof hook == "function")
                        hook();
                }
            }
            catch(err)
            {
                console.log(err);
            }
        },
        eventOnRemove: function (event) {
            try
            {
                var hook = t.eventFactory.eventHook.OnRemove;
                var data = t.dataFactory.getItemSelect();

                if (!!hook && typeof hook == "function") {
                    var result = hook(data);
                    if(result)
                    {
                        for (var i = 0; i < data.length; i++)
                        {
                            if (t.dataInfo.dataDeleteID.indexOf(data[i].id) == -1 && data[i].id != "")
                            {
                                t.dataInfo.setDataDeleteID(data[i].id);
                                t.dataInfo.setDataDeleteRow(data[i]);
                            }
                        }
                    }
                    return result;
                }
                else {
                    for (var i = 0; i < data.length; i++)
                    {
                        if (t.dataInfo.dataDeleteID.indexOf(data[i].id) == -1 && data[i].id != "")
                        {
                            t.dataInfo.setDataDeleteID(data[i].id);
                            t.dataInfo.setDataDeleteRow(data[i]);
                        }
                    }
                    return true;
                }
            }
            catch(err)
            {
                console.log(err);
            }
        },
        eventOnCancel: function (event) {
            try
            {
                var objResult = {
                    canCancel: event._defaultPrevented,
                    model: event.model
                };

                var rowData = t.dataFactory.getItemSelect()[0];
                var funcHook = t.eventFactory.eventHook.OnCancel;
                if (!!funcHook && typeof funcHook == "function")
                {
                    objResult = funcHook(event.model, !event._defaultPrevented);
                    objResult.canCancel = !objResult.canCancel;
                    objResult.model = objResult.model;
                }

                event._defaultPrevented = objResult.canCancel;
                event.model = objResult.model;
                
                if (t.gridInfo.gridInlineMode == "insert")
                {
                    setTimeout(function () {
                        t.dataFactory.removeItem(rowData);
                    }, 0000);
                }

                t.inlineFactory.closeEditInline();
            }
            catch (err) {
                console.log(err);
            }
        },
        eventDataBound: function (event) {
            try
            {
                t.checkboxFactory.setTitleBtn();
                t.inlineFactory.refreshEventButton(event);
                if ($(".body-content").data("pagetype") == "detail") 
                    $(".body-content input").attr("disabled", true);

                var funcHook = t.eventFactory.eventHook.OnDataBound;
                if (!!funcHook && typeof funcHook == "function") {
                    funcHook(event);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    };
    t.checkboxFactory = {
        checkAll: function (checkboxAll) {
            try
            {
                var grid = t.gridInfo.gridID;
                var gridData = t.gridInfo.gridDatasource;
                var state = $(checkboxAll).is(':checked');

                var buttonControl = grid.find(".k-grid-cancel");
                buttonControl.click();
                itemselected = new Array();
                for (var i = 0; i < gridData.data().length; i++)
                {
                    var dataRow = gridData.data()[i]; 
                    var elementRow = grid.find("td:first-child input[type='checkbox']")[i];
                    if (elementRow != null)
                    {
                        var checked = elementRow.checked;
                        var row = $(elementRow).closest("tr");
                        if (state)
                        {
                            elementRow.checked = true;
                            row.addClass("k-state-selected");
                            itemselected.push(dataRow);
                        }
                        else
                        {
                            elementRow.checked = false;
                            row.removeClass("k-state-selected");

                            var thisItem = $.grep(itemselected, function (n, m) {
                                return n[t.gridInfo.gridDatasource.reader.model.idField] == dataRow[t.gridInfo.gridDatasource.reader.model.idField];
                            });
                            if (thisItem.length > 0) {
                                var index = itemselected.indexOf(thisItem[0]);
                                itemselected.splice(index, 1);
                            }
                        }

                        if (!!t.eventFactory.eventHook.OnCheckAll && typeof t.eventFactory.eventHook.OnCheckAll == "function") {
                            t.eventFactory.eventHook.OnCheckAll(dataRow, state);
                        }
                    }
                };
            }
            catch (err) {
                console.log("error checkAll");
            }
        },
        checkRow: function (checkbox, isAddBinding) { 
            try
            { 
                var grid = t.gridInfo.gridID;
                var selected = t.gridInfo.gridSelected;
                var state = checkbox.checked;
                var rowItem = $(checkbox).closest("tr");
                var gridOpenEdit = grid.find(".k-cancel");
                
                if (selected == "multiple" && grid.closest(".modal.picker-modal").length > 0) {
                    if (!isAddBinding) {
                        var uid = $(rowItem).data("uid");
                        var item = t.gridInfo.gridDatasource.getByUid(uid);
                        if (state) {
                            itemselected.push(item);
                        } else {
                            var item = t.gridInfo.gridDatasource.getByUid(uid);
                            var thisItem = $.grep(itemselected, function (n, m) {
                                return n[t.gridInfo.gridDatasource.reader.model.idField] == item[t.gridInfo.gridDatasource.reader.model.idField];
                            });
                            if (thisItem.length > 0) {
                                var index = itemselected.indexOf(thisItem[0]);
                                itemselected.splice(index, 1);
                            }
                        }
                    }
                } else {

                }
                if (state) $(rowItem[0]).addClass("k-state-selected");
                else $(rowItem[0]).removeClass("k-state-selected");

                if (selected == "multiple")
                {
                    var checkall = grid.find("td:first-child input[type='checkbox']");
                    var checked = grid.find("td:first-child input[type='checkbox']:checked");
                    var uncheck = checkall.not(checked);

                    checked.closest("tr").addClass("k-state-selected");
                    uncheck.closest("tr").removeClass("k-state-selected");
                    gridOpenEdit.click();

                    if (checkall.length != checked.length) grid.find("#grid-check-all")[0].checked = false;
                    else grid.find("#grid-check-all")[0].checked = true;
                }
                else
                {
                    var gridData = t.gridInfo.gridDatasource;
                    for (var i = 0; i < gridData.data().length; i++)
                    {
                        var dataRow = gridData.data()[i];
                        var elementRow = grid.find("td:first-child input[type='checkbox']")[i];
                        if (elementRow != null) {
                            var row = $(elementRow).closest("tr");
                            row.removeClass("k-state-selected");
                            elementRow.checked = false;
                        }
                    };
                    if (state)
                    {
                        checkbox.checked = true;
                        rowItem.addClass("k-state-selected");
                    }
                    else
                    {
                        checkbox.checked = false;
                        rowItem.removeClass("k-state-selected");
                    }
                }
            }
            catch (err) {
                console.log("error checkRow");
            }
        },
        checkCurrentRow: function (button) {
            try
            {
                if (!$(button).hasClass("k-grid-custom_edit") && !$(button).hasClass("k-grid-custom_delete"))
                {
                    var grid = t.gridInfo.gridID;
                    var rowCurrent = grid.find(".k-grid-update").parents("tr");
                    var rowAll = grid.find("tr");
                    var checkbox = grid.find("td:first-child input[type='checkbox']");
                    if (!!checkbox && checkbox.length > 0) {
                        var checkboxCurrent = rowCurrent.find("td:first-child input[type='checkbox']");
                        if (!!checkboxCurrent) {
                            $.each(checkbox, function (index, value) { value.checked = false; });
                            if (!!grid.find("#grid-check-all") && grid.find("#grid-check-all").length > 0)
                                grid.find("#grid-check-all")[0].checked = false;
                            checkboxCurrent[0].checked = true;
                             
                            var uid = $(rowCurrent).data("uid");
                            var item = t.gridInfo.gridDatasource.getByUid(uid);
                            itemselected = new Array(); // clearItemSelected
                            itemselected.push(item);
                        }
                    }
                    rowAll.removeClass("k-state-selected");
                    rowCurrent.addClass("k-state-selected");
                }
                else
                {
                    var tr = $(button).parents("tr");
                    var uid = $(tr).data("uid");
                    var data = t.gridInfo.gridDatasource.getByUid(uid);
                    if ($(button).hasClass("k-grid-custom_edit"))
                    {
                        var hook = t.eventFactory.eventHook.OnClickEdit;
                        if (!!hook && typeof hook == "function")
                            hook(data);
                    }
                    else
                    {
                        var hook = t.eventFactory.eventHook.OnClickDelete;
                        if (!!hook && typeof hook == "function")
                            hook(data);
                    }
                }
            }
            catch (err) {
                console.log("error checkCurrentRow");
            }
        },
        //แก้ปัญหา Item Description Delete จากปุ่ม ลบของแต่ละ Row ไม่ได้ --Fluke
        checkCurrentRowDel: function (button) {
            try {
                if (!$(button).hasClass("k-grid-custom_edit") && !$(button).hasClass("k-grid-custom_delete")) {
                    var grid = t.gridInfo.gridID;
                    var rowCurrent = grid.find(".k-state-selected .k-grid-delete").parents("tr");
                    var rowAll = grid.find("tr");
                    var checkbox = grid.find("td:first-child input[type='checkbox']");
                    if (!!checkbox && checkbox.length > 0) {
                        var checkboxCurrent = rowCurrent.find("td:first-child input[type='checkbox']");
                        if (!!checkboxCurrent) {
                            $.each(checkbox, function (index, value) { value.checked = false; });
                            if (!!grid.find("#grid-check-all") && grid.find("#grid-check-all").length > 0)
                                grid.find("#grid-check-all")[0].checked = false;
                            checkboxCurrent[0].checked = true;

                            var uid = $(rowCurrent).data("uid");
                            var item = t.gridInfo.gridDatasource.getByUid(uid);
                            itemselected = new Array(); // clearItemSelected
                            itemselected.push(item);
                        }
                    }
                    rowAll.removeClass("k-state-selected");
                    rowCurrent.addClass("k-state-selected");
                }
                else {
                    var tr = $(button).parents("tr");
                    var uid = $(tr).data("uid");
                    var data = t.gridInfo.gridDatasource.getByUid(uid);
                    if ($(button).hasClass("k-grid-custom_edit")) {
                        var hook = t.eventFactory.eventHook.OnClickEdit;
                        if (!!hook && typeof hook == "function")
                            hook(data);
                    }
                    else {
                        var hook = t.eventFactory.eventHook.OnClickDelete;
                        if (!!hook && typeof hook == "function")
                            hook(data);
                    }
                }
            }
            catch (err) {
                console.log("error checkCurrentRowDel");
            }
        },
        selectRowByID: function (id) {
            try
            {
                if (id != "")
                {
                    var checkbox = t.gridInfo.gridID.find(".grid-check-item[value=" + id + "]");
                    if (!!checkbox && checkbox.length > 0) {
                        checkbox[0].checked = true;
                        checkbox.parents("tr").addClass("k-state-selected");
                    }
                }
            }
            catch(err)
            {
                console.log(err);
            }
        },
        selectMultipleRowByID: function (id) {
            try {
                if (!!id)
                {
                    for(var i = 0; i < id.length; i++)
                    {
                        var checkbox = t.gridInfo.gridID.find(".grid-check-item[value=" + id[i] + "]");
                        if (!!checkbox && checkbox.length > 0)
                        {
                            checkbox[0].checked = true;
                            checkbox.parents("tr").addClass("k-state-selected");
                        }
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        setTitleBtn: function () {
            t.gridInfo.gridID.find(".k-grid-edit").attr("title", lang.lblEdit);
            t.gridInfo.gridID.find(".k-grid-delete").attr("title", lang.lblDelete);
            t.gridInfo.gridID.find(".k-grid-custom_edit").attr("title", lang.lblEdit);
            t.gridInfo.gridID.find(".k-grid-custom_delete").attr("title", lang.lblDelete);
            t.gridInfo.gridID.find(".k-grid-update").attr("title", lang.lblSave);
            t.gridInfo.gridID.find(".k-grid-cancel").attr("title", lang.lblCancel);
        },
        uncheckAll: function () {
            var grid = t.gridInfo.gridID;
            var gridData = t.gridInfo.gridDatasource;
            var buttonControl = grid.find(".k-grid-cancel");
            buttonControl.click(); 
            for (var i = 0; i < gridData.data().length; i++) {
                var dataRow = gridData.data()[i];
                var elementRow = grid.find("td:first-child input[type='checkbox']")[i];
                if (elementRow != null) {
                    var checked = elementRow.checked;
                    var row = $(elementRow).closest("tr"); 
                    elementRow.checked = false;
                    row.removeClass("k-state-selected");  
                }
            };
        }
    };
    t.dataFactory = {
        refreshData: function () { 
            t.gridInfo.gridDatasource._skip = 0;
            t.gridInfo.gridDatasource.read();
            itemselected = new Array();
        },
        clearItemSelected: function () {
            itemselected = new Array();
        },
        getDataSource: function () {
            if(t.gridInfo.gridInlineMode == "")
            {
                return t.gridInfo.gridDatasource.data();
            }
            else
            {
                var gridID = t.gridInfo.gridID;
                var uidInline = gridID.find(".k-grid-edit-row").data("uid");
                var data = [];
                for(var i = 0; i < t.gridInfo.gridDatasource.data().length; i++)
                {
                    if (t.gridInfo.gridDatasource.data()[i].uid != uidInline)
                        data.push(t.gridInfo.gridDatasource.data()[i]);
                }
                return data;
            }
        },
        getItem: function () {
            return t.gridInfo.gridDatasource.data();
        },
        getItemUID: function (data) {
            var item = [];
            if (!!data && data.length > 0)
            {
                $.each(data, function (index, value) {
                    item.push(value.uid);
                });
            }
            return item;
        },
        getItemSelectUID: function () {
            var item = [];
            var data = t.dataFactory.getItemSelect();
            if (!!data && data.length > 0) {
                $.each(data, function (index, value) {
                    item.push(value.uid);
                });
            }
            return item;
        },
        getItemSelect: function () { 
            var item = [], uid = [];
            var select = new Array();
            var grid = t.gridInfo.gridID;
            if (selected == "multiple" && grid.closest(".modal.picker-modal").length > 0) {
                item = itemselected;
            } else {
                select = t.gridInfo.gridKendoGrid.select();
                $.each(select, function (index, value) {
                    uid.push($(value).data("uid"));
                });
                if (uid.length > 0) {
                    $.each(t.dataFactory.getItem(), function (index, value) {
                        if (uid.indexOf(value.uid) > -1)
                            item.push(value);
                    });
                }
            }
            return item;
        },
        addItem: function (item) {
            t.gridInfo.gridDatasource.add(item);
        },
        updateItem: function (uid, field, value) {
            t.gridInfo.gridDatasource.getByUid(uid).set(field, value);
        },
        updateRow: function (uid, row) {
            var current = t.gridInfo.gridDatasource.getByUid(uid);
            if(!!current)
            { 
                var fields = $.map(current, function (n, i) { return i; });
                for(var i = 0; i < fields.length; i++)
                {
                    var fieldCurrent = fields[i];
                    if (row[fieldCurrent] != undefined)
                    {
                        var valueCurrent = row[fieldCurrent];
                        t.dataFactory.updateItem(uid, fieldCurrent, valueCurrent);
                    }
                }
            }
        },
        removeItemAll: function () {
            while (t.dataFactory.getItem().length > 0)
            {
                var item = t.dataFactory.getItem();
                t.dataFactory.removeItem(item[item.length - 1]);
            }
            t.gridInfo.gridInlineMode = "";
        },
        removeItemByFieldData: function (field, data) {
            if(!!field && !!data)
            {
                var dataSource = t.dataFactory.getItem();
                for (var i = 0; i < dataSource.length; i++) {
                    if (dataSource[i][field] == data) {
                        t.dataInfo.setDataDeleteID(dataSource[i].id);
                        t.dataInfo.setDataDeleteRow(dataSource[i]);
                        t.gridInfo.gridDatasource.remove(dataSource[i]);
                    }
                }
            }
        },
        removeItem: function (item) {
            if (!!item)
            {
                var itemType = JSON.parse(JSON.stringify(item));
                if (itemType.constructor === Array)
                {
                    for (var i = 0; i < item.length; i++)
                    {
                        var dataSource = t.dataFactory.getItem();
                        for (var j = 0; j < dataSource.length; j++)
                        {
                            if(dataSource[j].uid == item[i].uid)
                            {
                                t.dataInfo.setDataDeleteID(dataSource[j].id);
                                t.dataInfo.setDataDeleteRow(dataSource[j]);
                                t.gridInfo.gridDatasource.remove(dataSource[j]);
                            }
                        }
                    }
                } else
                {
                    var dataSource = t.dataFactory.getItem();
                    for (var i = 0; i < dataSource.length; i++)
                    {
                        if (dataSource[i].uid == item.uid)
                        {
                            t.dataInfo.setDataDeleteID(dataSource[i].id);
                            t.dataInfo.setDataDeleteRow(dataSource[i]);
                            t.gridInfo.gridDatasource.remove(dataSource[i]);
                        }
                    }
                }
            }
        },
        prepareDataBeforeRequest: function (data) {
            var propDefault = t.gridInfo.gridProp;
            var propKey = $.map(propDefault, function (n, i) { return i; });
            var serverOperation = t.gridInfo.gridDatasource.options.serverAggregates &&
                                  t.gridInfo.gridDatasource.options.serverFiltering &&
                                  t.gridInfo.gridDatasource.options.serverGrouping &&
                                  t.gridInfo.gridDatasource.options.serverPaging &&
                                  t.gridInfo.gridDatasource.options.serverSorting;
            for (var j = 0; j < propKey.length; j++)
            {
                if (propDefault[propKey[j]].Type == 3 && serverOperation)
                {
                    var dateData = data[propKey[j]];
                    data[propKey[j]] = dateData != null ? dateData.toISOString() : null;
                }
            }
            return data;
        },
        copyRowItem: function (eventOnSelect) {
            var resultSelect = true;
            var dataItemSelect = t.dataFactory.getItemSelect();
            if(!!eventOnSelect && typeof eventOnSelect == "function")
                resultSelect = eventOnSelect(dataItemSelect);
            if (resultSelect && dataItemSelect.length > 0)
            {
                var primaryKey = t.gridInfo.gridDatasource.reader.model.idField;
                var dataItem = JSON.parse(JSON.stringify(dataItemSelect[0]));
                if (!!eventOnSelect && typeof eventOnSelect == "string")
                {
                    dataItem[eventOnSelect] = "";
                }
                t.gridInfo.gridDatasourceCopy = dataItem;
                t.inlineFactory.addInline();
            }
        },
        insertRow: function (model) {
            try
            {
                var itemSelect = t.dataFactory.getItemSelect();
                var gridFunction = t.gridInfo.gridDatasource;
                if(itemSelect != null && itemSelect.length == 1)
                {
                    var itemUsage = itemSelect[0];
                    var itemIndex = gridFunction.indexOf(itemUsage);
                    var ItemNewIndex = Math.max(0, itemIndex);
                    gridFunction.insert(ItemNewIndex, model);

                    for (var i = 0; i < itemSelect.length; i++) {
                        var itemUsage = itemSelect[i];
                        var itemUid = itemUsage.uid;
                        t.gridInfo.gridID.find("tr[data-uid='" + itemUid + "'] td:first-child .grid-check-item").click();
                    }
                }
                else
                {
                    bootboxAlert({ title: lang.lblUnableToDone, message: lang.lblSelect1Data });
                }
            }
            catch (e) { }
        },
        moveRowUp: function () {
            try
            {
                var itemSelect = t.dataFactory.getItemSelect();
                var gridFunction = t.gridInfo.gridDatasource;

                for (var i = 0; i < itemSelect.length; i++)
                {
                    var itemUsage = itemSelect[i];
                    var itemIndex = gridFunction.indexOf(itemUsage);
                    var ItemNewIndex = Math.max(0, itemIndex - 1);

                    if (itemIndex != ItemNewIndex)
                    {
                        t.dataFactory.removeItem(itemUsage);
                        gridFunction.insert(ItemNewIndex, itemUsage);
                        t.dataInfo.dataDeleteID.pop();
                        t.dataInfo.dataDeleteRow.pop();
                    }
                }

                for(var i = 0; i < itemSelect.length; i++)
                {
                    var itemUsage = itemSelect[i];
                    var itemUid = itemUsage.uid;
                    t.gridInfo.gridID.find("tr[data-uid='" + itemUid + "'] td:first-child .grid-check-item").click();
                }
            }
            catch (e) { }
        },
        moveRowDown: function () {
            try {
                var itemSelect = t.dataFactory.getItemSelect();
                var gridFunction = t.gridInfo.gridDatasource;

                for (var i = itemSelect.length - 1; i >= 0; i--)
                {
                    var itemUsage = itemSelect[i];
                    var itemIndex = gridFunction.indexOf(itemUsage);
                    var ItemNewIndex = Math.min(gridFunction.total() - 1, itemIndex + 1);

                    if (itemIndex != ItemNewIndex)
                    {
                        t.dataFactory.removeItem(itemUsage);
                        gridFunction.insert(ItemNewIndex, itemUsage);
                        t.dataInfo.dataDeleteID.pop();
                        t.dataInfo.dataDeleteRow.pop();
                    }
                }

                for (var i = 0; i < itemSelect.length; i++) {
                    var itemUsage = itemSelect[i];
                    var itemUid = itemUsage.uid;
                    t.gridInfo.gridID.find("tr[data-uid='" + itemUid + "'] td:first-child .grid-check-item").click();
                }
            }
            catch (e) { }
        }
    };
    t.headerFactory = {
        headerPartial: {},
        getHeaderPartial: function () {
            var partial = $(".grid-partial[data-grid='" + t.gridInfo.gridName + "']").find("div[data-partial]");
            if(!!partial && partial.length > 0)
            {
                $.each(partial, function (value, index) {
                    var partialName = $(this).data("partial");
                    var partialHTML = $(this).find("table tbody").html(); 
                    t.headerFactory.headerPartial[partialName] = partialHTML;
                });
            }
        },
        headerTemplate: function(){}
    };
    t.footerFactory = {
        footerPartial: {},
        getFooterPartial: function () {
            var colgroup = t.gridInfo.gridID.find("colgroup").html();
            var blank = "<div class='clean'></div>";
            blank += "<div class='grid-custom-footer k-grid-header'>";
            blank += "<div class='k-grid-header-wrap'>";
            blank += "<table role='grid'></table>";
            blank += "</div></div>";
            var partial = $(".grid-partial[data-grid='" + t.gridInfo.gridName + "']").find("div[data-partial]");

            if (!!partial && partial.length > 0)
            {
                $.each(partial, function (value, index)
                {
                    var partialName = $(this).data("partial");
                    var partialHTML = $(this).find("table tbody").html();
                    t.footerFactory.footerPartial[partialName] = partialHTML;
                });
            }

            t.gridInfo.gridID.find(".k-grid-content").after(blank);
            t.gridInfo.gridID.find(".grid-custom-footer table").html("<colgroup>" + colgroup + "</colgroup><thead role='rowgroup'></thead>")
        },
        footerTemplate: function () { }
    };
    t.getGridSearchFilter = function () {
        var model = [];
        var wrapper = $(".searchgrid-wrapper[data-grid=" + t.gridInfo.gridName + "]");
        if (!!wrapper && wrapper.length > 0)
        {

            var data = wrapper.find("input:checkbox:checked");
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str += $(data[i]).data("name") + ",";
            }
            if (str != "") {
                str = str.substring(0, str.length - 1);
            }
            model = {
                searchText: wrapper.find(".searchgrid").val(),
                filterStr: str
            } 
            if (wrapper.find("#ddlFilterEnum").length > 0) {
                var _enum = wrapper.find("#ddlFilterEnum").val();
                model["filterEnum"] = _enum;
            }
            if (wrapper.find("#ddlFilterStatus").length > 0) {
                var _enum = wrapper.find("#ddlFilterStatus").val();
                model["filterStatus"] = _enum;
            }
            if (wrapper.find("#ddlFilterCreatedBy").length > 0) {
                var _enum = wrapper.find("#ddlFilterCreatedBy").val();
                model["filterDeposit"] = _enum;
            }
            if (wrapper.find("#ddlFilterSystem").length > 0) {
                var _enum = wrapper.find("#ddlFilterSystem").val();
                model["filterDeposit"] = _enum;
            }
            if (wrapper.find("#ddlFilterPostGL").length > 0) {
                var _enum = wrapper.find("#ddlFilterPostGL").val();
                model["filterDeposit"] = _enum;
            }
            if ($("#" + name) != null) {
                if ($("#" + name).closest(".tab-pane").find("#ddlFilterApproveStatus").length > 0) {
                    var _enum = $("#" + name).closest(".tab-pane").find("#ddlFilterApproveStatus").val();
                    model["filterFilterApproveStatus"] = _enum;
                }
            }
            if (wrapper.find("#ddlFilterVatType").length > 0) {
                var _enum = wrapper.find("#ddlFilterVatType").val();
                model["filterVatType"] = _enum;
            }
            if (wrapper.find("#ddlFilterVatGroup").length > 0) {
                var _enum = wrapper.find("#ddlFilterVatGroup").val();
                model["filterVatGroup"] = _enum;
            }
            /*---------------ddlFilterDuration----------------*/
            if (wrapper.find("#ddlFilterDuration").length > 0) {
                var _enum = wrapper.find("#ddlFilterDuration").val();
                model["filterDuration"] = _enum;
            }
            if (wrapper.find(".filter-duration-detail #startdate").val() != "") {
                var startdate = wrapper.find(".filter-duration-detail #startdate").val();
                model["filterStartDate"] = startdate
            }
            if (wrapper.find(".filter-duration-detail #enddate").val() != "") {
                var enddate = wrapper.find(".filter-duration-detail #enddate").val();
                model["filterEndDate"] = enddate
            }
            /*---------------ddlFilterExpireDuration----------------*/
            if (wrapper.find("#ddlFilterExpireDuration").length > 0) {
                var _enum = wrapper.find("#ddlFilterExpireDuration").val();
                model["filterExpireDuration"] = _enum;
            }
            if (wrapper.find(".filter-expireduration-detail #startdateexpire").val() != "") {
                var startdateexpire = wrapper.find(".filter-expireduration-detail #startdateexpire").val();
                model["filterStartDateExpire"] = startdateexpire
            }
            if (wrapper.find(".filter-expireduration-detail #enddateexpire").val() != "") {
                var enddateexpire = wrapper.find(".filter-expireduration-detail #enddateexpire").val();
                model["filterEndDateExpire"] = enddateexpire
            }
            /*---------------ddlFilterStartDate----------------*/
            if (wrapper.find("#ddlFilterStartDate").length > 0) {
                var _enum = wrapper.find("#ddlFilterStartDate").val();
                model["filterStartDate_"] = _enum;
            }
            if (wrapper.find(".filter-duration-detail #startdateST").val() != "") {
                var startdate = wrapper.find(".filter-duration-detail #startdateST").val();
                model["filterStartDateST"] = startdate
            }
            if (wrapper.find(".filter-duration-detail #enddateST").val() != "") {
                var enddate = wrapper.find(".filter-duration-detail #enddateST").val();
                model["filterEndDateST"] = enddate
            }
            /*---------------ddlFilterEndDate----------------*/
            if (wrapper.find("#ddlFilterEndDate").length > 0) {
                var _enum = wrapper.find("#ddlFilterEndDate").val();
                model["filterEndDate_"] = _enum;
            }
            if (wrapper.find(".filter-duration-detail #startdateED").val() != "") {
                var startdate = wrapper.find(".filter-duration-detail #startdateED").val();
                model["filterStartDateED"] = startdate
            }
            if (wrapper.find(".filter-duration-detail #enddateED").val() != "") {
                var enddate = wrapper.find(".filter-duration-detail #enddateED").val();
                model["filterEndDateED"] = enddate
            }
            /*---------------ddlFilterDurationBill----------------*/
            if (wrapper.find("#ddlFilterDurationBill").length > 0) {
                var _enum = wrapper.find("#ddlFilterDurationBill").val();
                model["filterDurationBill"] = _enum;
            }
            if (wrapper.find(".filter-duration-detail #startdatebill").val() != "") {
                var startdate = wrapper.find(".filter-duration-detail #startdatebill").val();
                model["filterStartDateBill"] = startdate
            }
            if (wrapper.find(".filter-duration-detail #enddatebill").val() != "") {
                var enddate = wrapper.find(".filter-duration-detail #enddatebill").val();
                model["filterEndDateBill"] = enddate
            }
            /*---------------ddlFilterDurationPre----------------*/
            if (wrapper.find("#ddlFilterDurationPre").length > 0) {
                var _enum = wrapper.find("#ddlFilterDurationPre").val();
                model["filterDurationPre"] = _enum;
            }
            if (wrapper.find(".filter-duration-detail #startdatepre").val() != "") {
                var startdate = wrapper.find(".filter-duration-detail #startdatepre").val();
                model["filterStartDatePre"] = startdate
            }
            if (wrapper.find(".filter-duration-detail #enddatepre").val() != "") {
                var enddate = wrapper.find(".filter-duration-detail #enddatepre").val();
                model["filterEndDatePre"] = enddate
            }
            /*---------------ddlFilterGoodsType----------------*/
            if (wrapper.find("#ddlFilterGoodsType").length > 0) {
                var _enum = wrapper.find("#ddlFilterGoodsType").val();
                model["filterGoodsType"] = _enum;
            }
            if (wrapper.find("#ddlFilterActType").length > 0) {
                var _enum = wrapper.find("#ddlFilterActType").val();
                model["filterActType"] = _enum;
            }
            if (wrapper.find("#ddlFilterActPriority").length > 0) {
                var _enum = wrapper.find("#ddlFilterActPriority").val();
                model["filterActPriority"] = _enum;
            }
            if (wrapper.find("#ddlFilterActStatus").length > 0) {
                var _enum = wrapper.find("#ddlFilterActStatus").val();
                model["filterActStatus"] = _enum;
            }
            /*---------------ddlFilterOppStage----------------*/
            if (wrapper.find("#ddlFilterOppStage").length > 0) {
                var _enum = wrapper.find("#ddlFilterOppStage").val();
                model["filterOppStage"] = _enum;
            }
            /*---------------ddlFilterRating----------------*/
            if (wrapper.find("#ddlFilterRating").length > 0) {
                var _enum = wrapper.find("#ddlFilterRating").val();
                model["filterRating"] = _enum;
            }
            if (wrapper.find(".datetime-custom").length > 0) { 
                var list = new Array();
                wrapper.find(".datetime-custom").each(function () { 
                    list.push({
                        dataName: $(this).data("name"),
                        dataValue: $(this).find(".ddlFilterDatetimeCustom").val(),
                        startDate: getDatepickerValue($(this).find(".startdate")),
                        endDate: getDatepickerValue($(this).find(".enddate"))
                    })
                })
                model["filterDatetimeCustom"] = list;
            }

            if (wrapper.find(".dropdown-custom").length > 0) {
                var list = new Array();
                wrapper.find(".dropdown-custom").each(function () {
                    list.push({
                        dataName: $(this).data("name"),
                        whereType: $(this).data("wheretype"),
                        dataValue: $(this).find(".ddlFilterDropdownCustom").val()
                    });
                });
                model["filterDropdownCustom"]= list;
            }
            
        }
        return model; 
    }
    t.eventListener = function () {
        $(function () {
            t.gridInfo.gridName = name;
            t.gridInfo.gridID = $("#" + name);
            t.gridInfo.gridKendoGrid = $("#" + name).data().kendoGrid;
            t.gridInfo.gridDatasource = $("#" + name).data().kendoGrid.dataSource;

            t.gridInfo.gridKendoGrid.removeRow = t.eventFactory.eventOnRemoveDI;
            t.gridInfo.gridKendoGrid.gridService = t;
            t.gridInfo.gridKendoGrid.isopeninline = t.inlineFactory.isOpenInline;
            t.gridInfo.gridDatasource.isopeninline = t.inlineFactory.isOpenInline;
            t.gridInfo.gridDefaultPageSize = t.gridInfo.gridDatasource.pageSize();

            t.gridInfo.gridID.find(".k-grid-content").addClass("frm-group");
            t.gridInfo.gridID.find(".k-grid-content").attr("style", t.gridInfo.gridID.find(".k-grid-content").attr("style") + ";margin-bottom:0px");

            t.headerFactory.getHeaderPartial();
            t.footerFactory.getFooterPartial();

            t.headerFactory.headerTemplate(t.gridInfo.gridID.find("thead[role='rowgroup'] tr"));
            t.footerFactory.footerTemplate(t.gridInfo.gridID.find(".grid-custom-footer table thead"));
            if (t.footerFactory.footerTemplate.length == 0)
                t.gridInfo.gridID.find(".grid-custom-footer").addClass("hide");

            $(t.gridInfo.gridID.find(".grid-custom-footer table thead")).parents("table").addClass("frm-group");
            $(t.gridInfo.gridID.find(".grid-custom-footer table thead")).parents(".grid-custom-footer").attr("style", "padding-right:0px");
            $(t.gridInfo.gridID.find(".grid-custom-footer table thead")).parents(".k-grid-header-wrap").attr("style", "border-top: 1px solid #ccc");

            if (t.gridInfo.gridID.parents(".grid-control ").hasClass("onepage"))
            {
                //t.gridInfo.gridID.attr("style", "display: inline-block;");
                t.gridInfo.gridID.find(".k-grid-content").css("css", { "overflow-y": "auto", "overflow-x": "auto" });
                //t.gridInfo.gridID.find(".k-grid-header").attr("style", "padding-right:0px");
            }

            t.gridInfo.gridID.find("table").addClass("frm-content");
            t.gridInfo.gridID.parents(".grid-control").removeClass("hide");
            t.gridInfo.gridID.find("table").attr("style", "padding-left:0px;padding-right:0px;");

            $(document).on("dblclick", "#" + t.gridInfo.gridName + " .k-grid-content td", function () { 
                var selected = t.gridInfo.gridSelected;
                if (selected != "multiple") { 
                    var isCanDoubleCLick = convert.toBoolean($(this).closest(".k-grid").attr("dblclick"));
                    if (isCanDoubleCLick) {

                        var grid = t.gridInfo.gridID;
                        var row = $(this).closest("tr");

                        if (((!!row.find("td:eq(0) > input.grid-check-item") && row.find("td:eq(0) > input.grid-check-item").length > 0) &&
                            (row.find("td").index(this) == 0)) ||
                            ((!!row.find("td.grid-control-btn") && row.find("td.grid-control-btn").length > 0) &&
                            (row.find("td").index(this) == 1))) {
                            var checked = t.gridInfo.gridID.find("input.grid-check-item:checked");
                            var selected = t.gridInfo.gridID.find(".k-state-selected");

                            t.gridInfo.gridID.find(".k-grid-content").find(".k-state-selected").removeClass("k-state-selected");
                            if (!!checked && checked.length > 0)
                                checked.parents("tr").addClass("k-state-selected");

                            event.preventDefault();
                            event.stopPropagation();
                            return;
                        }

                        var checkboxCollection = row.find("td:first-child input[type='checkbox']");
                        if (!!checkboxCollection && checkboxCollection.length > 0) {
                            var checkbox = checkboxCollection[0];
                            var rowChecked = grid.find("td:first-child input[type='checkbox']:checked").closest("tr");
                            if (!checkbox.checked)
                                row.removeClass("k-state-selected");
                            rowChecked.addClass("k-state-selected");
                        }

                        var checkbox = row.find("td:first-child input.grid-check-item");
                        if (!!checkbox && checkbox.length > 0 && t.gridInfo.gridInlineMode == "") {
                            if (t.gridInfo.gridID.find(".k-grid-edit-row").length == 0) {
                                if ($(checkbox[0]).attr("disabled") == undefined || $(checkbox[0]).attr("disabled") == null) {
                                    checkbox[0].checked = true;
                                    t.checkboxFactory.checkRow(checkbox[0], true);
                                }
                            }
                        }

                        if (!!t.gridInfo.gridID.parents(".picker-modal") && t.gridInfo.gridID.parents(".picker-modal").length > 0) {
                            var modalPicker = t.gridInfo.gridID.parents(".picker-modal");
                            //fix [0] เนื้องจากเอาตัวที่ใกล้ที่สุด
                            $(modalPicker[0]).find(".btn-select-picker").click();
                        }
                    }
                }
            });
            $(document).on("click", "#" + t.gridInfo.gridName + " .k-grid-content td", function (event) {
                var grid = t.gridInfo.gridID;
                var row = $(this).closest("tr");
                if (((!!row.find("td:eq(0) > input.grid-check-item") && row.find("td:eq(0) > input.grid-check-item").length > 0) &&
                    (row.find("td").index(this) == 0)) ||
                    ((!!row.find("td.grid-control-btn") && row.find("td.grid-control-btn").length > 0) &&
                    (row.find("td").index(this) == 1)))
                {
                    var checked = t.gridInfo.gridID.find("input.grid-check-item:checked");
                    var selected = t.gridInfo.gridID.find(".k-state-selected");

                    t.gridInfo.gridID.find(".k-grid-content").find(".k-state-selected").removeClass("k-state-selected");
                    if (!!checked && checked.length > 0)
                        checked.parents("tr").addClass("k-state-selected");

                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }

                var checkboxCollection = row.find("td:first-child input[type='checkbox']");
                if (!!checkboxCollection && checkboxCollection.length > 0)
                {
                    var checkbox = checkboxCollection[0];
                    var rowChecked = grid.find("td:first-child input[type='checkbox']:checked").closest("tr");
                    if (!checkbox.checked)
                        row.removeClass("k-state-selected");
                    rowChecked.addClass("k-state-selected");
                }

                var checkbox = row.find("td:first-child input.grid-check-item");
                if (!!checkbox && checkbox.length > 0 && t.gridInfo.gridInlineMode == "")
                {
                    if (t.gridInfo.gridID.find(".k-grid-edit-row").length == 0)
                    {
                        if ($(checkbox[0]).attr("disabled") == undefined || $(checkbox[0]).attr("disabled") == null)
                        {
                            if (checkbox[0].checked)
                                checkbox[0].checked = false;
                            else
                                checkbox[0].checked = true;
                            t.checkboxFactory.checkRow(checkbox[0]);
                        }
                    }
                }

                if (!!t.eventFactory.eventHook.OnClickRow && typeof t.eventFactory.eventHook.OnClickRow == "function")
                {
                    var dataUid = row.data("uid");
                    var dataState = row.hasClass("k-state-selected");
                    var dataRow = {};
                    var dataAll = t.dataFactory.getItem();
                    for(var i = 0; i < dataAll.length; i++)
                    {
                        if (dataUid == dataAll[i].uid)
                            dataRow = dataAll[i];
                    }
                    t.eventFactory.eventHook.OnClickRow(dataRow, dataState);
                }
                event.stopPropagation();
            });

            $(document).on("click", "#" + name + " #grid-check-all", function (event) {
                if (t.gridInfo.gridInlineMode == "")
                    t.checkboxFactory.checkAll(this);
                else
                    event.preventDefault();
                event.stopPropagation();
            });

            $(document).on("click", "#" + t.gridInfo.gridName + " .k-grid-content td:first-child input[type='checkbox']", function (event) {
                if (t.gridInfo.gridInlineMode == "") {
                    t.checkboxFactory.checkRow(this);
                    if (!!t.eventFactory.eventHook.OnClickRow && typeof t.eventFactory.eventHook.OnClickRow == "function" && $(this).parents(".picker-modal").length > 0) {
                        var row = $(this).parents("tr");
                        var dataUid = row.data("uid");
                        var dataState = row.hasClass("k-state-selected");
                        var dataRow = {};
                        var dataAll = t.dataFactory.getItem();
                        for (var i = 0; i < dataAll.length; i++) {
                            if (dataUid == dataAll[i].uid)
                                dataRow = dataAll[i];
                        }
                        t.eventFactory.eventHook.OnClickRow(dataRow, dataState);
                    }
                }
                else {
                    t.gridInfo.gridID.find(".k-state-selected").removeClass("k-state-selected");
                    t.gridInfo.gridID.find(".k-grid-edit-row").addClass("k-state-selected");
                    event.preventDefault();
                }
                event.stopPropagation();
            });

            $("#" + t.gridInfo.gridName).data("kendoGrid").bind("dataBound", function (e) { 
                var allItem = t.dataFactory.getItem();
                if (itemselected.length > 0) { 
                    for (var i = 0; i < itemselected.length; i++) { 
                        var thisItem = $.grep(allItem, function (n, m) {
                            return n[t.gridInfo.gridDatasource.reader.model.idField] == itemselected[i][t.gridInfo.gridDatasource.reader.model.idField];
                        }); 
                        if (thisItem.length > 0) {
                            var checkbox = $("#" + t.gridInfo.gridName).find("input.grid-check-item[value=" + thisItem[0][t.gridInfo.gridDatasource.reader.model.idField] + "]");
                            if (checkbox.length > 0) { 
                                checkbox[0].checked = true;
                                t.checkboxFactory.checkRow(checkbox[0],true);
                            }
                        }
                    }
                }
            });
        });
    };
    t.init = function (name, fieldno, systemname, selected, form, validation,dupplicate) {
        t = this;
        if (window[name] == null || window[name] == undefined)
        {
            t.eventListener();
            t.gridInfo.gridProp = form;
            t.gridInfo.gridValidate = validation;
            t.gridInfo.gridSelected = selected;
            t.gridInfo.gridFieldNo = fieldno;
            t.gridInfo.gridSystemName = systemname;
            t.gridInfo.gridName = name;
            t.gridInfo.gridFieldDuplicate = dupplicate;
        }
        else
        {
            t.init(); //เพิ่มให้รองรับใน Safari
            console.log("grid has register in website. please check paste function in view!!");
        }
    };
    t.init(name, fieldno, systemname, selected, form, firstload, validation);
}

function getGridSearchFilter(gridname) {
    var model = null
    if (!!gridname)
    {
        var wrapper = $(".searchgrid-wrapper[data-grid=" + gridname + "]");
        if (wrapper.length > 0)
        {
            var data = wrapper.find("input:checkbox:checked");
            var str = "";
            for (var i = 0; i < data.length; i++)
            {
                str += $(data[i]).data("name") + ",";
            }
            if (str != "")
            {
                str = str.substring(0, str.length - 1);
            }
            model = {
                searchText: wrapper.find(".searchgrid").val(),
                filterStr: str
            }
        }
    }
    return model;
}
$(function () {
    $(".grid-filter").click(function (e) {
        e.preventDefault();
        if ($(".filter-list.filter-open").is(":visible")) {
            $(".grid-filter-backdrop").remove();

            $(this).closest(".grid-filter-wrapper").find(".filter-list").toggle(100);
        } else {

            $(this).closest(".grid-filter-wrapper").find(".filter-list").toggle(100, function (e) {
                $("body").append("<div class=\"grid-filter-backdrop\"></div>");
                $(this).addClass("filter-open");
            });
        }
    })

    $(document).on("click", ".grid-filter-backdrop", function (e) {
        e.preventDefault();
        $(".filter-open").toggle(100);
        $(this).remove();
    });
    $("#ddlFilterEnum,#ddlFilterDuration,#ddlFilterExpireDuration,#ddlFilterStatus,#ddlFilterVatType,#ddlFilterVatGroup,#ddlFilterStartDate,#ddlFilterEndDate,#ddlFilterGoodsType,#ddlFilterDurationBill,#ddlFilterDurationPre").select2();
    $(".ddlFilterCreatedBy,.ddlFilterApproveStatus,.filter-dropdown,#ddlFilterRating,#ddlFilterOppStage,.ddlFilterDatetimeCustom,.ddlFilterDropdownCustom").select2({
        minimumResultsForSearch: -1
    });
    $(document).on('change', "#ddlFilterDuration", function () {
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            var countParent = $(this).parents(".modal").find("#duration-datepicker").length;
            if (countParent > 0) {
                $(this).parents(".modal").find("#duration-datepicker").removeClass("hide");
            } else {
                $("#duration-datepicker").removeClass("hide");
            }
        } else {
            var countParent = $(this).parents(".modal").find("#duration-datepicker").length;
            if (countParent > 0) {
                $(this).parents(".modal").find("#duration-datepicker").addClass("hide");
            } else {
                $("#duration-datepicker").addClass("hide");
            }
        }
    })
    $(document).on('change', "#ddlFilterExpireDuration", function () {
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            var countParent = $(this).parents(".modal").find("#expireduration-datepicker").length;
            if (countParent > 0) {
                $(this).parents(".modal").find("#expireduration-datepicker").removeClass("hide");
            } else {
                $("#expireduration-datepicker").removeClass("hide");
            }
        } else {
            var countParent = $(this).parents(".modal").find("#expireduration-datepicker").length;
            if (countParent > 0) {
                $(this).parents(".modal").find("#expireduration-datepicker").addClass("hide");
            } else {
                $("#expireduration-datepicker").addClass("hide");
            }            
        }
    })
    $("#ddlFilterStartDate").change(function () {
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            $("#startdate-datepicker").removeClass("hide");
        } else {
            $("#startdate-datepicker").addClass("hide");
        }
    })
    $("#ddlFilterEndDate").change(function () {
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            $("#enddate-datepicker").removeClass("hide");
        } else {
            $("#enddate-datepicker").addClass("hide");
        }
    })
    $("#ddlFilterDurationBill").change(function () {
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            $("#durationbill-datepicker").removeClass("hide");
        } else {
            $("#durationbill-datepicker").addClass("hide");
        }
    })
    $("#ddlFilterDurationPre").change(function () {
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            $("#durationpre-datepicker").removeClass("hide");
        } else {
            $("#durationpre-datepicker").addClass("hide");
        }
    })
    $(".ddlFilterDatetimeCustom").change(function () { 
        var wrapper = $(this).closest(".datetime-custom");
        var FilterDuration = $(this).val();
        if (FilterDuration == "5") {
            wrapper.find(".date-custom-datepicker").removeClass("hide");
        } else {
            wrapper.find(".date-custom-datepicker").addClass("hide");
        }
    })
    
    $('#startdate,#enddate').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
    $('#startdateexpire,#enddateexpire').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
    $('#startdateST,#enddateST').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
    $('#startdateED,#enddateED').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
    $('#startdatebill,#enddatebill').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
    $('#startdatepre,#enddatepre').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });
})
function filterGridCheckAll(t) {
    if (t != null)
    {
        if ($(t).is(":checked") == true)
        {
            $(t).closest(".filter-list-detail").find("input[type=checkbox]:not(.checkall)").each(function () {
                $(this).prop("checked", true)
            })
        } else {
            $(t).closest(".filter-list-detail").find("input[type=checkbox]:not(.checkall)").each(function () {
                $(this).prop("checked", false)
            })
        }
    }
}
function filterGridChildCheck(t) {
    if (t != null) {
        if ($(t).is(":checked") == true)
        {
            var child = $(".filter-list-detail").find("input[type=checkbox]:not(.checkall)").length
            var childChecked = $(".filter-list-detail").find("input[type=checkbox]:not(.checkall):checked").length
            if (child == childChecked) {
                $(t).closest(".filter-list-detail").find("input[type=checkbox].checkall").prop("checked", true);
            }
        } else {
            var checkAll = $(t).closest(".filter-list-detail").find("input[type=checkbox].checkall");
            if (checkAll.is(":checked")) {
                checkAll.prop("checked", false);
            }
        }
    }
}

function Padder(len, pad) {
    if (len === undefined) {
        len = 1;
    } else if (pad === undefined) {
        pad = '0';
    }

    var pads = '';
    while (pads.length < len) {
        pads += pad;
    }

    this.pad = function (what) {
        if (what != undefined) {
            var s = what.toString();
            return pads.substring(0, pads.length - s.length) + s;
        }
    };
}
function SetActivityStartTimeEndTime(Time) {
    var padder = new Padder(2, "0");
    var result = "00:00";
    var txtTime = "";

    if (Time != null) {
        txtTime = padder.pad(Time.Hours) + ":" + padder.pad(Time.Minutes);
    }

    result = txtTime

    return result;
}