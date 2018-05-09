
if(window.performance.navigation.type>0){
	window.localStorage.setItem("back",true);
}else{
	window.localStorage.setItem("back",false);	
}
  
  /*Getting last inserted quotes */
		$(".cat").html("");
	var user = JSON.parse(window.localStorage.getItem('user'));	
		
	 $('.hover-box1').hover(function() {
$(".hover-box1").css("top",0);
          //$(this).toggleClass('hover-box1a');
     });

$(".ptext").hide();
//Here is The The code To show Open Dive session
firebase.database().ref("Category").orderByChild("session_id").on("value", function(snapshot) {
		var c = [];
		var session = [];
		var content = '';
		snapshot.forEach(function(childSnapshot) {
			///debugger;
			var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val(); 
								window.localStorage.setItem("subcription_type",childData.session_subcription_type);
				 //console.log(childSnapshot.key);
				c.push(childSnapshot.key);
				var ht ='';	
				var complete = 0;
				var comper = 0;
				if(childSnapshot.hasChild("SubCategory")){
				//	session.push(childData.Session);
				//localStorage.setItem('prevcat',key);
				window.check = true;
					$.map(childData.SubCategory, function(value, index) {
						
						content += '<div class="container-fluid text-center"><div class="container pad2"><div class="row my-5 justify-content-center justify-content-md-start"><h4>'+value.subcategory_name+'</h4></div>';
						
							content += '<div class="row px-5 bnd">';
						
						$.map(value.Bundle, function(value2, index2) {
								window.check = false;
							if(value2.Session){
								var total = Object.keys(value2.Session).length;
							}else{
								var total = 0;
							}
							
							//alert(total);

							if(value2.bundle_description.length <= 80){
							var desc = value2.bundle_description.substring(0, 80)+ '....';
							}else{
								
							var desc = value2.bundle_description.substring(0, 80);
							}
							complete =	0;
									comper = 0;
									var c = [];
									var cp = [];
							$.map(user.streak, function(value3, index3) {
								if(index2 == index3){
									complete =	Object.keys(value3.Session).length;
									comper = ((complete*100)/total);
								}
								c.push(complete);
								cp.push(comper);
							});
									console.log(complete);
									// code for make diiferent on progress bar according to memmbership type
									if(user.membership_type != "Free"){
										if(complete >= 1){

											complete = 1;
											comper = ((complete*100)/total);
										}
									}else{
										complete = complete;
										comper = ((complete*100)/total);
									}
									if(user.membership_type == "Free"){
												content += '<div class="col-md-4 col-xs-6 hover-box1 p-0 boxStyle" style=" background-image: url('+value2.bundle_img+');"><p class="Centerblock bundle" id="'+value.subcategory_id+'">'+value2.bundle_name+'</p><p class=" mt-5" style="font-size: 18px; "> <span>Try for free</p><div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" data-sub="'+value.subcategory_id+'"  data-total="'+total+'" data-img="'+value2.bundle_img+'"  data-bundle="'+value2.bundle_name+'" id="'+value2.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';

									}else{
											content += '<div class="col-md-4 col-xs-6 hover-box1 p-0 boxStyle" style=" background-image: url('+value2.bundle_img+');"><p class="Centerblock bundle" id="'+value.subcategory_id+'">'+value2.bundle_name+'</p><p class="ptext mt-4" > <span>'+complete+'</span> Of '+total+'</p><div class="progress" style="height:7px;width:80%;margin:auto;"><div class="progress-bar" style="height:10px;width:'+comper+'%;"></div></div>	<div class="hover-box1a text-center text-white"><h2>Description</h2><p class="m-0">'+desc+'</p><div class="btn btn2 btn-outline-light" data-sub="'+value.subcategory_id+'"  data-total="'+total+'" data-img="'+value2.bundle_img+'"  data-bundle="'+value2.bundle_name+'" id="'+value2.bundle_id+'" style="border-radius: 0;">S E S S I O N</div></div></div>';		
									}
								
								
								
							
							
						//alert(((1*100)/total));
						//ht = ht + '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.bundle_img+');"><p class="Center bundle" id="'+value.bundle_id+'">'+value.bundle_name+'</p></div>';
				
						});	
						content += '</div>';
						content += '</div></div>';
					});	
				}	
			//	ht +='</div></div>';
			
		});
if(window.check == true){
	$(".ptext").css("display","unset");
}

				$(".cat1").html(content);
				 $(".page-loader-wrapper").fadeOut();	
				$('.hover-box1').hover(function() {
$(".hover-box1").css("top",0);
          //$(this).toggleClass('hover-box1a');
     });
	// 			$(".btn").click(function(){
	// 	var sid = $(this).data('sub');
	// 	var id = $(this).attr("id");
	// 	var bundle = $(this).text();
	// 	window.localStorage.setItem("bundle",bundle);
	// 	//$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
	// 	//alert(id);
	// });

		$(".btn").click(function(){
		//alert($(this).data("total"));
		 var user = JSON.parse(window.localStorage.getItem('user'));
		var sid = $(".Center").attr("id");
		var id = $(this).attr("id");
		if(user.membership_type != "Free"){
			$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
		}else{
			if($(this).data("total") > 1){

				$("#memberModal").modal("show");
				$(".modal-content").css("background-image","url('"+$(this).data("img")+"')");
				$("#exampleModalLongTitle").html($(this).data("bundle"));
			}else if($(this).data("total") == 0){

				swal("No session available right now!");
			}else if($(this).data("total") == 1){
			$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
				//swal("No session available right now!");
			}

			$(".freetrial").click(function(){
				$("#memberModal").modal("hide");
				$.redirect("individual.php",{'bundle': id,'subcatid': sid},"POST",null,null,true);
			});

			$(".subscribe").click(function(){
				var cycle = $(this).data('cycle');
				var plan = $(this).data('plan');
				var price = $(this).data('amount');
				window.localStorage.setItem("session_name",$("#exampleModalLongTitle").html());
				$("#memberModal").modal("hide");
					$.post("http://34.215.40.163/test.php", {"price": price}, function(result){
			        console.log(result);
			
			
			localStorage.setItem('session_id',id);
//			localStorage.setItem('session_name',$(".current").html());
//			localStorage.setItem('subcategory_id',$(".box_12 > p").attr("id"));
			localStorage.setItem('prevcat','Deep Dive');
			localStorage.setItem('payment','true');
				 //$.redirect("Process.php",{select_cycles: cycle ,product_name : "session","select_plan":plan,"price":price,"userid":user.user_id,"token":result},"POST",null,null,true);
				});
			});
		}
	//	alert(id);
	});
			console.log(content);
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
	