


function signin_admin() {
	document.getElementById("Button").disabled = true;
	document.getElementById("error").innerHTML = '';
// firebase.auth().onAuthStateChanged(function(user) {
//           if (user) {
//         var email=document.getElementById('email').value;
//              var password=document.getElementById('password').value;
//                  alert("Login Successfully");
//           }
//           else{
//              alert("User does not exist");
//           }
//       });
     
      var email=document.getElementById('email').value;
      var password=document.getElementById('password').value;
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(SuperAdmin){

	  if(SuperAdmin)
      {
             var ref = firebase.database().ref('Super Admin');
            ref.once('value').then( function(dataSnapshot) {
        
              var data = dataSnapshot.val();
              // this.props.navigation.navigate('Tutorial');
              if (data.email == email) {
            console.log(email);
				      window.location = "index.php";
				// window.location = "welcome_process.php?u_mail="+user.email;
              } else {
                document.getElementById("error").innerHTML = "Invalid email or password.";
				document.getElementById("Button").disabled = false;
              }
            });
      }
    },function(error) {
		document.getElementById("Button").disabled = false;
		document.getElementById("error").innerHTML = error.message;
			/*  document.getElementById("p3").innerHTML = "";
			  document.getElementById("p3").innerHTML = "";
              document.getElementById("p1").innerHTML = error.message;  */
      });
}
