///////---------------Search location

//declare namespace
var pluginMap = {};
//declare map
var map;
var marker;
var lat;
var lng;
//declare Geocoder
var geocoder = new google.maps.Geocoder();
$('#ActivityMap').on('shown.bs.modal', function () {
    CallGoogleMapApiActivity();
});

function trace(message) {
    if (typeofconsole != 'undefined') {
         //console.log(message);
    }
}
function CallGoogleMapApiActivity() {
    pluginMap.initialize();
}

//Function that gets run when the document loads
pluginMap.initialize = function () {
    var latlng = new google.maps.LatLng(13.870264, 100.4440562);
    var myOptions = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    /////////--------------------------dragable Marker
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: true,
        title: "My Address"
    });
    marker.setMap(map);

    ///////////-------------dragable and get lat lng
    //dragable();
}

//geocode function  Search function

////pluginMap.geocode = function () {

//    var address = $('#address').val();
//    geocoder.geocode({ 'address': address }, function (results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {

//            ///////////----------Remove Old Marker
//            marker.setMap(null);

//            ///////////--------- Get Location
//            map.setCenter(results[0].geometry.location);
//            var myOptions = {
//                zoom: 12,
//                center: results[0].geometry.location,
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            };
//            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
//            ////////--------------Create New Marker
//            marker = new google.maps.Marker({
//                map: map,
//                position: results[0].geometry.location,
//                draggable: true,
//                title: "My Address"
//            });
//            ////////////---------------Set lat lng to MapLati MapLong
//            document.getElementById("MapLati").value = results[0].geometry.location.lat();
//            document.getElementById("MapLong").value = results[0].geometry.location.lng();

//        }
//        else {
//            alert("Not found Your location.");
//        }
//        ///////////-------------dragable and get lat lng
//        dragable();
//    });


//}

////////////////---------------------search location by lat lng
pluginMap.ActivityMapsearchBylatlng = function (lat,long,title) {
   
    var latlng = new google.maps.LatLng(lat, long);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    /////////--------------------------dragable Marker
    marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: false,
        title: title
    });
    marker.setMap(map);

    ///////////-------------dragable and get lat lng
    //dragable();
}


/////////-------------dragable and show lat lng   Get lat lng after Move Marker
//function dragable() {
//    google.maps.event.addListener(marker, 'dragend', function (event) {
//        document.getElementById("MapLati").value = this.getPosition().lat();
//        document.getElementById("MapLong").value = this.getPosition().lng();
//    });
//}

////////////--------------- load map after fade modal
//$('#GoogleMapModal').on('shown.bs.modal', function (e) {
   
//    if ($('#MapLati').val() == "" && $('#MapLong').val()=="") {
//        //pluginMap.initialize();
//    }
//    else {
//        //pluginMap.searchBylatlng();
//    }
//})



////////////------------------ Click Search
$('.btn_searchinbox').click(function (e) {
    pluginMap.geocode();
})

////////////------------------ Enter Key Search
$('.txtsearchlocation').bind("enterKey", function (e) {
    pluginMap.geocode();
});
$('.txtsearchlocation').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});

////////////------------------ Enter Key lat lng

$('.txtlatlng').bind("enterKey", function (e) {
    pluginMap.searchBylatlng();
});
$('.txtlatlng').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});
////////////------------------ Out of focus
$('.txtsearchlocation').focusout(function (e) {
    pluginMap.geocode();
});
$('.txtlatlng').focusout(function (e) {
    pluginMap.searchBylatlng();
});


$('#cancellocation').click(function () {
    document.getElementById("MapLati").value = "";
    document.getElementById("MapLong").value = "";
    document.getElementById("address").value = "";
})

$(".btn-close-activitymap").click(function () {
    $("#ActivityMap").modal("hide")
})