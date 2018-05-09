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



     /*$('#exampleModalCenter').modal('hide');*/

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
          window.location.href = "http://34.215.40.163/login.php";
        // User is signed in.
    } else{
    	console.log(user.uid);
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
				if(key == 'payment'){
					$.map(childData, function(value, index){
						var currentdate2 = new Date();
						var currentdate = new Date(value.date);
						 var datetime = 
                    +currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    + ("0" + currentdate.getDate()).slice(-2)  + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
                    var timeDiff = Math.abs(currentdate2.getTime() - currentdate.getTime());
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24 )); 
						if(diffDays > 30){

  						 firebase.database().ref("Users/"+user.user_id).update({membership_type:"Free"});
						console.log(currentdate2.getTime()+"-"+currentdate.getTime());
						}else{
							console.log("subcribe");
						}
					});
				}			
				// Do what you want with these key/values here*/
				
			});
		});		

    }
});
  
	var user = JSON.parse(window.localStorage.getItem('user'));

//for dashboard dynamic player base on currentstreak
var ba_childData;
var ba_subcat_id;
var ba_session_id;
var ba_cat;
var ba_bundle_id;
window.Cbnd_id;


if(user.currentStreak ){

	firebase.database().ref("Users/"+user.user_id+"/currentStreak").once("value",function(snapshot){
		console.log(snapshot.val());
		snapshot.forEach(function(childSnapshot) {
		 	 ba_childData=childSnapshot.val();
		 	 window.localStorage.setItem("currentCat",childSnapshot.key);
		 	console.log(childSnapshot.key);
		 	ba_cat=childSnapshot.key;
		 	window.localStorage.setItem("cat2",ba_cat);

		 	if(ba_cat != "10 Day Intro Program")
		 	{
			 	if(childSnapshot.hasChild("Session")){
			 		//alert(5);
			 	//window.localStorage.setItem("TYPE","Session");
			 		$.map(ba_childData.Session, function(value, index) {
			 		
			 			ba_session_id=index;
			 			
			 		});
			 	}else{


				 	$.map(ba_childData.SubCategory, function(value, index) {
				 		//console.log(value);
				 		ba_subcat_id=index;
				 		$.map(value, function(value, index) {
				 			console.log(value);
				 			if(index=="Bundle"){
				 				//window.localStorage.setItem("TYPE","S&B");
				 				$.map(value, function(value, index) {
				 					console.log(index);
				 					ba_bundle_id=index;
					 				//.localStorage.setItem("currentID", index);
				 					
				 					window.Cbnd_id = index;
				 					$.map(value, function(value, index) {
					 					console.log("SSS"+Object.keys(value).length);
					 				//	window.localStorage.setItem("content",Object.keys(value).length);
					 					$.map(value, function(value, index) {
						 					//console.log(index);
						 					ba_session_id=index;
						 				});
					 				});
				 				});
				 			}
				 			else{
				 				//window.localStorage.setItem("TYPE","SubCategory");
				 				//window.localStorage.setItem("currentID", ba_subcat_id);
					 			//		window.localStorage.setItem("content",Object.keys(value).length);
				 				console.log("SSS"+Object.keys(value).length);
				 				$.map(value, function(value, index) {
					 				
						 					console.log(index);
						 					ba_session_id=index;
						 		});
				 			}
				 		});
				 	});
				 }
			}
			else{

			}
		 });


	});
}
else{

}

//alert(ba_bundle_id);

//for get session paid detail
	var cname="/IndividualSubscription";
	var subcate_index=[];
	var final_conve_data=[];
	
	window.cat_index=0;
	firebase.database().ref("Users/"+user.user_id+cname+"/session").once("value",function(snapshot){
								//alert();
		snapshot.forEach(function(childSnapshot) {

  		console.log(childSnapshot.val());
  		//alert(childSnapshot.val());
  		childData=childSnapshot.val();
      final_conve_data.push(childData['id']);
			
		});
    //console.log(final_conve_data);
    
		window.localStorage.setItem("cove_data",JSON.stringify(final_conve_data));
    
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
//firebase.database().ref("Category").orderByChild("category_id").on("value", function(snapshot) {		
firebase.database().ref("Category").orderByKey().on("value", function(snapshot) {
	var c = [];
	var session = [];
	var session2 = [];
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
				var chkS2 = false;
				var i = 1; 
				//console.log(snapshot.numChildren());
				//console.log(childSnapshot.getPriority());
				c.push(childSnapshot.key);
				var ht = '<div class="row Margins "><p class="MainMenu1 "><span class="i">'+childSnapshot.key+'</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle" style="outline:none;" data-toggle="modal" data-target="#exampleModalCenter2"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center playe">';
				if(childData.session_subscription_type == 'Free' && childSnapshot.key == '10 Day Intro Program'){
                console.log(childSnapshot.key);
					var blen = Object.keys(childData.Bundle).length;
					var sblen = Object.keys(childData.SubCategory).length;
					session.push(childData.Session);
					var cid = childData.category_id;
				//	alert(key);
						//window.localStorage.setItem("cid",key);
						window.localStorage.setItem("cid",childData.category_id);
									window.localStorage.setItem("bid","");
									window.localStorage.setItem("subcategory_id","");
					$.map(childData.Session, function(value, index) {
					//	window.localStorage.setItem("Dname",key);
					   // console.log(value.subcategory_id);
						//console.log(value.session_name);
						//(!window.localStorage.getItem('cat') ||  window.localStorage.getItem('cat') != 'Deep Dive' || window.localStorage.getItem('cat') != 'Quick Dive'){
							
							//alert(5);
			//			}
						if(i==window.localStorage.getItem('content')){
							//$(".bg").css('background', 'url('+value.session_img+') '); /*Dynamic image from database*/

							//$(".conv").html(value.session_name);
						}
						if(i>3){
							//ht += '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 hiddens3" style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1"><i class="fa fa-check-circe center"></i></div></div>';
						ht +='<div class="col-md-4 col-xs-6 boxStyle hiddens3 '+childSnapshot.key+'" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'" style="color:#fff;">'+value.session_name+'</p></div>';

						}else{
							chkS2 = true;
							//ht += '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1"><i class="fa fa-check-circe center"></i></div></div>';
						ht +='<div class="col-md-4 col-xs-6 boxStyle '+childSnapshot.key+'" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.session_name+'</p></div>';
						}
					i++;
					});
				}
				if(childSnapshot.key == 'Open Dive' || childSnapshot.hasChild("Session") || childData.Session != ""){
                console.log(childSnapshot.key);
					//var blen = Object.keys(childData.Bundle).length;
					var sblen = Object.keys(childData.SubCategory).length;
					session.push(childData.Session);
					//window.localStorage.setItem("TYPE","Session");
					if(childSnapshot.key == window.localStorage.getItem("currentCat"))
								{	
									window.localStorage.setItem("cid",childData.category_id);
									window.localStorage.setItem("bid","");
									window.localStorage.setItem("subcategory_id","");

								//change dashboard html value
								//	$(".bannerHeader").html(childSnapshot.key);
//$(".day").html(window.localStorage.getItem("content"));
								//	$(".totalday").html(Object.keys(childData.Session).length);

									//alert(childSnapshot.key);
								//	window.localStorage.setItem("Dname",childSnapshot.key);
									console.log(childData.Session);
								//	window.localStorage.setItem("Slen",Object.keys(childData.Session).length);
									//session2.push(childData.Session);
								}
					$.map(childData.Session, function(value, index) {
					   // console.log(value.subcategory_id);
						//console.log(value.session_name);
						//(!window.localStorage.getItem('cat') ||  window.localStorage.getItem('cat') != 'Deep Dive' || window.localStorage.getItem('cat') != 'Quick Dive'){
							
							//alert(5);
			//			}
						if(i==window.localStorage.getItem('content')){
							//$(".bg").css('background', 'url('+value.session_img+') '); /*Dynamic image from database*/

							//$(".conv").html(value.session_name);
						}
						if(i>3){
						ht +='<div class="col-md-4 col-xs-6 boxStyle hiddens '+childSnapshot.key+'" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'" style="color:#fff;">'+value.session_name+'</p></div>';

						}else{
							chkS = true;
						ht +='<div class="col-md-4 col-xs-6 boxStyle '+childSnapshot.key+'" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.session_name+'</p></div>';
						}
					i++;
					});
				}
				/*Old Quick Dive structure*/
				if(childSnapshot.hasChild("Bundle")){
                console.log(childSnapshot.key);
					var blen = Object.keys(childData.Bundle).length;
					var sblen = Object.keys(childData.SubCategory).length;
					//window.localStorage.setItem("TYPE","Bundle");
					$.map(childData.Bundle, function(value, index) {
						//console.log(value.session_name);
						if(index == window.localStorage.getItem("currentID") && childSnapshot.key == window.localStorage.getItem("currentCat"))
								{	
									window.localStorage.setItem("cid",childData.category_id);
									window.localStorage.setItem("bid",value.bundle_id);
									window.localStorage.setItem("subcategory_id","");
										//change dashboard html value

								//	$(".bannerHeader").html(value.bundle_name);
								//	$(".day").html(window.localStorage.getItem("content"));
								//	$(".totalday").html(Object.keys(value.Session).length);

									//window.localStorage.setItem("Dname",value.bundle_name);
									console.log(value.Session);
									//window.localStorage.setItem("Slen",object.keys(value.Session).length);
									//session2.push(value.Session);
								}
						if(i==window.localStorage.getItem('content')){
							//$(".conv").html(value.session_name);
						}
						if(i>6){
						ht = ht +'<div class="col-md-4 col-xs-6 boxStyle hiddens1 '+childSnapshot.key+'" style=" background-image: url('+value.bundle_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.bundle_name+'</p></div>';

						}else{
							chkBnd = true;
						ht = ht + '<div class="col-md-4 col-xs-6 boxStyle '+childSnapshot.key+'" style=" background-image: url('+value.bundle_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.bundle_name+'</p></div>';
						}
					i++;
					});
				}
				/*Deep Dive and new Quick Dive structure*/
				if(childSnapshot.hasChild("SubCategory")){

				//	alert(childSnapshot.key.length);
                console.log(childSnapshot.key);
                if(childData.Bundle){

					var blen = Object.keys(childData.Bundle).length;
                }else{
					var blen = 0;
                	
                }
					var sblen = Object.keys(childData.SubCategory).length;
					$.map(childData.SubCategory, function(value, index) {
						//sub += index;
						if(!childSnapshot.hasChild('Bundle')){
								if(index == window.localStorage.getItem("currentID") && childSnapshot.key == window.localStorage.getItem("currentCat"))
								{	
									window.localStorage.setItem("cid",childData.category_id);
									window.localStorage.setItem("bid","");
									window.localStorage.setItem("subcategory_id",value.subcategory_id);
									//change dashboard html value

								//	$(".bannerHeader").html(value.subcategory_name);
								//	$(".day").html(window.localStorage.getItem("content"));
								//	$(".totalday").html(Object.keys(value.Session).length);


									//window.localStorage.setItem("Dname",value.subcategory_name);
									console.log(value.Session);
									//window.localStorage.setItem("Slen",Object.keys(value.Session).length);
									//session2.push(value.Session);
								}
						}else{

							$.map(value.Bundle, function(value2, index) {
								// window.localStorage.setItem("TYPE","S&B");
								if(value.bundle_id == window.localStorage.getItem("currentID") && childSnapshot.key == window.localStorage.getItem("currentCat"))
								{
									//alert(value2.bundle_name);
									//change dashboard html value
window.localStorage.setItem("cid",childData.category_id);
									window.localStorage.setItem("bid",value2.bundle_id);
									window.localStorage.setItem("subcategory_id",value.subcategory_id);
									//$(".bannerHeader").html(value2.bundle_name);
									//$(".day").html(window.localStorage.getItem("content"));
									//$(".totalday").html(Object.keys(value2.Session).length);

									//window.localStorage.setItem("Dname",value2.bundle_name);
									//alert(index+"="+window.localStorage.getItem("currentID"));	
									console.log(value2.Session);
									//session2.push(value2.Session);
									//window.localStorage.setItem("Slen",Object.keys(value2.Session).length);
								}
								//session.push(value.Session);
							});
						}
//console.log(session2);
						if(i==window.localStorage.getItem('content')){
							//$(".conv").html(value.session_name);
						}
						if(i>6){
							chkSub = true;
						ht = ht +'<div class="col-md-4 col-xs-6 boxStyle hiddens2 '+childSnapshot.key+'" style=" background-image: url('+value.subcategory_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.subcategory_name+'</p></div>';

						}else{
							
						ht = ht + '<div class="col-md-4 col-xs-6 boxStyle '+childSnapshot.key+'" style=" background-image: url('+value.subcategory_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.subcategory_name+'</p></div>';
						}
					i++;

					});
				}


				if(childSnapshot.key == 'Open Dive' && chkS ){
				ht +='<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				}else if(childSnapshot.key == '10 Day Intro Program' && chkS2){
				ht +='<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore3 " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';

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
						$(".exploreMore3").click(function(){
							//alert(555);
						//	var c = "."+$(this).prev().closest('div').attr('class').split(' ')[3];
						//	console.log( c);
							$(".hiddens3").show();
							$(".exploreMore3").hide();
						});		

				//				$(".cat").html(ht);
				if(window.localStorage.getItem('cat') == '10 Day Intro Program' && childData.session_subscription_type == 'Free' || !window.localStorage.getItem('cat') ){
					window.localStorage.setItem('session',JSON.stringify(session));
					window.localStorage.setItem('session2',JSON.stringify(session2));
				}
				$(".learnMorestyle").click(function(){
					//alert(5);
								if(key == $(this).prev().text()){
									desc = childData.category_description;
									var cat = $(this).prev().text();
									$(".modal-content .modal-body .modal-title").html(cat);
									$(".modal-body p").html(desc);
								}
							});
			});
dash();

				$(".learnMorestyle").click(function(){
					//alert(5);
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
if(window.localStorage.getItem('cat') == "10 Day Intro Program" || !window.localStorage.getItem('cat')){
	//alert(5);
for (i in storedNames)
{
	var conversation = 1;
   for(j in storedNames[i]){

	if(conversation == window.localStorage.getItem('content')){
	$(".conv").html(storedNames[i][j].session_name);
	  //$(".sdesc").html(storedNames[i][j].session_description);
	$(".modal-body h2.session").html(storedNames[i][j].session_name)
console.log("p"+storedNames[i][j].meditation_audio[0]);
console.log($(".modal-body p").html());
}

conversation++;
	}
}
}
console.log("d"+$(".modal-body").html());
if(window.localStorage.getItem("Dname") == "10 Day Intro Program"){
//$(".bannerHeader").html(window.localStorage.getItem("Intro Program"));
}else{
//$(".bannerHeader").html(window.localStorage.getItem("Dname"));
}
//$(".day").html(window.localStorage.getItem("content"));
//$(".totalday").html(window.localStorage.getItem("Slen"));

//console.log(window.localStorage.getItem('content'));
$(".bannerButton").click(function(){
	var day = window.localStorage.getItem('content');
		//window.localStorage.removeItem("cat",);
		window.localStorage.setItem("subcategory_id","");
        window.localStorage.setItem("bid","");
        //window.localStorage.setItem("cid","-L9J9wr-WF71xLKGpHrn"); // remove after new code for Beign button
	window.localStorage.setItem("cat","10 Day Intro Program");
	var user = JSON.parse(window.localStorage.getItem('user'));
		// if(day>8 && day<=10){
		// 	 $('#exampleModalCenter').modal('show');
		// }else if(day<=8){
		// var url = "http://34.215.40.163/player.php";
		// window.location.href = url;
		// }else if(day>10 && user.membership_type == "Free"){
		// 	window.location = "subscription.php";
		// }else if(day>10 && user.membership_type != "Free"){
		// 	swal("You Have Finished Your 10 Day Intro Program");
		// }
		if(day>8 && day<=10 && user.membership_type == "Free"){
     // alert(day);
	       $('#exampleModalCenter').modal('show');
	    }else if(day<=8 || user.membership_type == "Paid"){
	        
		    var url = "http://34.215.40.163/player.php";
		    window.location.href = url;
	    }else if(day>10 && user.membership_type == "Free"){
	       //alert(day);
	       // alert(user.membership_type);
	      window.location = "subscription.php";
	    }
	    else if(day>10 && user.membership_type != "Free"){
			swal("You Have Finished Your 10 Day Intro Program");
		}
	});
function dash(){
	$(".boxStyle").click(function(){
		var id = $(this).find("p").attr("id");
		var cat1 = $(this).find("p").data("cat");
		var bundle = $(this).find("p").data("bundle");
		var subcat = $(this).find("p").data("subcat");
			
		if(bundle == 0 && subcat == 0){
			window.localStorage.setItem("cat",cat1);

				//window.location = "opendive.php";
				window.location = "session.php";
		}else if(bundle != 0 && subcat == 0){
			window.localStorage.setItem("cat",cat1);
				window.location = "quickdive.php";

		}else if(bundle == 0 && subcat != 0){
			window.localStorage.setItem("cat",cat1);
				window.location = "quickdive.php";

		}
		if(cat1 == "Open Dive"){
		console.log(bundle+"=="+subcat);
		}else if(cat1 == "Quick Dive"){
		console.log(bundle+"=="+subcat);
				//window.location = "quickdive.php";

		}else if(cat1 == "Deep Dive"){
		console.log(bundle+"=="+subcat);
				window.location = "DeepMain.php";

		}
	});
}	
			console.log(sessionStorage.getItem("Test"));

$(".dropdown-item").click(function(){
	var cat = $(this).data("cat");
	var page = $(this).text();
	 var x = $(this).prev();
	 console.log(x);
	//alert(page);
	/*firebase.database().ref("Category").on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
		if(childSnapshot.hasChild("SubCategory") &&  childSnapshot.key == cat){
				if(page == "MAIN"){
				window.localStorage.setItem("cat",childSnapshot.key);
				window.location = "DeepMain3.php";
					
				}else if(page == "INDIVIDUAL"){
				window.localStorage.setItem("cat",childSnapshot.key);
				window.location = "DeepMain.php";
					
				}
			}
			
		});
		
	});*/
});

if(window.performance.navigation.type>0){
	window.localStorage.setItem("back",true);
}else{
	window.localStorage.setItem("back",false);	
}

$(".nav-link").click(function(){
//$(".dropdown-item").click(function(){
	var cat = $(this).text();
	console.log(cat);
	firebase.database().ref("Category").on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {

		
			if(childSnapshot.hasChild("Bundle") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				sessionStorage.setItem("cat", childSnapshot.key);
				window.localStorage.setItem("back",false);
				console.log("quick");
				//window.location = "quickdive.php";
				
			}
			if(childSnapshot.hasChild("SubCategory") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("SubCategory").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");
				window.localStorage.setItem("back",false);
				//window.location = "quickdive.php";
				
			}
			if( (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() == ""){
				console.log("open");
				sessionStorage.setItem("cat", childSnapshot.key);
				window.localStorage.setItem("back",false);
				window.localStorage.setItem("cat",childSnapshot.key);
				//window.location = "opendive.php";
				//window.location = "session.php";

				
			}
		});
		
	});
	

});
var user = JSON.parse(window.localStorage.getItem('user'));	


var $_GET=[];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});
if($_GET['auth']){
	$(".page-loader-wrapper").css("display","unset");
$.get('http://34.215.40.163/ipn/'+user.user_id+'.txt', function(data) {
   var str = data;
   var arr = str.split("&");
   		console.log(data);
   var eml = "";
   var txid = "";
	var pyid = "";
	var type = "paypal";
	var status = "";
	var time = "";
	var state = "";
	var total = 0;
	var currency = "";
	var full_name = "";
	var l_name = "";
	var address = "";
	var city = "";
	var subcription_type = "";
	var item_name = "";
   /*arr.forEach(function(value) {
   console.log(value);
   });*/
var $_GET=[];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;})

console.log($_GET);
   	for(var i in arr){
   		console.log(arr[i].substring(arr[i].indexOf("=")+1));
      // 	console.log(arr[i].substring(0,arr[i].indexOf("=")+1));

   		switch (arr[i].substring(0, arr[i].indexOf("="))) {
    case "amount3":
         total = arr[i].substring(arr[i].indexOf("=")+1);

        break;
    case "mc_amount3":
         total = arr[i].substring(arr[i].indexOf("=")+1);

        break;
    case "payer_email":
         eml = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "subscr_date":
         time = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "payer_id":
         pyid = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "payer_status":
         status = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "subscr_id":
         txid = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "first_name":
         full_name = arr[i].substring(arr[i].indexOf("=")+1);
        break;    
    case "last_name":
         l_name = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "address_state":
        state = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "address_city":
       	city = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "mc_currency":
        currency = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "item_name":
        item_name = arr[i].substring(arr[i].indexOf("=")+1);
        break;
    case "period3":
    	if(arr[i].substring(arr[i].indexOf("=")+1) == "1 M"){

        subcription_type = "Monthly";
    	}else if(arr[i].substring(arr[i].indexOf("=")+1) == "1 Y"){
        subcription_type = "Yearly";
    		
    	}

        break;
 /*    case "custom":
    	if(arr[i].substring(arr[i].indexOf("=")+1) == "M"){

        subcription_type = "Monthly";
    	}else if(arr[i].substring(arr[i].indexOf("=")+1) == "Y"){
        subcription_type = "Yearly";
    		
    	}
       
        break;*/
}
   	}
   var chkauth=localStorage.getItem('payment');
  // alert(s);
   //window.location.reload();
if($_GET["auth"] && chkauth=='true'){
	//alert(subcription_type);
	localStorage.setItem('payment','false');
	var n = full_name+" "+l_name;
	var currentdate = new Date(); 
                var datetime = 
                     + ("0" + currentdate.getDate()).slice(-2)  + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    +currentdate.getFullYear()+ " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
                   // alert(subcription_type);
   var data = {transaction_id:txid,payer_id:pyid,name:n,email:eml,payment_type:type,payment_status:status,date:time,state:state,city:city,price:total,currency:currency,subscription:'active',subscription_type:subcription_type,item_name:item_name};
   var db = firebase.database();

   db.ref("Users/"+user.user_id).update({membership_type:"Paid"});
   db.ref("Users/"+user.user_id).update({lastUpdated_on:datetime});
			/*db.ref("Users/"+user.user_id+"/payment").child(txid).set(data);*/ // Update lalted time on pause
			db.ref("Users/"+user.user_id+"/payment").push(data).then(function(){
				$(".page-loader-wrapper").css("display","none");
						window.localStorage.setItem("paymentconfirm","true");
				var useremail = user.email;
				var newtemp2 = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none"></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin-bottom:30px"><span style="color:#000;"><br>Thank for your purchase. We have recevied your payment for '+subcription_type+' subscription. <br><br>DiveThru.<br></span></div></div></div></div></div>';

                         $.post("http://34.215.40.163/sendEreceipt.php", { "email": "companytest1206@gmail.com" , "body" : newtemp2 }, function(result) {
                         
                            });

				if(window.localStorage.getItem("paymentconfirm")=="true"){
					var t = '';
					var useremail = user.email;
					var html = '<div style="font-family: sans-serif;"><div style="background-color:#80429C;text-align:center;"><img src="http://34.215.40.163/img/logo_email.png"></div><div style="margin-top:25px;margin-left: 20px;margin-right: 20px;"><table border="1" style="width:100%;border-collapse: collapse;text-align:center;"><tr style="font-size:20px;background-color: #cccccc8f;"><th style="min-width: 160px;">Item</th><th style="max-width: 30px;padding:15px;">Subscription <br>Type</th><th>Price</th><th style="max-width: 50px;">Amount</th></tr>';
					//$.map(user.payment, function(value, index){
						/*$.map(index, function(value, index){

						});*/
					//alert(total);
					console.log(total);
						t = t + total;
				//	 html += '<tr ><td style="padding:15px;">'+item_name+'</td><td >'+subcription_type+'</td><td >$'+total+'</td><td >$'+total+'</td></tr>';

					//});
				//	html += '<tr style="font-weight:600;"><td style="padding:15px;text-align:right;font-size:20px;" colspan="3">Total</td><td >$'+t+'</td></tr></table></div></div>';


					var newtemp = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none" ></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin:20px 0px;font-size:30px;line-height:30px;text-align:left">Thank you</div><div style="margin-bottom:30px"><span style="color:#000;">For Subscribing, Enjoy DiveThru to find the peace within.<br><br></span><div style="margin-bottom:20px;text-align:left"><b>Transaction ID:&nbsp;</b>'+txid+'<br><b>Date:&nbsp;</b>'+datetime+'</div></div><div><div></div><span></span><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:left;font-weight:bold;font-size:12px">Item</td><td style="text-align:right;font-weight:bold;font-size:12px" width="100">Price</td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr></tr><tr><td style="text-align:left;font-size:12px;padding-right:10px"><span><span style="letter-spacing: 2px;text-transform: uppercase;">'+subcription_type+'</span>&nbsp;('+item_name+')</span></td><td style="text-align:right;font-size:12px"><span>$'+total+'</span><span></span></td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:right;font-size:12px;font-weight:bold;" width="150" colspan="2"><span style="">Total:&nbsp;&nbsp;&nbsp; </span>$'+t+'</td></tr></tbody></table></div></div></div></div></div>';


//					console.log(html);
						 $.post("http://34.215.40.163/sendEreceipt.php", { "email": useremail , "body" : newtemp }, function(result) {
						 	console.log(result);
						 	window.localStorage.setItem("paymentconfirm","false");
						 	
						 	
						 });


				}
});


						 swal({title: "Thank you", text: "For Subscription!!", type: "success"},
                                        function(){ 
                            				window.setTimeout(function() {
			                                  window.location.href = "dashboard.php";
			                                }, 3000);             
                                     }
                                );
			
}
console.log(data);
}, 'text').fail(function() {
    window.location.reload(); // reload if file not wriiten
  });
}

var eml = $(".email").val();
			var txid = $(".tr_id").val();
			var pyid = $(".payer_id").val();
			var type = $(".payment_type").val();
			var status = $(".payment_status").val();
			var time = $(".payment_time").val();
			var state = $(".state").val();
			var total = $(".total").val();
			var currency = $(".currency").val();
			var full_name = $(".full_name").val();
			var address = $(".address").val();
			var city = $(".city").val();
			var description = $(".description").val();
			var data = {transaction_id:txid,payer_id:pyid,name:full_name,email:eml,payment_type:type,payment_status:status,date:time,state:state,city:city,price:total,currency:currency,subscription:'active',subscription_type:"Lifetime"};
			//console.log(data);
			console.log(time);
			var tranc_data_entry=false;
			var chkauth=localStorage.getItem('payment');
			if(txid && chkauth=="true"){
				localStorage.setItem('payment','false');

						var db = firebase.database();
					//alert(description);
					console.log(description);
					//alert(tranc_data_entry);
						if(description=="session")
						{
					

							var cname="/IndividualSubscription";
							
							var session_id=localStorage.getItem('session_id');
							var session_name=localStorage.getItem('session_name');
							var cat=localStorage.getItem('prevcat');
							if(cat=="Quick Dive"){
								cat="session";
							}
							else{
								cat="bundle";
							}
							
							var subcate_index=[];
							window.cat_index=0;
							 var i=0;
							
							console.log(user.IndividualSubscription);
							var n = full_name;
							var subcription_type="Lifetime";
							var item_name=session_name;
								
											
							if(!user.IndividualSubscription){

								data={id:session_id,transaction_id:txid,payer_id:pyid,name:n,email:eml,payment_type:type,payment_status:status,date:time,state:state,city:city,price:total,currency:currency,subscription:'active',subscription_type:subcription_type,item_name:item_name};
								console.log(data);
								//alert(data);
								db.ref("Users/"+user.user_id+cname).child(cat).push(data);
								
								window.setTimeout(function() {
                                  window.location.href = "dashboard.php";
                                }, 3000);
							}
							else{
								
							
							firebase.database().ref("Users/"+user.user_id+cname).once("value",function(snapshot){
								//alert();
								id=Object.keys(snapshot.val());
								console.log(id[0]);
								cat_index=id[0];

								snapshot.forEach(function(childSnapshot) {
									console.log(childSnapshot.val());
									//alert(childSnapshot.val());
									childData=childSnapshot.val();
									console.log(childData['id']);
									subcate_index.push(childData['id']);
									 
								});

								 console.log(subcate_index);
								// alert(subcategory_id);
								//$.inArray(session_id, subcate_index) > -1
								//alert(cat_index+'=='+cat);
								if(cat_index==cat)
								{
									 //alert(cat_index);
									 data={id:session_id,transaction_id:txid,payer_id:pyid,name:n,email:eml,payment_type:type,payment_status:status,date:time,state:state,city:city,price:total,currency:currency,subscription:'active',subscription_type:subcription_type,item_name:item_name};
									 console.log(data);
									
									db.ref("Users/"+user.user_id+cname+"/"+cat_index).push(data);
									//db.ref("Users/"+user.user_id+cname+"/"+cat_index).child('payment').push(paymentdata);									
									window.location.href = "dashboard.php";
									
								}
								else{
									//alert();
									// alert(Object.keys(subcate_index));
									// console.log(Object.keys(subcate_index));
									//cat="session2";
									
									 data={id:session_id,transaction_id:txid,payer_id:pyid,name:n,email:eml,payment_type:type,payment_status:status,date:time,state:state,city:city,price:total,currency:currency,subscription:'active',subscription_type:subcription_type,item_name:item_name};
									 console.log(data);
									// //alert(data);
									 db.ref("Users/"+user.user_id+cname).child(cat).push(data);
									
									
									window.location.href = "dashboard.php";
								}
							});

						  	}
						}
						else{
							db.ref("Users/"+user.user_id).update({membership_type:"Paid"});
							db.ref("Users/"+user.user_id+"/payment").push(data);
						}
						
			/*db.ref("Users/"+user.user_id+"/payment").child(txid).set(data);*/ // Update lalted time on pause
				window.localStorage.setItem("paymentconfirm","true");

								var useremail = user.email;
				var newtemp2 = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none"></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin-bottom:30px"><span style="color:#000;"><br>Thank for your purchase. We have recevied your payment for '+subcription_type+' subscription. <br><br>DiveThru.<br></span></div></div></div></div></div>';

                         $.post("http://34.215.40.163/sendEreceipt.php", { "email": "companytest1206@gmail.com" , "body" : newtemp2 }, function(result) {
                         
                            });
				
			//
			 // Update lalted time on pause
				//alert(user.payment);
				if(window.localStorage.getItem("paymentconfirm")=="true"){
					var t = '';
					var currentdate = new Date(); 
                var date =  ("0" + currentdate.getDate()).slice(-2)  + "-"
                    + ("0" + (currentdate.getMonth()+1)).slice(-2)  + "-" 
                    +currentdate.getFullYear()+ " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

					var useremail = user.email;
				

					var html = '<div style="font-family: sans-serif;"><div style="background-color:#80429C;text-align:center;"><img src="http://34.215.40.163/img/logo_email.png"></div><div style="margin-top:25px;margin-left: 20px;margin-right: 20px;"><table border="1" style="width:100%;border-collapse: collapse;text-align:center;"><tr style="font-size:20px;background-color: #cccccc8f;"><th style="min-width: 160px;">Item</th><th style="max-width: 30px;padding:15px;">Subscription <br>Type</th><th>Price</th><th style="max-width: 50px;">Amount</th></tr>';
					//$.map(user.payment, function(value, index){

					//console.log(value);
						t = t + total;

					var newtemp = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none" ></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin:20px 0px;font-size:30px;line-height:30px;text-align:left">Thank you</div><div style="margin-bottom:30px"><span style="color:#000;">For Subscribing, Enjoy DiveThru to find the peace within.<br><br></span><div style="margin-bottom:20px;text-align:left"><b>Transaction ID:&nbsp;</b>'+txid+'<br><b>Date:&nbsp;</b>'+date+'</div></div><div><div></div><span></span><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:left;font-weight:bold;font-size:12px">Item</td><td style="text-align:right;font-weight:bold;font-size:12px" width="100">Price</td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr></tr><tr><td style="text-align:left;font-size:12px;padding-right:10px"><span><span style="letter-spacing: 2px;text-transform: uppercase;">'+subcription_type+'</span>&nbsp;('+item_name+')</span></td><td style="text-align:right;font-size:12px"><span>$'+total+'</span><span></span></td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:right;font-size:12px;font-weight:bold;" width="150" colspan="2"><span style="">Total:&nbsp;&nbsp;&nbsp; </span>$'+t+'</td></tr></tbody></table></div></div></div></div></div>';

					// html += '<tr ><td style="padding:15px;">'+value.item_name+'</td><td >'+value.subcription_type+'</td><td >$'+value.price+'</td><td >$'+value.price+'</td></tr><tr style="font-weight:600;"><td style="padding:15px;text-align:right;font-size:20px;" colspan="3">Total</td><td >$'+t+'</td></tr>';

				//	});
					html += '</table></div></div>';
					//console.log(html);
					//alert(html);
						 $.post("http://34.215.40.163/sendEreceipt.php", { "email": useremail , "body" : newtemp }, function(result) {
						 	console.log(result);
						 		window.localStorage.setItem("paymentconfirm","false");
						 });
				}

				//if(tranc_data_entry==true){
					//alert(tranc_data_entry);
				window.setTimeout(function() {
                                  window.location.href = "dashboard.php";
                                }, 3000);
				//}
				
			}
 
  

