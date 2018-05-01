function sign_out()
{
	
	window.localStorage.removeItem('user');
	
  firebase.auth().signOut().then(function() {
  	window.setTimeout(function() {
    	window.location = "login.php";
    },500);
  }, function(error) {
    // An error happened.
  });
}