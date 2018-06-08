//for user already login
 $(document).ready(function(){

    var user=window.localStorage.getItem('user');
    if(user!=null)
    {
      //window.location.href = "dashboard.php";
    }
  });
//Firebase registration
$(".fa-spinner").hide();
/* COde for static login 
var email = "companytest1206@gmail.com";
var password = '123456789';
firebase.auth().signInWithEmailAndPassword(email, password).then( function(user){
//   window.location.href =  url+'/admin';
    console.log("Authenticated successfully with payload:", user);
    auth = user;
  })
  .catch(function(error){
    console.log("Login Failed!", error);
  });*/

firebase.auth().onAuthStateChanged(function(user) {
    
    // window.user = user;
  if (user) {
    // User is signed in..
    //var index = url+'/index.php';
    //if(window.location.href != index){
        //window.location.href = previousurl;
    //}
    //return;
   //  var lout = '<a class="nav-link" id="lg" style="padding-right: 1.5rem; padding-left: 1.5rem;" href="#" onclick="sign_out();">LOG OUT<span class="sr-only">(current)</span></a>';
     //  console.log($(".log").html(lout));
     window.location = "login.php";
    console.log(user);
  } else {
      var log = 'http://34.215.40.163/registration.php';
    if(window.location.href != log){
        window.location.href = log;
    }
    // No user is signed in.
  }
});

//var ref = firebase.database().ref('DailyQuotes');
/*ref.orderBy("name").limit(3).on("value",function(snapshot){
    console.log(snapshot);
    
});*/

/*Getting last inserted quotes */
/*
firebase.database().ref("DailyQuotes").orderByChild("quote_id").limitToLast(1).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key
                var key = childSnapshot.key;
                // value, could be object
                var childData = childSnapshot.val();
                console.log(snapshot.numChildren());
                console.log(childSnapshot.getPriority());
console.log(childData);
                // Do what you want with these key/values here*/
        /*  });
        });*/


   /* var catRef = firebase.database().ref('category');
    var outroRef = firebase.database().ref('outro');
         
    catRef.on('child_changed', function(snapshot) {
        alert("update"+snapshot.val().category_id);
        var oldimg = $("#oldimg").attr('src');
        var newimg = $("#imgurl").val();
        alert(oldimg);
        /*if(newimg != oldimg){
            // Create a reference to the file to delete
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });

        }*/
        
    //});
    /*
    catRef.on('child_added', function(snapshot) {
        //alert("update"+JSON.stringify(snapshot.val()));
    });*/
    
  /*  catRef.on('child_removed', function(snapshot) {
            var oldimg = $("#catimg").attr('src');
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });
    });
    
    
  /*  var sessionRef = firebase.database().ref('session');
//Session refrence for remove session image 
    
    sessionRef.on('child_changed', function(snapshot) {
        //alert("update"+snapshot.val().session_id);.
        var alen = snapshot.val().session_audio.length;
        //console.log(snapshot.val().session_audio.length);
        var oldimg = $("#oldsimg").attr('src');
        var newimg = $("#surl").val();
        
        //alert(oldimg);
        if(newimg != oldimg){
            // Create a reference to the file to delete
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });

        }
        
        /*for(var i=0;i<alen;i++){
            
            
            console.log(snapshot.val().session_audio[i]);
        
        }*/
        
   // });
    
    
   /* sessionRef.on('child_removed', function(snapshot) {
        //console.log("update"+snapshot.val().session_img);
        var alen = snapshot.val().session_audio.length;
        
            var oldimg = snapshot.val().session_img;
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });
            
            
        for(var i=0;i<alen;i++){
            
            var desertRef = firebase.storage().refFromURL(snapshot.val().session_audio[i]);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });
            
        
        }
        
    });
    
    
   /* var subcategoryRef = firebase.database().ref('subcategory');
    
    subcategoryRef.on('child_changed', function(snapshot) {
//alert("update"+snapshot.val().category_id);
        var oldimg = $("#oldsubimg").attr('src');
        var newimg = $("#subimgurl").val();
        //alert(oldimg);
        if(newimg != oldimg){
            // Create a reference to the file to delete
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });

        }
        
    });
    /*
    catRef.on('child_added', function(snapshot) {
        //alert("update"+JSON.stringify(snapshot.val()));
    });*/
    
   /* subcategoryRef.on('child_removed', function(snapshot) {
             var oldimg = snapshot.val().subcategory_img;
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });
    });
    
    
        var bundleRef = firebase.database().ref('bundle');
    
    bundleRef.on('child_changed', function(snapshot) {
//alert("update"+snapshot.val().category_id);
        var oldimg = $("#oldbimg").attr('src');
        var newimg = $("#bimgurl").val();
        //alert(oldimg);
        if(newimg != oldimg){
            // Create a reference to the file to delete
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });

        }
        
    });
    
    catRef.on('child_added', function(snapshot) {
        //alert("update"+JSON.stringify(snapshot.val()));
    });*/
    /*
    bundleRef.on('child_removed', function(snapshot) {
             var oldimg = snapshot.val().bundle_img;
            var desertRef = firebase.storage().refFromURL(oldimg);
            
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
                alert("deleted");
            }).catch(function(error) {
                console.log(error);
              // Uh-oh, an error occurred!
            });
    });
    
    */
    
function save_user() {
                    $(".fa-spinner").show();

            var first_name=document.getElementById('first_name').value;
            var last_name=document.getElementById('last_name').value;
            var email=document.getElementById('email').value;
            var password=document.getElementById('password').value;
            var bdate=document.getElementById('birthdate').value;
            var currentdate = new Date(); 
            var datetime = +currentdate.getFullYear() + "-"
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
                
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                   var uid = user.uid;
                    var data = {
                            "user_id": uid,
                            "first_name": first_name,
                            "last_name": last_name,
                            "email": email,
                            "birthdate":bdate,
                             "gender":s,
                             "login_via": "email",
                             "registered_on":datetime,
                             "lastUpdated_on":datetime,
                             "halted":0.0,
                             "last_free_conversation_id":0,
                             "device_type":PCstatus,
                             "activated_on":"",
                             "activation_code":"",
                             "device_token" : "",
                             "fb_id": "",
                             "google_id": "",
                             "visited":0,
							               "completed_conversation":0,
							               "total_time_divethru":0,
							               "membership_type":"Free",
                             "streak":""
                        }
                        var updates = {};
                        updates['/Users/' + uid] = data;
                        firebase.database().ref().update(updates);

                        $.post("http://34.215.40.163/sendEmailVerification.php?uid="+uid, { mail: email }, function(result) {
                    //  window.location.href  = "http://localhost/DiveThru/amazon-ses-sample.php?uid="+uid;
                    //alert('successfully posted '+email);

                            console.log(result);
                                              $(".fa-spinner").hide();
                            document.getElementById('head').innerHTML = "A link to verify your email address has been sent. Please Check your email to proceed further.";
                        document.getElementById('head').style.color = "green";
                        document.getElementById('first_name').value="";
                        document.getElementById('last_name').value="";
                        document.getElementById('email').value="";
                        document.getElementById('password').value="";
                        document.getElementById('confirmpassword').value="";
                        document.getElementById('birthdate').value="";
                        document.getElementById('access_code').value="";
                          var x = document.getElementsByName("gender");
                  var s;
                  for (var i = 0, length = x.length; i < length; i++)
                  {
                   x[i].checked = false;
                
                  }

							//window.location.href="http://34.215.40.163/login.php";
                        //alert('This User Created Sucessfully');
                        });
                }, function(error) {
                  alert('This User Already Exist');
                  $(".fa-spinner").hide();
                });

                
}

function _calculateAge() { // birthday is a date
        var date1 = new Date();
        var  dob= document.getElementById("birthdate").value;
        //alert(dob);
        var date2=new Date(dob);
        var pattern = /^\d{4}\-\d{1,2}\-\d{1,2}$/; //Regex to validate date format (dd/mm/yyyy)
        if (pattern.test(dob)) {
            var y1 = date1.getFullYear(); //getting current year
            var y2 = date2.getFullYear(); //getting dob year
            var age = y1 - y2;           //calculating age 
          //  confirm("Age : " + age);
            if(age<8)
            {
                //alert("please come after 8");
                document.getElementById("bdt").innerHTML = "* User must be 8 year old or above";
                document.getElementById("birthdate").value = '';
            }else{
                  document.getElementById("bdt").innerHTML = "";
            }
        } else {
            alert("Please Input in (yyyy-mm-dd) format!");
        }
}


function uplaodfile() {
    document.getElementsByClassName("catadd").disabled = true;

$(".catadd").attr("disabled","disabled");
  /*  var selectedfile = document.querySelector('#catimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/category/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('imgurl').value = downloadURL;
        document.getElementsByClassName("catadd").disabled = false;
        
$(".catadd").removeAttr("disabled");
    });*/
    
    
    var file_data = $('#catimage').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('cat', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
           // alert(data);
            $("#imgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".catadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
}

function uplaodsubimgfile() {
   // document.getElementsByClassName("catadd").disabled = true;

$(".subcatadd").attr("disabled","disabled");
  /*  var selectedfile = document.querySelector('#subcatimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/subcategory/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('subimgurl').value = downloadURL;
        //document.getElementsByClassName("catadd").disabled = false;
        
$(".subcatadd").removeAttr("disabled");
    });*/
    
    var file_data = $('#subcatimage').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('subcat', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            $("#subimgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".subcatadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
}



function uplaodsimgfile() {
	
    document.getElementsByClassName("sessionadd").disabled = true;

$(".sessionadd").attr("disabled","disabled");
/*    var selectedfile = document.querySelector('#sessionimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/session/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('simgurl').value = downloadURL;
        document.getElementsByClassName("sessionadd").disabled = false;
        
$(".sessionadd").removeAttr("disabled");
    });*/
    var file_data = $('#sessionimage').prop('files')[0];
    console.log(file_data);
    var form_data = new FormData();                  
    form_data.append('session', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            $("#simgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
	 
	 
}   

function uplaodbimgfile() {
    //document.getElementsByClassName("sessionadd").disabled = true;

$(".bundleadd").attr("disabled","disabled");
  /*  var selectedfile = document.querySelector('#bundleimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/bundle/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('bimgurl').value = downloadURL;
        //document.getElementsByClassName("sessionadd").disabled = false;
        
$(".bundleadd").removeAttr("disabled");
    });*/
var file_data = $('#bundleimage').prop('files')[0];   

    var form_data = new FormData();                  
    form_data.append('bundle', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            $("#bimgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".bundleadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
    
    
}   


function uploadsfile() {
    document.getElementsByClassName("sessionadd").disabled = true;

$(".sessionadd").attr("disabled","disabled");
    var fileno = document.querySelector('#soutro').files.length;
    var files = document.querySelector('#soutro').files;
    
    
    
    
        
            var selectedfile = document.querySelector('#soutro').files[0];
            
            var filename = selectedfile.name;
            uploadImageAsPromise(filename);
//console.log(selectedfile);
            var storageRef = firebase.storage().ref("/outro/" + filename);
            var metadata = {contentType: selectedfile.type};
            var uploadTask = storageRef.put(selectedfile, metadata);

            uploadTask.on('state_changed', function (snapshot) {

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }

            },function(error){
                console.log(error);
            },function(){

                 var downloadURL = uploadTask.snapshot.downloadURL;
                 console.log("FILE"+downloadURL);
                 
                 
                document.getElementById('surl').value = downloadURL;
                document.getElementsByClassName("sessionadd").disabled = false;
                
        $(".sessionadd").removeAttr("disabled");
    });
    
    
}
if(document.getElementById("maudio")){
document.getElementById("maudio").addEventListener('change', function(e){ 
    //Get files
//alert(5);
            $(".fa-spinner").show();
 $(".sessionadd").attr("disabled","disabled");
document.getElementsByClassName("sessionadd").disabled = true;

var audio = []; 
    for (var i = 0; i < e.target.files.length; i++) {
        var File = e.target.files[i];
//console.log(imageFile);
       // uploadImageAsPromise(File,audio);
       var file_data = File;   
    console.log(file_data.type);
    var form_data = new FormData();                  
    form_data.append('meditation', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            audio.push("http://34.215.40.163/Admin/"+data);
             document.getElementsByClassName("sessionadd").disabled = false;
            $(".sessionadd").removeAttr("disabled");
                        $(".fa-spinner").hide();
            $("#murl").val(audio);
            console.log(data); // display response from the PHP script, if any
        }
     });
        
    }
});

}

//Handle waiting to upload each file using promise
function uploadImageAsPromise (File,audio) {
    $(".sessionadd").attr("disabled","disabled");
    
    return new Promise(function (resolve, reject) {
 /*       var storageRef = firebase.storage().ref("/meditation/"+File.name);
var metadata = {contentType: File.type};
        //Upload file
        var task = storageRef.put(File,metadata);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
               // uploader.value = percentage;
                console.log('Upload is ' + percentage + '% done');
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
                audio.push(downloadURL);
                document.getElementById('murl').value = audio;
                $(".sessionadd").removeAttr("disabled");
        
            }
        );*/
        var file_data = File;   
    console.log(file_data);
    var form_data = new FormData();                  
    form_data.append('meditation', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            audio.push("http://34.215.40.163/Admin/"+data);
            $(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
        
                
    });
}


// function fbsave_user(){
    
//  //alert(55);
//  var provider = new firebase.auth.FacebookAuthProvider();
// //   provider.addScope('email');
// provider.addScope('user_birthday');
//  firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   var detail = result.additionalUserInfo.profile;
//   var first_name = detail.first_name;
//   var last_name = detail.last_name;
//   var gender = detail.gender;
//   var fbid = detail.id;
//   var birthday = detail.birthday;
//   var loginvia = "Facebook";
//   //var membership_type = "free";
//   // ...
// save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender);
// });
// }

// function save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender) {

//          //alert('ss');
//          //return;
//          var currentdate = new Date(); 
//          var datetime = 
//              + currentdate.getDate() + "/"
//                 + (currentdate.getMonth()+1)  + "/" 
//                 + currentdate.getFullYear() + "  "  
//                 + currentdate.getHours() + ":"  
//                 + currentdate.getMinutes() + ":" 
//                 + currentdate.getSeconds();
//           var PCstatus = 'Mobile';
            
//           var isMobile = {
//              Android: function() {
//                  return navigator.userAgent.match(/Android/i);
//              },
//              BlackBerry: function() {
//                  return navigator.userAgent.match(/BlackBerry/i);
//              },
//              iOS: function() {
//                  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//              },
//              Opera: function() {
//                  return navigator.userAgent.match(/Opera Mini/i);
//              },
//              Windows: function() {
//                  return navigator.userAgent.match(/IEMobile/i);
//              },
//              any: function() {
//                  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//              }
//          }
//          if( !isMobile.any() ){
//                           var PCstatus = 'Desktop';
//          }

//              var x = document.getElementsByName("gender");
//              var s;
//              for (var i = 0, length = x.length; i < length; i++)
//              {
//               if (x[i].checked)
//               {
//                // do whatever you want with the checked radio
//                 s = x[i].value;
//                //alert(s);

//                // only one radio can be logically checked, don't check the rest
//                break;
//               }
//              }
                
//          //  console.log("ss"+uid);
//                  //  var uid = user.uid;
//                  var data = {
//                          "user_id": uid,
//                          "first_name": first_name,
//                          "last_name": last_name,
//                          "email": email,
//                          "fb_id":fbid,
//                          "login_via": "FACEBOOK",
//                          "birthdate":birthday,
//                           "gender":gender,
//                           "registered_on":datetime,
//                           "lastUpdated_on":datetime,
//                           "device_type":PCstatus,
//                           "activated_on":"",
//                           "activated_code":"",
//                           "device_token" : "123456789",
//                           "membership_type" : "Free",
//                      }
//                      var updates = {};
//                      updates['/Users/' + uid] = data;
//                      firebase.database().ref().update(updates);
//                      alert('This User Created Sucessfully');
                
                
// }

function fbsave_user(){
	
	//alert(55);
	var provider = new firebase.auth.FacebookAuthProvider();
//	provider.addScope('email');
	//provider.addScope('user_birthday');
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var fbuser = firebase.auth().currentUser
		//if(fbuser){
			// window.location.href = "http://localhost/DiveThru/login.php";
			//}else{
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  				var token = result.credential.accessToken;
  // The signed-in user info.
  //console.log();
  		 	  var user = result.user;
  			  var uid = user.uid;
 			  var detail = result.additionalUserInfo.profile;
 		  	  var first_name = detail.first_name;
           	  var last_name = detail.last_name;
			   var email = detail.email;
           	  var gender = detail.gender;
  		   	  var fbid = detail.id;
  		      var birthday = "";
  		      var loginvia = "facebook";
			  //var membership_type = "free";
  			// ...
		save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender);
	//}
});
}

    
function save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender) {

           // alert(uid);
            //return;
            var currentdate = new Date(); 
            var datetime = +currentdate.getFullYear() + "-"
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
                
            //  console.log("ss"+uid);
                 //  var uid = user.uid;
                    var data = {
                            "user_id": uid,
                            "first_name": first_name,
                            "last_name": last_name,
                            "email": email,
                            "fb_id":fbid,
                            "google_id": "",
                            "visited":0,
                            "login_via": "facebook",
                            "birthdate":"",
                            "gender":gender,
                            "registered_on":datetime,
                            "lastUpdated_on":datetime,
                            "halted":0.0,
                            "last_free_conversation_id":0,
                            "device_type":PCstatus,
                            "activated_on":"",
                            "activation_code":"",
                            "device_token" : "",
                            "membership_type" : "Free",
                            "total_time_divethru": 0,
                            "completed_conversation": 0,
                            "streak": '',
                        }
                        var updates = {};
                        updates['/Users/' + uid] = data;



                        var ref = firebase.database().ref('Users').child(uid);
           ref.once('value').then( function(dataSnapshot) {
              if(dataSnapshot.val() !== null){
                  var data = dataSnapshot.val();
                  window.localStorage.setItem('user',JSON.stringify(dataSnapshot));
                  if(!ref.visited)
                  {
                   // firebase.database().ref('Users').child(uid).child("visited").set(1);
                  }else{

                   // firebase.database().ref('Users').child(uid).child("visited").set(data.visted+1);
                  }

                  var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + ("0"+ currentdate.getHours()).slice(-2)  + ":"  
                    + ("0"+ currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0"+currentdate.getSeconds()).slice(-2);
                 // firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
                      swal({
                          title: "Already Registered!",
                          text: "User already registered.",
                          html:true,
                          type: "info",
                          showCancelButton: false,
                          confirmButtonColor: "#86CCEB",
                          confirmButtonText: "OK",
                          closeOnConfirm: false
                      });
              }else{

                         firebase.database().ref().update(updates);
                        swal({
                          title: "Registered!",
                          text: "User Registered Sucessfully.",
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
  			  var uid = user.uid;
 			  var detail = result.additionalUserInfo.profile;
 		  	  var first_name = detail.given_name;
           	  var last_name = detail.family_name;
           	 //var gender = detail.gender;
  		   	  var gid = detail.id;
			  var email=detail.email;
  		      //var birthday = detail.birthday;
  		     var loginvia = "google";
  //var membership_type = "free";
  			// ...
		save_googleuser(uid,first_name,last_name,gid,email);
			
});
}

	
function save_googleuser(uid,first_name,last_name,gid,email) {

			//alert(uid);
			//return;
			var currentdate = new Date(); 
			 var datetime = +currentdate.getFullYear() + "-"
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
				
			console.log("ss"+uid);
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
							"activated_on":"",
							"activation_code":"",
							"device_token" : "",
							"membership_type" : "Free",
              "total_time_divethru": 0,
              "completed_conversation": 0,
              "streak": '',
						}
						var updates = {};
						updates['/Users/' + uid] = data;


                 var ref = firebase.database().ref('Users').child(uid);
           ref.once('value').then( function(dataSnapshot) {
              if(dataSnapshot.val() !== null){
                  var data = dataSnapshot.val();
                  window.localStorage.setItem('user',JSON.stringify(dataSnapshot));
                  if(!ref.visited)
                  {
                   // firebase.database().ref('Users').child(uid).child("visited").set(1);
                  }else{

                   // firebase.database().ref('Users').child(uid).child("visited").set(data.visted+1);
                  }

                  var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + ("0"+ currentdate.getHours()).slice(-2)  + ":"  
                    + ("0"+ currentdate.getMinutes()).slice(-2) + ":" 
                    + ("0"+currentdate.getSeconds()).slice(-2);
                 // firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
                      swal({
                          title: "Already Registered!",
                          text: "User already registered.",
                          html:true,
                          type: "info",
                          showCancelButton: false,
                          confirmButtonColor: "#86CCEB",
                          confirmButtonText: "OK",
                          closeOnConfirm: false
                      });
              }else{

                        firebase.database().ref().update(updates);
                  swal({
                          title: "Registered!",
                          text: "User Registered Sucessfully.",
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
            });

        				
						 
}


//End Google sign up code
