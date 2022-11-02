// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBhXJr5eCkwhUUWGi7t1Hpi8Uo8PRHkH64&libraries=geometry,marker&callback=initMap';
script.async = true;

window.initMap = function() {

  navigator.geolocation.getCurrentPosition(function(mypos){
    var myloclat = mypos.coords.latitude;
    var myloclng = mypos.coords.longitude;
    //console.log("in get pos:" + myloclat);
    //console.log("in get pos:" + myloclng);
    //console.log(mypos);
    getcars(myloclat, myloclng);
  });
  
  //testing
  //myloclat = 50.08831;
  //myloclng = -72.8979088;
  
  function getcars(myloclat, myloclng){
  
  var location1 = new google.maps.LatLng(myloclat, myloclng);
  //var location1 = { lat: myloclat, lng: myloclng};

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState ==4 && xhr.status == 200) {
      strcars = xhr.responseText;
      carsjson = JSON.parse(strcars); 
      //console.log(carsjson);
      
      var infowindow = new google.maps.InfoWindow({});
      var cars=[];
      var dist = 0.0;
      var closestdis = 0.0;
      var closecar = ""
      var closelat = 0.0
      var closelng = 0.0
      var count = 0;
      for(i=0; i<carsjson.length; i++){
        idString = carsjson[i];
        //console.log(idString);
        //console.log(idString.lat);
        //console.log(idString.lng);
        var location2 = new google.maps.LatLng(idString.lat, idString.lng);
        //console.log(location1);
        //console.log(location2);
        //var location2 = { lat: idString.lat, lng: idString.lng};
        //console.log(google.maps.geometry);
        dist = google.maps.geometry.spherical.computeDistanceBetween(location1, location2);
        dist = dist * 0.000621371;
        if (closestdis == 0.0) {
          closestdis = dist;
        } else {
          if (dist < closestdis) {
            closestdis = dist;  
            closecar = idString.username;
            closelat = idString.lat;
            closelng = idString.lng;
          }
        }
        cars[i] = [idString.username, idString.lat, idString.lng, dist, "car.png"];
        count = i;
      };
      var strmyuser = "My Location is at latitude of: " + myloclat + " and longitude of " + myloclng + ". The closest vehicle is " + closecar + " and is " + closestdis + " miles from me."

      cars[count+1] = [strmyuser, myloclat, myloclng, 0.0, ""];
      
      var centerloc = {lat: myloclat, lng: myloclng};

      var  map = new google.maps.Map(document.getElementById('map'), {
          center: centerloc,
          zoom: 13
        });
      
      let marker;
      for(i=0; i<cars.length; i++){
        //console.log("title: " + cars[i][0]);

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(cars[i][1], cars[i][2]),
          map: map,
          title: cars[i][0],
            icon: cars[i][4]
        });
    
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(cars[i][0] + " is " + cars[i][3] + " miles away from me.");
            infowindow.open(map, marker);
          }
        })(marker, i));
      };

      google.maps.event.addListener(marker, 'click', function () {
        const polylinecoords = [
          { lat: myloclat, lng: myloclng},
          { lat: closelat, lng: closelng }
        ];
        const polypath = new google.maps.Polyline({
          path: polylinecoords,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        polypath.setMap(map);
      });
    };

  };
  xhr.open("POST", "https://jordan-marsh.herokuapp.com/rides", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var struser = "username=pPHjoZLM&lat=" + myloclat + "&lng=" + myloclng;
  //console.log(struser);
  xhr.send(struser); 
 
  }; 
};

// Append the 'script' element to 'head'
document.head.appendChild(script);