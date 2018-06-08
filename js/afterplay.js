var user = JSON.parse(window.localStorage.getItem('user'));

var img = window.localStorage.getItem('session_img');
var color = window.localStorage.getItem('colorcode');
$(".part1").css('background-color', 'rgb('+color+') ');
if(color == "100,52,140"){
	$(".part1").css("color","#9E9E9E");
}
$(".part2 > i").css('color', 'rgb('+color+') ');
			
$(".part1").css('background-image', 'url('+img+') ');
$(".meditate-time").html(user.total_time_divethru);
var Sessiondata = JSON.parse(window.localStorage.getItem("SESSIONDATA"));
$(".shareimg").attr("src",Sessiondata.session_quote_img);
$(".quotetext").html(Sessiondata.session_quote_description);
  var link=document.createElement('meta');
  link.name="twitter:description";
  link.content=Sessiondata.session_description;
  document.getElementsByTagName('head')[0].appendChild(link);
 $('head').append('<meta name="twitter:description" content="'+Sessiondata.session_quote_description+'">');
 firebase.database().ref("Users/"+user.user_id).on("value", function(snapshot) {
 	window.localStorage.setItem("user",JSON.stringify(snapshot.val()));
 	var data=snapshot.val();
	 	if(data.currentStreak){
	     $.map(data.currentStreak, function(value, index) {
	            $.map(value, function(value2, index2) {
	                  if(index2 == "SubCategory" ){
	                    $.map(value2, function(value3, index3) {
	                          $.map(value3, function(value4, index4) {
	                            if(index4 == "Bundle"){
	                               $.map(value4, function(value5, index5) {
	                              	 	$.map(value5, function(value6, index6) {
	                              	 		if(index6 == "Session"){

	                  					$(".currentday").html(Object.keys(value6).length);
	                              	 		}
	                                  		console.log("SSSD"+Object.keys(value4).length);
	                                  		//alert("DEP"+Object.keys(value6).length+"index"+index6);
	                                  		//console.log(value6);
	                                	});
	                                });
	                            }else if(index4 == "Session"){
	                                //$.map(value4, function(value5, index5) {
	                  			$(".currentday").html(Object.keys(value4).length);
	                                  		console.log("SSS"+Object.keys(value4).length);
	                                //});

	                            }
	                         });
	                    });
	                  }else if(index2 == "Bundle"){
	                    $.map(value2, function(value3, index3) {
	                    //  console.log(index3);
	                           $.map(value3, function(value4, index4) {
	                                console.log(Object.keys(value4).length);
	                                if(index4 == "Session"){

	                  					$(".currentday").html(Object.keys(value4).length);
	                               		console.log("SS3"+Object.keys(value4).length);
	                                }
	                                  /*$.map(value4, function(value5, index5) {
	                                	});*/
	                           });
	                    });
	                  }else if(index2 == "Session"){
	                  			$(".currentday").html(Object.keys(value2).length);
	                               		console.log("SS2"+Object.keys(value2).length);
	                    
	                  }
	                });

	     });
	}

 });