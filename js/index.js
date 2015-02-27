var myMedia = null;
var playing = false;
var playingRecord = false;

function onLoad() {
   document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	comeHome();
}

function comeHome() {

	var compileDT = $.now()
	document.getElementById("verionNo").innerHTML = compileDT;

	var page_url = "http://rwex.com.hk/toLJY-server/cfc/acSP4U_proxy.cfm?method=sp4u_ljy_text1&wording=hello";	
	
	$.getJSON(page_url,function(Ures) {
		document.getElementById("jsData").innerHTML = Ures.PAGENAME + " : " + Ures.PAGEFILE;
		document.getElementById("jsContent").innerHTML = '<object type="text/html" data="' + Ures.PAGEFILE + '" ></object>'
	})
	.fail(function() {
		alert( "UD connection error" );
	});		
}

function playAudio() {
	if (!playing) {
		myMedia.play();	
		document.getElementById('play').src = "images/pause.png";
		playing = true;	
	} else {
		myMedia.pause();
		document.getElementById('play').src = "images/play.png";    
		playing = false; 
	}
}

function stopAudio() {
	myMedia.stop();
	playing = false;
	document.getElementById('play').src = "images/play.png";    
	document.getElementById('audio_position').innerHTML = "0.000 sec";
}

function updateMedia(src) {
	// Clean up old file
	if (myMedia != null) {
		myMedia.release();
	}
	
	// Get the new media file
	var yourSelect = document.getElementById('playlist');		
			myMedia = new Media(getMediaURL(yourSelect.options[yourSelect.selectedIndex].value), stopAudio, null);

	// Update media position every second
		var mediaTimer = setInterval(function() {
		// get media position
		myMedia.getCurrentPosition(
			// success callback
			function(position) {
				if (position > -1) {
					document.getElementById('audio_position').innerHTML = position + " sec";
				}
			},
			// error callback
			function(e) {
				console.log("Error getting pos=" + e);
			}
		);
	}, 1000);
	playAudio();
}

function getMediaURL(s) {
    if((device.platform.toLowerCase() === "android") && (s.slice(0,6) === "sounds")) return "/android_asset/www/" + s;
    return s;
}

function setAudioPosition(position) {
   document.getElementById('audio_position').innerHTML = position;
}
