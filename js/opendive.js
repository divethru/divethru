
//		  $(window).load(function(){
    
//  });
			var user = JSON.parse(window.localStorage.getItem('user'));
var catRef = firebase.database().ref().child('Users').child(user.user_id);
    catRef.on('child_changed', function(snapshot) {
			//location.reload(true);
			//window.h = [];
    });
	firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
	        window.localStorage.setItem('user',JSON.stringify(snapshot));

			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
				// Do what you want with these key/values here*/
		});
		});


window.h = [];
if(window.localStorage.getItem("cat") ){
		var ct = window.localStorage.getItem("cat");

		}else if(window.localStorage.getItem("back")){
		var ct = window.localStorage.getItem("prevcat");

		}else{
		var ct = "Open Dive";
			
		}
		//alert(ct);
		// if(ct=="10 Day Intro Program"){
		// 	history.pushState(null, null, '/10DayIntroProgram');
		// }

if(window.performance.navigation.type>0){
	window.localStorage.setItem("back",true);
}else{
	window.localStorage.setItem("back",false);	
}
		




			//window.localStorage.setItem("SessionHistory3","");
  /*Getting last inserted quotes */
		$(".cat").html("");
			var user = JSON.parse(window.localStorage.getItem('user'));
					window.h = [];
	firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();

					if(key == "streak"){
						$.map(childData, function(value, index) {
							$.map(value, function(value2, index2) {
								$.map(value2, function(value3, index3) {
									window.h.push(index3);
									console.log(index3);	
								});
							});
						});
					}

			});
			window.localStorage.setItem("SessionHistory3",JSON.stringify(window.h));
		});
	//if(window.localStorage.getItem("SessionHistory3") != ""){

	var Shistory = JSON.parse(window.localStorage.getItem("SessionHistory3"));
	//}
//console.log(Shistory);


			
//Here is The The code To show Open Dive session
firebase.database().ref("Category").orderByKey().on("value", function(snapshot) {
		var c = [];
		var session = [];
		var ht ='';
		var trace = 0;
				$(".cat1").html("");
		snapshot.forEach(function(childSnapshot) {
			///debugger;
			var key = childSnapshot.key;
			
				// value, could be object
				var childData = childSnapshot.val(); 

				c.push(childSnapshot.key);
				var ht ='';	
				if(childSnapshot.key == ct ){

					window.onbeforeunload = function(event) {
				var t = window.localStorage.getItem("cat");
				window.localStorage.setItem("prevcat",key);
				window.localStorage.setItem("subcription_type",childData.session_subcription_type);
			  //localStorage.removeItem("cat");
			  //return '';
			};
					session.push(childData.Session);
				 var cid = childData.category_id;
					var temp = 0;
					var count = 1;
					$.map(childData.Session, function(value, index) {
						var loc = user.last_free_conversation_id;
						//alert(loc);
						
						if( (loc-1 >= temp  && childSnapshot.key != "Open Dive" )){
							//alert("a");
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1"><i class="fa fa-check-circle center"></i></div></div>';
						}else if((loc == temp && user.membership_type == "Free" && childSnapshot.key != "Open Dive") || (temp == 0 && user.membership_type == "Free" && childSnapshot.key != "Open Dive")){
							//alert("b");
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p></div>';
						}else if (user.membership_type == "Free" ){
							if(temp == 0 && $.inArray(value.session_id,Shistory) != -1)
							{
							//alert(temp);
								ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'"data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1"><i class="fa fa-check-circle center"></i></div></div>';
							}
							else if(temp !=0 ){
								//alert("temp");
								ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1a"><i class="fa fa-lock fa-2x center"></i></div></div>';
							}
							else if($.inArray(value.session_id,Shistory) == -1 && temp == 0 )
							{
								ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p></div>';
							}
						}else if( ($.inArray(value.session_id,Shistory) != -1 && childSnapshot.key == "Open Dive") ){
							//alert("c");
							trace = trace + temp;
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1"><i class="fa fa-check-circle center"></i></div></div>';
						}else if($.inArray(value.session_id,Shistory) == -1 && user.membership_type != "Free"){
							//alert("d");
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p></div>';
						}else if(((trace+2) == temp && user.membership_type != "Free") || (temp == 0 && user.membership_type != "Free" )){
							//alert("e");
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle" data-count ="'+count+'" data-cat="'+cid+'" id="'+value.session_id+'">'+value.session_name+'</p><div class="box1a"><i class="fa fa-lock fa-2x center"></i></div></div>';
						}
							//alert(loc+"=="+temp);
						temp++;
						count++;
					});	
				}	

				/*if(childSnapshot.key == ct ){
					session.push(childData.Session);
					var temp = 0;
					$.map(childData.Session, function(value, index) {
						var loc = user.last_free_conversation_id;
						//alert(loc);
						if((loc-1 == 0 && user.membership_type == "Free") || (loc-1 >= temp && user.membership_type != "Free")){
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle">'+value.session_name+'</p><div class="box1"><i class="fa fa-check-circle center"></i></div></div>';
						}else if((loc == temp && user.membership_type != "Free") || (temp == 0 && user.membership_type == "Free")){
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle">'+value.session_name+'</p></div>';
						}else if (user.membership_type == "Free"){
							ht = ht + '<div class="col-md-4 col-xs-6 boxStyle position-relative p-0 " style=" background-image: url('+value.session_img+'); "><p class="Center bundle">'+value.session_name+'</p><div class="box1a"><i class="fa fa-lock fa-2x center"></i></div></div>';
						}
						temp++;
					});	
				}*/

			//	ht +='</div></div>';
				$(".cat1").append(ht);
				
				
		});		
		 		$(".page-loader-wrapper").hide();	
});


		
	
		$(".nav-link").click(function(){
//$(".dropdown-item").click(function(){
	var cat = $(this).text();
	console.log(cat);
	firebase.database().ref("Category").on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {

		
			if(childSnapshot.hasChild("Bundle") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");

				//window.location = "quickdive.php";
				
			}
			if( (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() == ""){
				console.log("open");
				window.localStorage.setItem("cat",childSnapshot.key);
				//window.location = "opendive.php";
				
			}
		});
		
	});
});






		
		
/*

$(".conv").html();
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
	$(".modal-body p").html(storedNames[i][j].session_description)
console.log(storedNames[i][j].meditation_audio[0]);
}
/*
		if((conversation == window.localStorage.getItem('content')){
			//$(".conv").html(storedNames[i][j].session_name);
		}*/
		/*console.log(storedNames[i][j].session_name);
conversation++;
	}
}
console.log($(".modal-body p").html());	*/
//console.log(window.localStorage.getItem('content'));
$(".bannerButton").click(function(){
	//	var url = "http://localhost/DiveThru/player.php";
	//	window.location.href = url;

	});
	
	