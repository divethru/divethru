      
firebase.auth().onAuthStateChanged(function(user) {
           if (user) {
         //var email=document.getElementById('email').value;
           //   var password=document.getElementById('password').value;
             //     alert("Login Successfully");
             //window.location.href = "http://34.215.40.163/welcome.php";
             var ref = firebase.database().ref('Users').child(user.uid);
               ref.once('value').then( function(dataSnapshot) {
                          var data = dataSnapshot.val();
                        console.log(data.activated_on);
                    if(data.activated_on != ''){
                                                 var lout = '<a class="nav-link" id="lg" style="padding-right: 1.5rem; padding-left: 1.5rem;" href="#" onclick="sign_out();">LOG OUT<span class="sr-only">(current)</span></a>';
                          $(".log").html(lout);

                       }

                });
           }
           else{
              //alert("User does not exist");
           }
       });

function login_user() {
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
         
            
            var ref = firebase.database().ref('Users').child(user.uid);
      console.log(user.uid);
      var lout = '<a class="nav-link" id="lg" style="padding-right: 1.5rem; padding-left: 1.5rem;" href="#" onclick="sg_out();">LOG OUT<span class="sr-only">(current)</span></a>';
            ref.once('value').then( function(dataSnapshot) {
        window.localStorage.setItem('user',JSON.stringify(dataSnapshot));
              var data = dataSnapshot.val();
              console.log(data);
              // this.props.navigation.navigate('Tutorial');
              if (data.activated_on !== '') {
              console.log($(".log").html(lout));
                if(data.visited == ""){

                window.location.href = "http://34.215.40.163/welcome.php";
                }else{
                  window.location.href = "http://34.215.40.163/dashboard.php";
                }
              } else {
				        document.getElementById("p2").innerHTML = "";
				        document.getElementById("p3").innerHTML = "";
                document.getElementById("p1").innerHTML = "Please verify your email to proceed further.";
              }

              if(!user.visited)
                {
                  firebase.database().ref('Users').child(user.uid).child("visited").set(1);
                }else{

                  firebase.database().ref('Users').child(user.uid).child("visited").set(user.visted+1);
                }

            });


              firebase.database().ref("Category").orderByChild("category_id").limitToLast(3).on("value", function(snapshot) {
                       var c = [];
                       var session = [];
        var ht ='';
            snapshot.forEach(function(childSnapshot) {
              // key
              var key = childSnapshot.key;
              // value, could be object
              var childData = childSnapshot.val();
              
              var i = 1; 
              //console.log(snapshot.numChildren());
              //console.log(childSnapshot.getPriority());
                      console.log(childSnapshot.key);
              c.push(childSnapshot.key);
              var ht = '<div class="row Margins"><p class="MainMenu"><span class="i">'+childSnapshot.key+'</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center">';
              if(childSnapshot.key == 'Open Dive'){
                session.push(childData.Session);
                $.map(childData.Session, function(value, index) {
                   // console.log(value.subcategory_id);
                  //console.log(value.session_name);
                  
                  if(i==window.localStorage.getItem('content')){
                    $(".bg").css('background', 'url('+value.session_img+') '); /*Dynamic image from database*/

                    $(".conv").html(value.session_name);
                  }
                  if(i>3){
                  ht +='<div class="col-md-4 col-xs-6 boxStyle hiddens" style=" background-image: url('+value.session_img+');"><p class="Center">'+value.session_name+'</p></div>';

                  }else{
                    
                  ht +='<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.session_img+');"><p class="Center">'+value.session_name+'</p></div>';
                  }
                i++;
                });
              }
              if(childSnapshot.key == 'Open Dive'){
              ht +='<div class="col-md-12 center-block"><button type="submit" class="btn btn-primary exploreMore " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
              }
                      //$(".cardtexts").html(childData.qoute_description);
              // Do what you want with these key/values here*/
            //  console.log(ht);
          
                $(".exploreMore").click(function(){
                  //  alert(555);
                    $(".hiddens").show();
                    $(".exploreMore").hide();
                  }); 
           //   $(".cat").append(ht);
              window.localStorage.setItem('session',JSON.stringify(session));
            });
            $(".i").each(function(index,value){
      //console.log(c[index]);
              $(this).html(c[index]);
                //alert($(this).html(c[index] ));
              });
              // $('.loader').fadeOut();
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