<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>My Streak</title>
<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link href="css/mystreak.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/dashboard.css">
<link rel="stylesheet" href="css/dashheader.css">
<link rel="stylesheet" href="css/footercss.css" type="text/css">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="css/journel.css" rel="stylesheet" type="text/css">
<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
 <script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
<script>
	
          // Initialize Firebase
          var config = {
    apiKey: "AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw",
    authDomain: "divethru-71c56.firebaseapp.com",
    databaseURL: "https://divethru-71c56.firebaseio.com",
    projectId: "divethru-71c56",
    storageBucket: "divethru-71c56.appspot.com",
    messagingSenderId: "53159239409"
  };
  
  firebase.initializeApp(config);
</script>
<style>
/* Page Loader ================================= */
.page-loader-wrapper {
  z-index: 99999999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: hidden;
  text-align: center; }
  .page-loader-wrapper p {
    font-size: 13px;
    margin-top: 10px;
    font-weight: bold;
    color: #444; }
  .page-loader-wrapper .loader {
    position: relative;
    top: calc(50% - 30px); }

</style>
</head>

<body style="margin-top: 100px;">
  <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <!-- <div class="loader"> -->
       <img src="img/loader.gif" style="margin-top: 10% !important;">
     <!-- </div> -->
    </div>
    <!-- #END# Page Loader -->
<!--HEADER-->
	
<?php   include 'dashbordHeader.php'; ?>

<!--	
BODY-->

<!--SLIDER-->

<div class="container-fluid slider-bg py-5">

	<div class="container">
	     
		<div class="row justify-content-center text-center">
		     
			<div class="col-2 text-right">
			    <h2 class="center1">Current</h2>
			</div>
			
			<div class="col-6 col-md-3">
			    <div class="card text-white card1">
                     <img class="card-img1 marg" src="img/triangle.png" style="max-width: 150px; height: auto;" />
                            <div class="card-img-overlay1 center triangle">
                                     <p class="pt-4 "><span class="currentday">0</span><br>Day</p>
                            </div>
                </div>
			</div>
			
			<div class="col-2">
			    <h2 class="center2">Streak</h2>
			</div>

		</div>
		
	</div>

</div>
	
<!--CONTENT-->
	
<div class="container-fluid py-5">
	
     <div class="container">
	      
		 <div class="row justify-content-center">
		      <div class="col-md-4 col-lg-4 text-center option">
			      <img src="img/stat reminder logo.png" style="width: 80px; height: 80px;" />
				  <h6 class="pt-3">TOTAL TIME</h6>
				  <h6>DIVING THRU</h6>
				  <h2 class="pt-3 totaltime">10<span style="color:#34495e;">MIN</span></h2>
			  </div>
			 <div class="line"></div>
			 <div class="col-md-4 col-lg-4 text-center option">
			     <img src="img/stat divethru logo.png" style="width: 80px; height: 80px;" />
				  <h6 class="pt-3">COMPLETED</h6>
				  <h6>CONVERSATION</h6>
				  <h2 class="pt-3 compconv">30</h2>
			 </div>
		 </div>
	   <hr class="mt-5"/>
	</div>
	
</div>
	
	

<div class="container-fluid pb-5">
	
     <div class="container">
		   
		   <div class="row">
	      
		 <div class="col-10 dive">
		     <h2>Dive With Friends</h2>
		 </div>
		 
		 <div class="col-2 text-center">
		     <img src="img/add.png" class="img-fluid" style="max-width: 40px; height: auto;" />
		 </div>
			   
		  </div>
	 
    </div>
	
</div>

<!----- Jounral block -->	
	<div class="container-fluid">
	    <div class="container">
		<div class="jounral">
			<div class="row my-md-5 my-4">
				<div class="col-12 text-center march">
		            <h2 id="monthyear"></h2>
				</div>
		    </div>
			
		
		 	<div class="row my-md-5 my-3">
			    <div class="col-md-2 col-4 my-auto text-center date">
				    <h4></h4>
				</div>
				<div class="col-md-10 col-8 my-auto content">
				    <p></p>
				</div>
			</div>
			
			
		</div> 
			
			<div class="row my-5 load" style="display: none;">
			   <div class="col-12 text-center">
				    <h3 class="loadmore" style="cursor: pointer;"><i><u>Load More</u></i></h3>
			   </div>
			</div>
			
		</div>
	</div>
<!----- Jounral block End-->
	
<!--FOOTER-->
<?php  include 'footer.php'; ?>
<script src="js/signout.js"></script>


<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/dashboardheader.js"></script>
<script type="text/javascript">
		$(document).ready(function(){
var user = JSON.parse(window.localStorage.getItem('user'));
	
			var catRef = firebase.database().ref("Users").child(user.user_id);
			// firebase.database().ref('Users/'+user.user_id+"/streak").set(null);
   //  catRef.on('child_changed', function(snapshot) {
			// location.reload(true);
   //  });
 window.localStorage.setItem("streakcount",10);                 			
if(user.currentStreak){
     $.map(user.currentStreak, function(value, index) {
            $.map(value, function(value2, index2) {
                  if(index2 == "SubCategory" ){
                    $.map(value2, function(value3, index3) {
                          $.map(value3, function(value4, index4) {
                            if(index4 == "Bundle"){
                               $.map(value4, function(value5, index5) {
                              	 	$.map(value5, function(value6, index6) {
                  			$(".currentday").html(Object.keys(value6).length);
                                  		console.log(Object.keys(value6).length);
                                	});
                                });
                            }else if(index4 == "Session"){
                                //$.map(value4, function(value5, index5) {
                  			$(".currentday").html(Object.keys(value4).length);
                                  		console.log(Object.keys(value4).length);
                                //});

                            }
                         });
                    });
                  }else if(index2 == "Bundle"){
                    $.map(value2, function(value3, index3) {
                    //  console.log(index3);
                           $.map(value3, function(value4, index4) {
                                console.log(Object.keys(value4).length);
                  			$(".currentday").html(Object.keys(value4).length);
                                  /*$.map(value4, function(value5, index5) {
                                	});*/
                           });
                    });
                  }else if(index2 == "Session"){
                  			$(".currentday").html(Object.keys(value2).length);
                               		console.log(Object.keys(value2).length);
                    
                  }
                });

     });
}

			$('a').each(function(){
                var path = window.location.href;
                var current = path.substring(path.lastIndexOf('/')+1);
                var url = $(this).attr('href');
                if(url == current){
                    $(this).addClass('active');
                };
            });     
  
  
			
			var m_names = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];
			   var month = '';
			   var year = '';
			   var mn = '';
			  // var mn2 = '';
			   var content = '';
			   var cn = '';
			   var t = [];
			   var cnt = [];
			
			//console.log(user.currentStreak);

			var totalconv = 0;
			//var totalconv = user.last_free_conversation_id;
			 if (user.total_time_divethru > 59) {
				var min =  user.total_time_divethru % 60;
				var hour = + Math.floor(user.total_time_divethru / 60);
				
				if(min > 0){
					
				$(".totaltime").html(hour+'<span style="color:#34495e;">HOURS</span>'+min+'<span style="color:#34495e;">MIN</span>');
				}else{
					
				$(".totaltime").html(hour+'<span style="color:#34495e;">HOURS</span>');
				}
 			}else{
				
			$(".totaltime").html(user.total_time_divethru+'<span style="color:#34495e;">MIN</span>');
			}
			//if(user.membership_type != "Free"){
			if(user.streak){

				$.map(user.streak, function(value, index) {
					if(value.Session){
					Object.keys(value.Session).length;
						$.map(value.Session, function(value2, index2) {
							if(value2.total_visit){
								
							totalconv = totalconv + value2.total_visit;
							}else{
							totalconv = totalconv + value2.total_visited;
								
							}
						});
					}
				});
				$(".compconv").html(totalconv);
			}
			else{
				totalconv=0;
				$(".compconv").html(totalconv);
			}
				// console.log(Journal);
			
			firebase.database().ref("Journal").on("value", function(snapshot) {
				 console.log(snapshot.val());
					snapshot.forEach(function(childSnapshot) {
						var key = childSnapshot.key;
						var childData = childSnapshot.val();
						//console.log(childData);
						if(key == user.user_id){
								$.map(childData, function(value, index) {
									var p = value.date.replace(/-/g, "/");
									var dt = new Date(p);
									month = m_names[dt.getMonth()];
								    year = dt.getFullYear();
									var um = m_names[dt.getMonth()];
									//console.log(month);
									cnt.push(value);
								/*	cn += '<div class="row my-md-5 my-3"><div class="col-md-2 col-4 my-auto text-center date"><h4>'+dt.getDate()+'<br>'+value.category_name.slice(0, value.category_name.indexOf(" "))+'</h4></div><div class="col-md-10 col-8 my-auto content"><p>'+value.journal_text+'</p></div></div>';*/
					t[month+' '+year] = cnt;
								});
								/*mn += '<div class="row my-md-5 my-4"><div class="col-12 text-center march"><h2 class="monthyear">'+month.toUpperCase()+' '+year+'</h2></div> </div>';*/
						}
						else{
							$(".page-loader-wrapper").fadeOut();
						}
					});
						var count = 0;
						//t.reverse();
						console.log(cnt);
						// for(var tu in cnt ){
						// 	console.log(cnt[tu]['date']);
						// 	var dt = new Date(cnt[tu]['date']);
						// 	month = m_names[dt.getMonth()];
						// 	console.log(month);
						// 	var m_names = ['January', 'February', 'March', 
      //          'April', 'May', 'June', 'July', 
      //          'August', 'September', 'October', 'November', 'December'];

						// }
						// for(var k in t){
						// //$.each(keys, function(i) {
						//     //console.log(keys[i]);
						//     for(j in t[k] ){
						//     	console.log(t[k]);
						//     	 console.log(t[k][j]);
						//     }
						// }
						//});
						
					for(i in t){
						//console.log(i);
						if(count == 0){
							
						content += '<div class="row my-md-5 my-4 month"><div class="col-12 text-center march"><h2 class="monthyear">'+i+'</h2></div> </div>';
						}else{
						content += '<div class="row my-md-5 my-4 month jn hidden"><div class="col-12 text-center march"><h2 class="monthyear">'+i+'</h2></div> </div>';
							
						}
							for(j in t[i] ){
								var dt = new Date(t[i][j].date.replace(/-/g, "/"));
								var um = m_names[dt.getMonth()];
								var fl = um +' '+dt.getFullYear();
								//console.log(j);
								
								if(i == fl){
									if(j < 10){
											content += '<div class="row my-md-5 my-3 jn" data-count='+j+'><div class="col-md-2 col-4 my-auto text-center date"><h4>'+dt.getDate()+'<br>'+t[i][j].category_name+'</h4></div><div class="col-md-10 col-8 my-auto content"><p>'+t[i][j].journal_text+'</p></div></div>';
											
											
									}else{
										content += '<div class="row my-md-5 my-3 jn hidden" data-count='+j+'><div class="col-md-2 col-4 my-auto text-center date"><h4>'+dt.getDate()+'<br>'+t[i][j].category_name+'</h4></div><div class="col-md-10 col-8 my-auto content"><p>'+t[i][j].journal_text+'</p></div></div>';
										$(".load").css("display","unset");
									}
								
								}
								//console.log(t[i][j].category_name);
							}
								count++;
					}
					
				var  clickcount = 0;
				
					var fn = mn+cn+'<div class="row my-5 load"><div class="col-12 text-center"><h3><i><u>Load More</u></i></h3></div></div>';
					$(".jounral").html(content);
						$(".jn").each(function(index){
								if($(this).data("count") == 9 && !$(this).hasClass("hidden")){
					 				$(".month").removeClass("hidden");
					 				console.log($(".month").html());
					 			}
					 				console.log($(this).data("count"));
					 			
							});
					 $(".month").each(function(index){

					 });
					$(".loadmore").click(function(){
							//console.log($(".month").length);
							if(parseInt(window.localStorage.getItem("streakcount"))){
								showcount=parseInt(window.localStorage.getItem("streakcount"));
								//console.log(showcount+10);
								window.localStorage.setItem("streakcount",showcount+10);
							}
							else{
								showcount=10
								window.localStorage.setItem("streakcount",10);
							}
							$(".jn").each(function(index){
								if($(this).hasClass("month")){
									$(this).addClass("hidden");
								}

								if($(this).hasClass("hidden")){
									for(var i=showcount;i<showcount+10;i++)
									{
										if($(this).data("count")==i){
										//console.log(i);
											$(this).removeClass("hidden");
											$(this).removeClass("hidden");
											$(".month").removeClass("hidden"); //change have to made
											// $(".load").css("display","none");
										}
									}
								}
								
							});
						 // $(".month").each(function(index){
							// // 	// console.log(index);
							// // 	// console.log(clickcount);
							// // 	//if(index == clickcount){
									
							// // //alert(clickcount);
							// // 	//}
						
							//  	if($(this).eq(index).nextAll(".jn").hasClass("hidden")){
							// // 		//console.log($(this).eq(index).nextAll(".jn").data("count"));
							//  		 $(this).eq(index).nextAll(".jn").removeClass("hidden");
							//  		 $(this).eq(index).nextAll(".month").removeClass("hidden");
							// // 		// $(".load").css("display","none");
							//  	}
							// // 	//if($(this).eq(index).hasClass("hidden")){
							// // //		alert("index"+index);
							// // 	//}
								
							//  });
							//clickcount++;
						});
			console.log(t);
			//console.log(jQuery.isEmptyObject(t));
			var chk=jQuery.isEmptyObject(t);
			
			if(chk==true){
				
				content += '<div class="row my-md-5 my-4 month"><div class="col-12 text-center march"><h2 class="monthyear">No Journal Available!!</h2></div> </div>';
				$(".jounral").html(content);
				
			}
			//
			});
 	
			
		/*	var journaldes = <?php //echo json_encode($Journal);?>;
			var jtext=$('#journaltext').val(journaldes.journal_text);
			console.log(jtext);*/

			$(".page-loader-wrapper").fadeOut();
		});
	</script>
</body>
</html>
