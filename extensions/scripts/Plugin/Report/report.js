function reportViewer(name, request, download, sendmail, mode)
{
    var t = this;
    var _default = {
        reportName: "",
        reportRequesViewer: "",
        reportRequestDownload: "",
        reportRequestSendMail: "",
        reportUseMode: {
            previewMode: false,
            printMode: false
        },
        reportFrame: null,
        reportModal: null,
        reportModalSend: "modalSendMail"
    };
    var init = function (name, request, download, sendmail, mode) {
        _default.reportName = "report" + name;
        _default.reportRequesViewer = request;
        _default.reportRequestDownload = download;
        _default.reportRequestSendMail = sendmail;
        _default.reportUseMode.previewMode = (mode == "preview");
        _default.reportUseMode.printMode = (mode == "print");
        _default.reportFrame = "#frame" + name;
        _default.reportModal = "#modal" + name;
        _default.reportModalSend = "#modalSendMail";  
        $(function () {
            $("#form-sendmail").validate({
                rules: {
                    sendto: {
                        email: true,
                        required: true
                    },
                    sendcc: {
                        email: true
                    },
                    sendbcc: {
                        email: true
                    },
                    sendtopic: {
                        required: true
                    }
                },
                messages: {
                    sendto: {
                        email: "รูปแบบอีเมล์ไม่ถูกต้อง",
                        required: "กรุณากรอกอีเมล์"
                    },
                    sendcc: {
                        email: "รูปแบบอีเมล์ไม่ถูกต้อง"
                    },
                    sendbcc: {
                        email: "รูปแบบอีเมล์ไม่ถูกต้อง"
                    },
                    sendtopic: {
                        required: "กรุณากรอกชื่อเรื่อง"
                    }
                }
            });
            $("#sendmaildetail").kendoEditor();
            $(".btn-sendmail").on("click", function () {
                if ($("#form-sendmail").valid())
                    t.sendEmailRequest();
            });
        });
    };
    t.openModal = function () {
        $(_default.reportFrame).attr("src", "");
        t.waitViewerRender();
        t.refreshViewer();
        $(_default.reportModal).modal("show");
        t.executeCallBack(t.stopViewerRender());
        $('#sendto').removeAttr('disabled');
        $('#sendcc').removeAttr('disabled');
        $('#sendbcc').removeAttr('disabled');
        $('#sendtopic').removeAttr('disabled');
    };
    t.closeModal = function () {
        $(_default.reportModal).modal("hide");
    };
    t.refreshViewer = function () {
        $(_default.reportFrame).attr("src", _default.reportRequesViewer);
    };
    t.clearSendMail = function () {
        $("#sendto").val("");
        $("#sendcc").val("");
        $("#sendbcc").val("");
        $("#sendtopic").val("");
        $("#sendmaildetail").data("kendoEditor").value("");
        $("#text-file-attach").html("");
    };
    t.setSendMail = function () {
        var to = $("#hidto").val();
        var cc = $("#hidcc").val();
        var bcc = $("#hidbcc").val();
        var topic = $("#hidtopic").val();
        var file = $("#hidfile").val() + ".pdf";
        $("#sendto").val(to);
        $("#sendcc").val(cc);
        $("#sendbcc").val(bcc);
        $("#sendtopic").val(topic);
        $("#text-file-attach").html(file);
    };
    t.sendEmailRequest = function (callback) {
        openloading(true);
        $.ajax({
            url: _default.reportRequestSendMail,
            data: JSON.stringify({
                model: {
                    to: $("#sendto").val(),
                    cc: $("#sendcc").val(),
                    bcc: $("#sendbcc").val(),
                    topic: $("#sendtopic").val(),
                    detail: $("#sendmaildetail").data("kendoEditor").value(),
                    filename: $("#text-file-attach").text()
                }
            }),
            type: "post",
            contentType: "application/json",
            success: function (e) {
                openloading(false);
                if (e.IsResult) {
                    PostMsgSuccess("ส่งอีเมล์สำเร็จ");
                    $(".btn-sendmail-close").click();
                }
                else {
                    PostMsgError("ส่งอีเมล์ไม่สำเร็จ");
                }
            },
            error: function () {
                openloading(false);
                PostMsgError("ส่งอีเมล์ไม่สำเร็จ");
            }
        });
        t.executeCallBack(callback);
    };
    t.sendEmail = function (callback) {
        t.clearSendMail();
        t.setSendMail();
        $(_default.reportModalSend).modal("show");
        t.executeCallBack(callback);
    };
    t.printReport = function (callback) {
        $(_default.reportFrame)[0].contentWindow.printReport();
        t.executeCallBack(callback);
    };
    t.downloadReport = function () {
        var windowDownload = window.open("about:blank");
        windowDownload.location = _default.reportRequestDownload;
    }
    t.waitViewerRender = function (callback) {
        openloading(true);
        t.executeCallBack(callback);
    };
    t.stopViewerRender = function (callback) {
        openloading(false);
        t.executeCallBack(callback);
    };
    t.executeCallBack = function (callback) {
        if (!!callback && typeof callback == "function")
            callback();
    };
    init(name, request, download, sendmail, mode);
}