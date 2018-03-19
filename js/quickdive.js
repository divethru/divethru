  
  /*Getting last inserted quotes */
		$(".cat").html("");
		
		
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
				if(childSnapshot.key == 'Quick Dive'){
					session.push(childData.Session);
					$.map(childData.Bundle, function(value, index) {
						var desc = value.bundle_description.substring(0, 100);
						//ht = ht + '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.bundle_img+');"><p class="Center bundle" id="'+value.bundle_id+'">'+value.bundle_name+'</p></div>';
						ht = ht + '<div class="col-md-4 boxStyle hover-box1 p-0" style="background-image: url('+value.bundle_img+');"><p class="Center">'+value.bundle_name+'</p><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" id="'+value.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';;
					});	
				}	
			//	ht +='</div></div>';
				$(".cat1").append(ht);
				$(".btn").click(function() {
				  //alert($(this).attr('id'));
				  
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
							
										alert("there is no session");
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
	
	