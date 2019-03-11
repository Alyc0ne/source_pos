var $divaddr = null;
var $MapLati = null;
var $MapLong = null;
var $Canvas = null;
var $moduleCanvas = null;
var $FullMapLati = null;
var $FullMapLong = null;
var $FullTextboxSearch = null;
var $TextboxSearch = null;

function SetMapInfo(_elementMapcurrent) {
    // ฟังก์ชันการ set ค่าให้กับตัวแปรที่ใช้ใน Map
    $divaddr = $(_elementMapcurrent).closest("#ContactInfo");
    $MapLati = $($divaddr.find(".MapLati").not($(".FullMapLati")));
    $MapLong = $($divaddr.find(".MapLong").not($(".FullMapLong")));
    $FullMapLati = $($divaddr.find(".FullMapLati"));
    $FullMapLong = $($divaddr.find(".FullMapLong"));
    $Canvas = $($divaddr.find("#full_map_canvas"))[0];
    $moduleCanvas = $($divaddr.find("#map_canvas"))[0];
    $FullTextboxSearch = $($divaddr.find(".txtSearchFullMap"));
    $TextboxSearch = $($divaddr.find(".txtsearchlocation"));
}

$('.EnlargeMap').on('shown.bs.modal', function () {
    SetMapInfo($(this));
    if ($MapLati.val() != "" && $MapLong.val() != "") {
        pluginMapFull.FullMapsearchBylatlng();
    } else {
        pluginMapFull.FullMapinitialize();
    }
});

//declare namespace
var pluginMapFull = {};
//declare map
var map;
var marker;
var lat;
var lng;
var map2;
var marker2;
var lat2;
var lng2;

//declare Geocoder
//var geocoder = new google.maps.Geocoder();

function trace(message) {
    if (typeof console != 'undefined') {
         //console.log(message);
    }
} 
pluginMapFull.FullMapinitialize = function () {
    
    $FullMapLati.val("");
    $FullMapLong.val("");
    $FullTextboxSearch.val(""); 
    
    var latlng = new google.maps.LatLng(13.870264, 100.4440562);
    var myOptions = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var canvas = $divaddr.find("#full_map_canvas")[0];
    map = new google.maps.Map(canvas, myOptions);
    var CanDragable = $($Canvas).data("pagetype") == "normal" ? true : false;
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: CanDragable,
        title: "My Address"
    });

    marker.setMap(map);  
    FullMapdragable(); 
}
 
pluginMapFull.geocode = function () {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': $FullTextboxSearch.val() }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            marker.setMap(null);

            map.setCenter(results[0].geometry.location);
            var myOptions = {
                zoom: 12,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map($Canvas, myOptions);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
                title: "My Address"
            });


            $FullMapLati.val(results[0].geometry.location.lat());
            $FullMapLong.val(results[0].geometry.location.lng());

        } 
        FullMapdragable();
    }); 
}
pluginMapFull.FullMapsearchBylatlng = function () {

    var latlng = new google.maps.LatLng($MapLati.val(), $MapLong.val());
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($Canvas, myOptions);

    var CanDragable = $($Canvas).data("pagetype") == "normal" ? true : false;

    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: CanDragable,
        title: "My Address"
    });
    marker.setMap(map);
    if (CanDragable) {
        FullMapdragable();
    }

    $FullMapLati.val($MapLati.val());
    $FullMapLong.val($MapLong.val());

}
pluginMapFull.moduleMapsearchBylatlng = function () {

    var latlng = new google.maps.LatLng($FullMapLati.val(), $FullMapLong.val());
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($moduleCanvas, myOptions);

    var CanDragable = $($moduleCanvas).data("pagetype") == "normal" ? true : false;

    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: CanDragable,
        title: "My Address"
    });
    marker.setMap(map); 
    if (CanDragable) {
        moduleMapdragable();
    }
      
    $MapLati.val($FullMapLati.val());
    $MapLong.val($FullMapLong.val());

}
pluginMapFull.FullMapsearchBylatlngModal = function () {

    var latlng = new google.maps.LatLng($FullMapLati.val(), $FullMapLong.val());
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($Canvas, myOptions);
     
    
    var CanDragable = $($Canvas).data("pagetype") == "normal" ? true : false;

    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: CanDragable,
        title: "My Address"
    });
    marker.setMap(map);
     
    FullMapdragable();
}
  
function FullMapdragable() { 
    google.maps.event.addListener(marker, 'dragend', function (event) {
        $FullMapLati.val(this.getPosition().lat())
        $FullMapLong.val(this.getPosition().lng()) 
    });
}
function moduleMapdragable() {
    google.maps.event.addListener(marker, 'dragend', function (event) {
        $MapLati.val(this.getPosition().lat())
        $MapLong.val(this.getPosition().lng())
    });
}
$('.btn_searchinbox_fullmap').click(function (e) { 
    SetMapInfo($(this));
    pluginMapFull.geocode();
})

$('.txtSearchFullMap').bind("enterKey", function (e) {
    SetMapInfo($(this));
    pluginMapFull.geocode();
}); 
$('.txtSearchFullMap').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});

$('.FullMapLong , .FullMapLati').bind("enterKey", function (e) {
    SetMapInfo($(this));
    pluginMapFull.FullMapsearchBylatlngModal();
});
$('.FullMapLong , .FullMapLati').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});
$('.FullMapLong , .FullMapLati').change(function (e) {
    SetMapInfo($(this));
    pluginMapFull.FullMapsearchBylatlngModal();
});

$('#cancellocation').click(function () {
    SetMapInfo($(this));
    $FullMapLati.val("");
    $FullMapLong.val("");
    $FullTextboxSearch.val("");
})

$(".showEnlargeMap").click(function () {
    $divaddr = $(this).closest("#ContactInfo");
     //console.log($divaddr);
     //console.log($divaddr.find(".EnlargeMap"));
    $divaddr.find(".EnlargeMap").modal("show");
})
$(document).on('click',".btn-selectMapModal",function (e) {
    e.preventDefault();
    SetMapInfo($(this));
    $divaddr.find(".EnlargeMap").modal("hide");
    pluginMapFull.moduleMapsearchBylatlng();
    $TextboxSearch.val($FullTextboxSearch.val());
    $FullTextboxSearch.val("");
    return false;
})