
	function onDeviceReadyCam() {
		pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
	}

var watchID = null;
	function ToogleGeo() {
		if (watchID != null) {
			navigator.geolocation.clearWatch(watchID);
			watchID = null;
			changeGeoButtonText("Start Locating position");
		} else {
			watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
				maximumAge : Infinity,
				enableHighAccuracy : true,
				timeout : 30000
			});
			changeGeoButtonText("Stop Locating position");
		}
	}

	function changeGeoButtonText(newText) {
		var button = document.getElementById('GeoButton');
		button.innerHTML = (newText);
	}

	// onSuccess Geolocation      
	function onSuccess(position) {
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />'
				+ 'Longitude: ' + position.coords.longitude + '<br />'
				+ 'Altitude: ' + position.coords.altitude + '<br />'
				+ 'Accuracy: ' + position.coords.accuracy + '<br />'
				+ 'Altitude Accuracy: ' + position.coords.altitudeAccuracy
				+ '<br />' + 'Heading: ' + position.coords.heading + '<br />'
				+ 'Speed: ' + position.coords.speed + '<br />' + 'Timestamp: '
				+ position.timestamp + '<br />';
	}
	// onError Callback receives a PositionError object     
	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	function changeText() {
		label = document.getElementById('label');
		input = document.getElementById('input');
		label.innerHTML = "Hello " + input.value + "!";
	}

	// A button will call this function
	//
	function capturePhoto() {
        destinationType=navigator.camera.DestinationType;
		// Take picture using device camera and retrieve image as base64-encoded string
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 50,
			destinationType : destinationType.DATA_URL
		});
	}

	// Called if something bad happens.
	// 
	function onFail(message) {
		alert('Failed because: ' + message);
	}

	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
	// Called when a photo is successfully retrieved
	//
    function onPhotoDataSuccess(imageData) {
		// Uncomment to view the base64 encoded image data
		// console.log(imageData);

		// Get image handle
		//
		var smallImage = document.getElementById('largeImage');

		// Unhide image elements
		//
		smallImage.style.display = 'block';

		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		smallImage.src = "data:image/jpeg;base64," + imageData;
	}