firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
  if (user) {
    // User is signed in
    	/*if(user.uid != 'mdgcUAHAg7akC4f797sbYsrLpbZ2'){
    		window.location = "sign-in.php";
    	}*/
  } else {
    window.location = "sign-in.php";
  }
});



