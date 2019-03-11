
$(function () {

    $("#AddressSTD").each(function () {
        var name = $(this).data("name");
        if (name != undefined && name != null) {
            window["Map" + name] = new GoogleMapApi($(this));
        }
    })

    //ป.ล.
    //ในการเรียกฟังก์ชันการแสดง GoogleMap จะไม่เรียกจาก Event Click เนื่องจากซ้ำซ้อนกับการ ValidateRequire
    //เปลี่ยนมาใช้การแสดง GoogleMap หลังจากที่ Tab-Pane นั้นแสดงเสร็จแล้ว
    $(document).on('shown.bs.tab', function (e) {
        e.preventDefault();
        var ObjAddr = $(e.target).data("tab-target");
        var Obj = $(ObjAddr).find("#AddressSTD");
        if (Obj.length > 0) {
            var Name = Obj.data("name");

            setTimeout(function () {
                window["Map" + Name].CallGoogleAPI();
            }, 200);

        }
    });
})

function GoogleMapApi(Obj) {
    var t = this;
    t.map = null;
    t.marker = null;
    t.wrapperID = null;
    t.wrapperObj = null;
    t.latilong = null;
    t.mapLati = 13.870264; // ตำแหน่งของ กทม
    t.mapLong = 100.4440562;// ตำแหน่งของ กทม


    t.ShowGoogleMapHidden = function () {
        //กรณีกด click tab Address จะเรียก hidden googlemap ออกมาโชว์
        //ไม่ต้อง set new google map ใช้ตัวเดิมที่ set ใน t.CallGoogleAPI
        google.maps.event.trigger(t.map, 'resize');
    }
    t.CallGoogleAPI = function () {
        try {

            var MapLati = t.wrapperObj.find(".MapLati").val();
            var MapLong = t.wrapperObj.find(".MapLong").val();

            if (MapLati != "" && MapLong != "") {
                t.latilong = new google.maps.LatLng(MapLati, MapLong);
            } else {
                t.latilong = new google.maps.LatLng(13.870264, 100.4440562);
            }

            var myOptions = {
                zoom: 5,
                center: t.latilong,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var objCanvas = document.querySelectorAll("#" + t.wrapperID + " .map_canvas");
            var title = "";
            switch (t.wrapperID) {
                case "AddressCon":
                    title = "My Contact Address";
                    break;
                case "AddressBill":
                    title = "My Bill Address";
                    break;
                case "AddressShip":
                    title = "My Ship Address";
                    break;
                default:
                    title = "My Address";
                    break;

            }
            if (objCanvas.length > 0) {
                var Canvas = objCanvas[0];
                var CanvasJquery = t.wrapperObj.find(".map_canvas");
                var Zoom = t.map != null ? t.map.zoom : 17;
                t.map = new google.maps.Map(Canvas, myOptions);
                var CanDragable = CanvasJquery.data("pagetype") == "normal" ? true : false;
                if (checkPageType() == "detail") {
                    CanDragable = false;
                }
                t.marker = new google.maps.Marker({
                    position: t.latilong,
                    map: t.map,
                    draggable: CanDragable,
                    title: title
                });
                t.marker.setMap(t.map);
                t.Drageable();
                t.map.setZoom(Zoom);
            }
        } catch (e) {

        }
    }
    t.Initial = function (wrapper) {
        //การสร้าง Googlemap ครั้งแรก
        //จะเรียก API มาทันทีหลัง Document Ready
        if (wrapper != null && wrapper != undefined) {
            //wrapper คือ .div-address-std แต่ละอัน
            t.wrapperObj = wrapper;
            t.wrapperID = wrapper.attr("id");
            t.CallGoogleAPI();
        }
    }
    t.Drageable = function () {
        google.maps.event.addListener(t.marker, 'dragend', function (event) {
            t.wrapperObj.find(".MapLati").val(this.position.lat());
            t.wrapperObj.find(".MapLong").val(this.position.lng());
        });
    }
    t.GeoCode = function () {
        var address = t.wrapperObj.find(".txtsearchlocation").val();
        if (address != "") {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    t.marker.setMap(null);

                    t.map.setCenter(results[0].geometry.location);
                    var myOptions = {
                        zoom: 12,
                        center: results[0].geometry.location,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var objCanvas = document.querySelectorAll("#" + t.wrapperID + " .map_canvas");
                    var title = "";
                    switch (t.wrapperID) {
                        case "AddressCon":
                            title = "My Contact Address";
                            break;
                        case "AddressBill":
                            title = "My Bill Address";
                            break;
                        case "AddressShip":
                            title = "My Ship Address";
                            break;
                        default:
                            title = "My Address";
                            break;

                    }
                    if (objCanvas.length > 0) {
                        var Canvas = objCanvas[0];
                        var CanvasJquery = t.wrapperObj.find(".map_canvas");
                        var Zoom = t.map != null ? t.map.zoom : 5;
                        t.map = new google.maps.Map(Canvas, myOptions);
                        var CanDragable = CanvasJquery.data("pagetype") == "normal" ? true : false;
                        t.marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: t.map,
                            draggable: CanDragable,
                            title: title
                        });
                        t.marker.setMap(t.map);
                        t.Drageable();
                    }

                    t.wrapperObj.find(".MapLati").val(results[0].geometry.location.lat());
                    t.wrapperObj.find(".MapLong").val(results[0].geometry.location.lng());

                }
            });
        }
    }

    //Init
    t.Initial(Obj);
}

$('.MapLati').keyup(function (e) {
    if (e.keyCode == 13) {
        var wrapper = $(this).closest("#AddressSTD");
        var wrapperName = wrapper.data("name");
        window["Map" + wrapperName].CallGoogleAPI();
    }
});
$('.MapLati').change(function (e) {
    var wrapper = $(this).closest("#AddressSTD");
    var wrapperName = wrapper.data("name");
    window["Map" + wrapperName].CallGoogleAPI();
});

$('.MapLong').keyup(function (e) {
    if (e.keyCode == 13) {
        var wrapper = $(this).closest("#AddressSTD");
        var wrapperName = wrapper.data("name");
        window["Map" + wrapperName].CallGoogleAPI();
    }
});
$('.MapLong').change(function (e) {
    var wrapper = $(this).closest("#AddressSTD");
    var wrapperName = wrapper.data("name");
    window["Map" + wrapperName].CallGoogleAPI();
});
$('#cancellocation').click(function () {
    document.getElementById("MapLati").value = "";
    document.getElementById("MapLong").value = "";
    document.getElementById("address").value = "";
})
$('.btn_searchinbox').click(function (e) {
    var wrapper = $(this).closest("#AddressSTD");
    var wrapperName = wrapper.data("name");
    window["Map" + wrapperName].GeoCode();
})
$('.txtsearchlocation').change(function (e) {
    var wrapper = $(this).closest("#AddressSTD");
    var wrapperName = wrapper.data("name");
    window["Map" + wrapperName].GeoCode();
});
$('.txtsearchlocation').keyup(function (e) {
    if (e.keyCode == 13) {
        var wrapper = $(this).closest("#AddressSTD");
        var wrapperName = wrapper.data("name");
        window["Map" + wrapperName].GeoCode();
    }
});


function toggleAddressMap(t) {
    if (t != null && t != undefined) {
        var wrapper = $(t).closest("#AddressSTD");
        var map = wrapper.find(".searchMap");
        var togglemap = wrapper.find(".map_toggle");
        if (map.hasClass("hide")) {
            map.removeClass("hide");
            togglemap.addClass("hide");

            var wrapperName = wrapper.data("name");
            window["Map" + wrapperName].CallGoogleAPI();
        } else {
            map.addClass("hide");
            togglemap.removeClass("hide");
        }
    }
}