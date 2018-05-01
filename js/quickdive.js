  //window.localStorage.removeItem("cat");
  /*Getting last inserted quotes */
		$(".cat").html("");
if(window.localStorage.getItem("cat") ){
		var ct = window.localStorage.getItem("cat");

		}else if(window.localStorage.getItem("back")){
		var ct = window.localStorage.getItem("prevcat");

		}else{
		var ct = "Open Dive";
			
		}
		console.log(ct);

if(window.performance.navigation.type>0){
	window.localStorage.setItem("back",true);
}else{
	window.localStorage.setItem("back",false);	
}

		var user = JSON.parse(window.localStorage.getItem('user'));	


//Here is The The code To show Open Dive session
firebase.database().ref("Category").orderByChild("session_id").on("value", function(snapshot) {
		var c = [];
		var session = [];
		var ht ='';
		snapshot.forEach(function(childSnapshot) {
			///debugger;
			var key = childSnapshot.key;
			
				// value, could be object
				var childData = childSnapshot.val(); 
				 //console.log(childSnapshot.key);
				c.push(childSnapshot.key);
				var ht ='';	
				var complete = 0;
				var comper = 0;
				if(childSnapshot.key == ct || childSnapshot.hasChild("Bundle")){
					window.onunload = function() {
					var t = window.localStorage.getItem("cat");
				window.localStorage.setItem("prevcat",childSnapshot.key);
			 // localStorage.removeItem("cat");
			  //return '';
			};
					session.push(childData.Session);
					$.map(childData.Bundle, function(value, index) {
						var total = Object.keys(value.Session).length;
						var desc = value.bundle_description.substring(0, 80)+ '....';
						complete = 0;
									comper = 0;
						$.map(user.streak, function(value2, index2) {
							console.log(index+'=='+index2);
							if(index == index2){
									complete =	Object.keys(value2.Session).length;
									comper =((complete*100)/total);
										}
							});
								
									
						if(user.membership_type == 'Free'){

							ht = ht + '<div class="col-md-4 boxStyle hover-box1 p-0" style="background-image: url('+value.bundle_img+');"><p class="Centerb b">'+value.bundle_name+'</p><p style="font-size:16px;"> <span>'+complete+'</span> Of '+total+'</p><div class="progress" style="height:7px;width:80%;margin:auto;"><div class="progress-bar" style="height:10px;width:'+comper+'%;"></div></div><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" id="'+value.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div><div class="box1a"><i class="fa fa-lock fa-2x center"></i></div></div>';
						}else{

							ht = ht + '<div class="col-md-4 boxStyle hover-box1 p-0" style="background-image: url('+value.bundle_img+');"><p class="Centerb b">'+value.bundle_name+'</p><p style="font-size:16px;"> <span>'+complete+'</span> Of '+total+'</p><div class="progress" style="height:7px;width:80%;margin:auto;"><div class="progress-bar" style="height:10px;width:'+comper+'%;"></div></div><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" id="'+value.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';
						}
					});	
				}	
			//	ht +='</div></div>';
				$(".cat1").append(ht);

	//$("div.boxStyle").append('<div class="box1a"><i class="fa fa-lock fa-2x center"></i></div>');
	
/*$(".hover-box1").bind('touchstart', function(event){
		//alert('test');
       $(this).toggleClass('hover-box1a');
});*/
	  $('.hover-box1').hover(function() {
$(".hover-box1").css("top",0);
          //$(this).toggleClass('hover-box1a');
     });
				$(".btn").click(function() {
				  //alert($(this).attr('id'));
				  if(window.localStorage.getItem("cat")){

				  var ct = window.localStorage.getItem("cat");
				  }else{
				  var ct = "Quick Dive";
				  	
				  }

				  var flag = false;
			var t ='';
			var bundle = $(this).attr("id");
			//alert(bundle);
			firebase.database().ref("Category/Quick Dive/Bundle/"+bundle).on("value", function(snapshot) {
										snapshot.forEach(function(childSnapshot) {
											var data = childSnapshot.val();
											var key = childSnapshot.key;
											console.log(key);
												if(key != 'Session'){
														flag = false;
												}else if(key == 'Session' && data == ''){
														flag = false;
													
												}else{
													flag = true;
													return true;
												}
								
										});
										
											/*if(childSnapshot.hasChild("Bundle")){
													$.map(data.Bundle, function(value, index) {
														t = value.Session ? value.Session : {};
														if(value.hasOwnProperty('Session')){
														//console.log(value);
														
															flag = true;
														}
														if(!value.hasOwnProperty('Session')){
															flag = false;
														}
													});
											}*/
											
								});

					if(flag){
							var bundle = $(this).attr("id");
							$.redirect("bundle.php",{bundle: bundle},"POST",null,null,true);
						
					}else{
							
									//	alert("there is no session");
										swal("There is no session available!");
					}
				});
		});
		
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



		
	/*	$("div").find("p").hover(function(){
			
			//alert(55);
			
			alert($(this).html());
			
		});*/
		
		
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
		var url = "http://localhost/DiveThru/player.php";
		window.location.href = url;

	});
	
	