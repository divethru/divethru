function sign_out()
{
  firebase.auth().signOut().then(function() {
    window.location = "sign-in.php";
  }, function(error) {
    // An error happened.
  });
}


