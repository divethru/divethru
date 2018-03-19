/*var email = "companytest1206@gmail.com";
var password = '123456789';
var day = 0;
firebase.auth().signInWithEmailAndPassword(email, password).then( function(user){
//	 window.location.href =  url+'/admin';
    console.log("Authenticated successfully with payload:", user);
    auth = user;
	firebase.database().ref("Users/"+user.uid).on("value", function(snapshot) {
	window.localStorage.setItem('user',JSON.stringify(snapshot));
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
if(key == 'last_free_conversation_id'){
	day = childData+1;
	$(".day").html(childData+1);
	//window.localStorage.setItem('content', day);
	window.localStorage.setItem('content', day);
console.log(childData);
}				
				// Do what you want with these key/values here*/
	/*	});
		});
  })
  .catch(function(error){
    console.log("Login Failed!", error);
  });*/

  /*firebase.auth().signOut().then(function() {
  // Sign-out successful.
   console.log("Logout!");
}, function(error) {
  // An error happened.
   console.log("Logout Failed!", error);
});*/





firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
          window.location.href = "http://34.215.40.163/login.php";
        // User is signed in.
    } else{
		   auth = user;
		firebase.database().ref("Users/"+user.uid).on("value", function(snapshot) {
			window.localStorage.setItem('user',JSON.stringify(snapshot));
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
				if(key == 'last_free_conversation_id'){
					day = childData+1;
					if(day!=11){
						
					$(".day").html(childData+1);
					}else{
					$(".day").html(childData);

					}
					//window.localStorage.setItem('content', day);
					window.localStorage.setItem('content', day);
					console.log("g"+childData);
				}				
				// Do what you want with these key/values here*/
				
			});
		});		

    }
});
  
  /*Getting last inserted quotes */

firebase.database().ref("DailyQuotes").orderByChild("quote_id").limitToLast(1).on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
			//	console.log(snapshot.numChildren());
			//	console.log(childSnapshot.getPriority());
             //   console.log(childData);
                $(".cardtexts").html(childData.qoute_description);
				// Do what you want with these key/values here*/
			});
		});
		
firebase.database().ref("Category").orderByChild("category_id").limitToLast(3).on("value", function(snapshot) {
	var c = [];
	var session = [];
	var ht ='';
	var desc = '';
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
				var chkSub = false;
				var chkBnd = false;
				var chkS = false;
				var i = 1; 
				//console.log(snapshot.numChildren());
				//console.log(childSnapshot.getPriority());
                console.log(childSnapshot.key);
				c.push(childSnapshot.key);
				var ht = '<div class="row Margins"><p class="MainMenu1 "><span class="i">'+childSnapshot.key+'</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle" style="outline:none;" data-toggle="modal" data-target="#exampleModalCenter2"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center">';
				if(childSnapshot.key == 'Open Dive'){
					session.push(childData.Session);
					$.map(childData.Session, function(value, index) {
					   // console.log(value.subcategory_id);
						//console.log(value.session_name);
						
						if(i==window.localStorage.getItem('content')){
							//$(".bg").css('background', 'url('+value.session_img+') '); /*Dynamic image from database*/

							//$(".conv").html(value.session_name);
						}
						if(i>3){
						ht +='<div class="col-md-4 col-xs-6 boxStyle hiddens" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" style="color:#fff;">'+value.session_name+'</p></div>';

						}else{
							chkS = true;
						ht +='<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center">'+value.session_name+'</p></div>';
						}
					i++;
					});
				}
				/*Quick Dive*/
				if(childSnapshot.hasChild("Bundle")){
					$.map(childData.Bundle, function(value, index) {
					    console.log(value);
						//console.log(value.session_name);
						
						if(i==window.localStorage.getItem('content')){
							//$(".conv").html(value.session_name);
						}
						if(i>6){
						ht = ht +'<div class="col-md-4 col-xs-6 boxStyle hiddens1" style=" background-image: url('+value.bundle_img+'); background-size:cover;"><p class="Center">'+value.bundle_name+'</p></div>';

						}else{
							chkBnd = true;
						ht = ht + '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.bundle_img+'); background-size:cover;"><p class="Center">'+value.bundle_name+'</p></div>';
						}
					i++;
					});
				}
				/*Deep Dive*/
				if(childSnapshot.hasChild("SubCategory")){
				//	alert(childSnapshot.key.length);
					$.map(childData.SubCategory, function(value, index) {
						//sub += index;
						//console.log(value.session_name);
						
						if(i==window.localStorage.getItem('content')){
							//$(".conv").html(value.session_name);
						}
						if(i>6){
							chkSub = true;
						ht = ht +'<div class="col-md-4 col-xs-6 boxStyle hiddens2" style=" background-image: url('+value.subcategory_img+'); background-size:cover;"><p class="Center">'+value.subcategory_name+'</p></div>';

						}else{
							
						ht = ht + '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.subcategory_img+'); background-size:cover;"><p class="Center">'+value.subcategory_name+'</p></div>';
						}
					i++;

					});
				}


				if(childSnapshot.key == 'Open Dive' && chkS){
				ht +='<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				}else if(childSnapshot.hasChild("Bundle") && chkBnd){
				ht +='<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore1" style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				}else if(childSnapshot.hasChild("SubCategory") && chkSub){
				ht +='<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore2 " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
					
				}
                //$(".cardtexts").html(childData.qoute_description);
				// Do what you want with these key/values here*/
			//	console.log(ht);
				$(".cat").append(ht);
		
						$(".exploreMore").click(function(){
						//	alert(555);
							$(".hiddens").show();
							$(".exploreMore").hide();
						});

						$(".exploreMore1").click(function(){
							//alert(555);
						//	var c = "."+$(this).prev().closest('div').attr('class').split(' ')[3];
						//	console.log( c);
							$(".hiddens1").show();
							$(".exploreMore1").hide();
						});		

						$(".exploreMore2").click(function(){
							//alert(555);
						//	var c = "."+$(this).prev().closest('div').attr('class').split(' ')[3];
						//	console.log( c);
							$(".hiddens2").show();
							$(".exploreMore2").hide();
						});		

				//				$(".cat").html(ht);
				window.localStorage.setItem('session',JSON.stringify(session));

				$(".learnMorestyle").click(function(){
								if(key == $(this).prev().text()){
									desc = childData.category_description;
								}
							});
			});


				$(".learnMorestyle").click(function(){
				var cat = $(this).prev().text();
				$(".modal-content .modal-body .modal-title").html(cat);
				$(".modal-body p").html(desc);
				//$("#exampleModalCenter2").modal('show');
				console.log(desc);
			});
			$(".i").each(function(index,value){
//console.log(c[index]);
				$(this).html(c[index]);
					//alert($(this).html(c[index]	));
				});
				// $('.loader').fadeOut();
		});
		
		


$(".i").hover(function(){
	//$(this).for
	//alert($(this).html());
	var ht = '<div class="row Margins"><p class="MainMenu"><span class="i">QUICK DIVE</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center">';
	ht +='<div class="col-md-4 col-xs-6 boxStyle" style="background-color:#aaa;"><p class="Center">Having A Bad Day</p></div>';
	ht +='</div></div>';
});
//$(".conv").html();
var storedNames = JSON.parse(window.localStorage.getItem("session"));

$.map(storedNames, function(value, index) {

console.log(value.session_name);
});

for (i in storedNames)
{
	var conversation = 1;
   for(j in storedNames[i]){

	if(conversation == window.localStorage.getItem('content')){
	$(".conv").html(storedNames[i][j].session_name);
	$(".modal-body h2").html(storedNames[i][j].session_name)
console.log("p"+storedNames[i][j].meditation_audio[0]);
console.log($(".modal-body p").html());
}
/*
		if((conversation == window.localStorage.getItem('content')){
			//$(".conv").html(storedNames[i][j].session_name);
		}*/
		//console.log(storedNames[i][j].session_name);
conversation++;
	}
}
console.log("d"+$(".modal-body").html());	
//console.log(window.localStorage.getItem('content'));
$(".bannerButton").click(function(){
	var user = JSON.parse(window.localStorage.getItem('user'));
		if(day>8 && day<=10){
			 $('#exampleModalCenter').modal('show');
		}else if(day<=8){
		var url = "http://34.215.40.163/player.php";
		window.location.href = url;
		}else if(day>10 && user.membership_type == "Free"){
			window.location = "subscription.php";
		}
	});
