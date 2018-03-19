  
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
				if(childSnapshot.key == 'Open Dive'){
					session.push(childData.Session);
					$.map(childData.Session, function(value, index) {
						ht = ht + '<div class="col-md-4 col-xs-6 boxStyle" style=" background-image: url('+value.session_img+');"><p class="Center bundle">'+value.session_name+'</p></div>';
					});	
				}	
			//	ht +='</div></div>';
				$(".cat1").append(ht);
				
				
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
		var url = "http://localhost/DiveThru/player.php";
		window.location.href = url;

	});
	
	