//for user already login


    var user=window.localStorage.getItem('user');
    if(user!=null)
    {
     // window.location.href = "dashboard.php";
    }


firebase.database().ref("Category").orderByChild("category_id").limitToLast(3).on("value", function(snapshot) {
                 var session = [];
        snapshot.forEach(function(childSnapshot) {
              // key
              var key = childSnapshot.key;
              //alert(key);
              // value, could be object
              var childData = childSnapshot.val();

              var ht = '<div class="row Margins"><p class="MainMenu"><span class="i">'+childSnapshot.key+'</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center">';
              if(childSnapshot.key == '10 Day Intro Program' || childData.session_subcription_type == "Free"){
                session.push(childData.Session);
              }
              
              window.localStorage.setItem('session',JSON.stringify(session));
        });
 });
firebase.auth().onAuthStateChanged(function(user) {
  //alert(user);
           if (user) {
            window.localStorage.setItem('cat','10 Day Intro Program');
         //var email=document.getElementById('email').value;
           //   var password=document.getElementById('password').value;
             //     alert("Login Successfully");
             //window.location.href = "http://34.215.40.163/welcome.php";
             var uid = firebase.auth().currentUser.uid;

             var ref = firebase.database().ref('Users').child(uid);
               ref.once('value').then( function(dataSnapshot) {
                          var data = dataSnapshot.val();
                        console.log(data.activated_on);
                        var date1 = new Date(); 

                    var date2 = new Date(data.lastUpdated_on.substr(0,data.lastUpdated_on.indexOf(' ')));
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                    //alert("a"+diffDays);
                    // Usage gap in days
                     firebase.database().ref('Users').child(uid).child("UsageGap").set(diffDays);   

                    if(data.activated_on != ''){
                          var lout = '<a class="nav-link" id="lg" class="lg" style="rgba(0,0,0,.5) !important" href="#" onclick="sign_out();">LOG OUT<span class="sr-only">(current)</span></a>';
                          $(".log").html(lout);

							$(".nav-link#lg").hover(function(){
								$(this).css("color","#7dd3d5");
							});

							$(".nav-link#lg").mouseout(function(){
								//$(this).css("color","#34495e");
								//alert("out");
							});


                       }

                });
           }
           else{
              //alert("User does not exist");
           }
       });






function login_user() {
  var history = [];    
 $(".cat").html("");
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
  $(".fa-spinner").show();
      var email=document.getElementById('email').value;
      var password=document.getElementById('password').value;
    
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
      if(user)
      {
        $(".fa-spinner").hide();
         
             var uid = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('Users').child(uid);
      console.log(uid);
      var lout = '<a class="nav-link" id="lg" style="padding-right: 1.5rem; padding-left: 1.5rem;" href="#" onclick="sg_out();">LOG OUT<span class="sr-only">(current)</span></a>';
            ref.once('value').then( function(dataSnapshot) {
              var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + ("0"+ currentdate.getHours()).slice(-2)  + ":"  
                    + ("0"+ currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0"+currentdate.getSeconds()).slice(-2);
                  firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
              var data = dataSnapshot.val();
        window.localStorage.setItem('user',JSON.stringify(dataSnapshot));
                                      console.log(data.streak);  
        if(data.streak || data.streak != ""){
                                $.map(data.streak, function(value, index) {
                                      history.push(index);
                         
                                });
                        }


       

               console.log(JSON.stringify(history));
window.localStorage.setItem("SessionHistory",JSON.stringify(history));         

              // this.props.navigation.navigate('Tutorial');
              if (data.activated_on !== '') {
              console.log($(".log").html(lout));
                if(data.visited == "" || data.visited == 0){

                window.location = "welcome.php";
                }else{
                  window.location = "dashboard.php";
                }
              } else {
				        document.getElementById("p2").innerHTML = "";
				        document.getElementById("p3").innerHTML = "";
                document.getElementById("p1").innerHTML = "Please verify your email to proceed further.";
              }

              if(!user.visited)
                {
                  firebase.database().ref('Users').child(uid).child("visited").set(1);
                }else{

                  firebase.database().ref('Users').child(uid).child("visited").set(user.visted+1);
                }

            });



      }
    },function(error) {
			  document.getElementById("p3").innerHTML = "";
			  document.getElementById("p3").innerHTML = "";
              document.getElementById("p1").innerHTML = error.message;
               $(".fa-spinner").hide();
      });
}
      /*firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                   alert("send mail");
            }, function(error) {
                alert("not data found");
            }).catch(function(error) {
              //  alert("no data found");
        console.log(error.code + '  ' + error.Message);
        console.log(error);
      });*/
    
  function sign_out()
{
  firebase.auth().signOut().then(function() {
    window.location = "login.php";
  }, function(error) {
    // An error happened.
  });
}
//Google Sign Up Code Start

function googlesave_user(){
	
	//alert(55);
	var provider = new firebase.auth.GoogleAuthProvider();
//	provider.addScope('email');
	//provider.addScope('user_birthday');
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	firebase.auth().signInWithPopup(provider).then(function(result) {
		
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  
  				var token = result.credential.accessToken;
  // The signed-in user info.
  console.log(result);
  		 	  var user = result.user;
  			  var uid = firebase.auth().currentUser.uid;
 			  var detail = result.additionalUserInfo.profile;
 		  	  var first_name = detail.given_name;
           	  var last_name = detail.family_name;
           	 //var gender = detail.gender;
  		   	  var gid = detail.id;
			  var email=detail.email;
  		      //var birthday = detail.birthday;
  		     var loginvia = "Google";
  //var membership_type = "free";
  			// ...
         var ref = firebase.database().ref('Users').child(uid);
          ref.once('value').then( function(dataSnapshot) {


              if(dataSnapshot.val()!==null){

                var data = dataSnapshot.val();
                ref.update({"gid":gid});
        window.localStorage.setItem('user',JSON.stringify(dataSnapshot));
                if(!ref.visited)
                {
                  firebase.database().ref('Users').child(uid).child("visited").set(1);
                }else{

                  firebase.database().ref('Users').child(uid).child("visited").set(user.visted+1);
                }
var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + ("0"+ currentdate.getHours()).slice(-2)  + ":"  
                    + ("0"+ currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0"+currentdate.getSeconds()).slice(-2);
                  firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
                swal({
                          title: "Login!",
                          text: "User Login Sucessfully.",
                          html:true,
                          type: "success",
                          showCancelButton: false,
                          confirmButtonColor: "#86CCEB",
                          confirmButtonText: "OK",
                          closeOnConfirm: false
                      }, function () {
                          window.setTimeout(function() {
                          
                            if(data.visited == "" || data.visited == 0){

                            window.location = "welcome.php";
                            }else{
                              window.location = "dashboard.php";
                            }
                          }, 1000);
                      });

              }else{
              save_googleuser(uid,first_name,last_name,gid,email);
              }

          });
		
}).catch(function(error){
  console.log(error.message);
  $("p#all").html(error.message);
});
}

	
function save_googleuser(uid,first_name,last_name,gid,email) {

			//alert(uid);
			//return;
			var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + ("0"+ currentdate.getHours()).slice(-2)  + ":"  
                    + ("0"+ currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0"+currentdate.getSeconds()).slice(-2);
			 var PCstatus = 'Mobile';
			
			 var isMobile = {
			    Android: function() {
			        return navigator.userAgent.match(/Android/i);
			    },
			    BlackBerry: function() {
			        return navigator.userAgent.match(/BlackBerry/i);
			    },
			    iOS: function() {
			        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			    },
			    Opera: function() {
			        return navigator.userAgent.match(/Opera Mini/i);
			    },
			    Windows: function() {
			        return navigator.userAgent.match(/IEMobile/i);
			    },
			    any: function() {
			        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			    }
			}
			if( !isMobile.any() ){
							 var PCstatus = 'Desktop';
			}

			    var x = document.getElementsByName("gender");
			    var s;
				for (var i = 0, length = x.length; i < length; i++)
				{
				 if (x[i].checked)
				 {
				  // do whatever you want with the checked radio
				   s = x[i].value;
				  //alert(s);

				  // only one radio can be logically checked, don't check the rest
				  break;
				 }
				}
				
			//console.log("ss"+uid);
                 //  var uid = user.uid;
				   	var data = {
              "user_id": uid,
              "first_name": first_name,
              "last_name": last_name,
              "visited":0,
              "email": email,
              "login_via": "google",
              "fb_id": "",
              "google_id": gid,
              "birthdate":"",
              "gender":"",
              "halted": 0.0,
              "last_free_conversation_id":0,
              "registered_on":datetime,
              "lastUpdated_on":datetime,
              "device_type":PCstatus,
              "activated_on":datetime,
              "activation_code":"",
              "device_token" : "",
              "membership_type" : "Free",
              "total_time_divethru": 0,
              "completed_conversation": 0,
              "streak": '',
            }
						var updates = {};
						updates['/Users/' + uid] = data;
        				firebase.database().ref().update(updates);
						swal({
	                        title: "Login!",
	                        text: "User Login Sucessfully.",
	                        html:true,
	                        type: "success",
	                        showCancelButton: false,
	                        confirmButtonColor: "#86CCEB",
	                        confirmButtonText: "OK",
	                        closeOnConfirm: false
	                    }, function () {
	                        window.setTimeout(function() {
	                        
	                          window.location.href = "welcome.php";
	                        }, 1000);
	                    });
						
            	
				
}


//End Google sign up code