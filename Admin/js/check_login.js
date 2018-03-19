firebase.auth().onAuthStateChanged(function(user) {

    //console.log(user);
  if (user) {
    // User is signed in
    	if(user.uid != 'mdgcUAHAg7akC4f797sbYsrLpbZ2'){
    		window.location = "sign-in.php";
    	}
  } else {
    window.location = "sign-in.php";
  }
});

window.onbeforeunload = function() {
		var date = new Date();
	 window.localStorage.setItem("time",date.getMinutes());
}


var i = window.localStorage.getItem("firebase:authUser:AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw:[DEFAULT]");
var jsonObj = JSON.parse(i); 
/*
function logout() {
console.log("log"+jsonObj.uid);
		if(jsonObj.uid == 'mdgcUAHAg7akC4f797sbYsrLpbZ2'){

	    		    firebase.auth().signOut().then(function() {
	            		window.location = "sign-in.php";
	        		}, function(error) {
	            // An error happened.
	        		}); 
		}
}*/
//setTimeout(logout, 10000);

 // Set timeout variables.
/*var timoutWarning = 840000; // Display warning in 14 Mins.
var timoutNow = 900000; // Timeout in 15 mins.


var warningTimer;
var timeoutTimer;

// Start timers.
function StartTimers() {
//    warningTimer = setTimeout("IdleWarning()", timoutWarning);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
}

// Reset timers.
function ResetTimers() {
//    clearTimeout(warningTimer);
    clearTimeout(timeoutTimer);
    StartTimers();
   // $("#timeout").dialog('close');
}

// Show idle timeout warning dialog.
function IdleWarning() {
    $("#timeout").dialog({
        modal: true
    });
}

// Logout the user.
function IdleTimeout() {
	firebase.auth().signOut().then(function() {
	    window.location = "sign-in.php";
	}, function(error) {
	    // An error happened.
	});
}*/


function idleTimer() {
	var i = window.localStorage.getItem("firebase:authUser:AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw:[DEFAULT]");
	var jsonObj = JSON.parse(i);  
	console.log(jsonObj.uid);
    var t;
    window.onload = load;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer;     // catches mouse clicks
    window.onscroll = resetTimer;    // catches scrolling
    window.onkeypress = resetTimer;  //catches keyboard actions
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
        resetTimer;
     }, false);
    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
        resetTimer;
     }, false);
    document.addEventListener('touchend', function(e) {
        e.preventDefault();
        resetTimer;
     }, false);
     document.addEventListener('touchcancel', function(e) {
        e.preventDefault();
        resetTimer;
     }, false);
    
    if(jsonObj.uid == 'mdgcUAHAg7akC4f797sbYsrLpbZ2'){

			    function logout() {
	    		    firebase.auth().signOut().then(function() {
	            		window.location = "sign-in.php";
	        		}, function(error) {
	            // An error happened.
	        		}); 
	    		}
    }
    	/*Code for checking lats logout time and login time difference */
    function load(){
    	if(window.localStorage.getItem('time') != null){

    	var pmin = window.localStorage.getItem('time');
    }else{
    	var pmin = 0
    }
    	var currentdate = new Date();
    	var min = currentdate.getMinutes();
    	var diff = min - pmin;
    	//alert(diff);
    	if(diff >= 15){
    		alert("Your session is expired, please login again!!");
    		logout();

    			localStorage.removeItem("time");
    	}

    }

   function reload() {
          window.location = self.location.href;  //Reloads the current page
   }

   function resetTimer() {
        clearTimeout(t);
        t = setTimeout(logout, 900000);  // time is in milliseconds (1000 is 1 second)
      //  t = setTimeout(reload, 30000);  // time is in milliseconds (1000 is 1 second)
    }
}
idleTimer();
