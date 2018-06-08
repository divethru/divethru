

$(".dropdown-item").click(function(){
	var cat = $(this).data("cat");
	var page = $(this).text();
	 var x = $(this).prev();
	 console.log(x);
	firebase.database().ref("Category").on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
	//alert(childSnapshot.key);
		if(childSnapshot.hasChild("SubCategory") ){
							var childData = childSnapshot.val();
				$.map(childData.SubCategory, function(value, index) {
					//console.log(value);
					//alert(value.Bundle);
				if(page == "MAIN" && value.Bundle != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				window.location = "DeepMain.php";
					
				}else if(page == "INDIVIDUAL" && value.Bundle != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				window.location = "individual.php";
					
				}
			});
			}
			
		});
		
	});
});

$(".nav-link").click(function(){
//$(".dropdown-item").click(function(){
	var cat = $(this).text();
	firebase.database().ref("Category").on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
	console.log(childSnapshot.key);

		
			if(childSnapshot.hasChild("Bundle") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");
				window.localStorage.setItem("back",false);
				//window.location = "quickdive.php";
				
			}
			if(childSnapshot.hasChild("SubCategory") &&  (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("SubCategory").val() != ""){
				window.localStorage.setItem("cat",childSnapshot.key);
				console.log("quick");
				window.localStorage.setItem("back",false);
				//window.location = "quickdive.php";
				
			}
			if( (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() == "" && childSnapshot.child("SubCategory").val() == ""){
				console.log("open");
				window.localStorage.setItem("cat",childSnapshot.key);
				window.localStorage.setItem("back",false);
				//window.location = "opendive.php";
				window.location = "session.php";
			}
		});
		
	});
	

});

$('a').each(function(){
                var path = window.location.href;
                var current = path.substring(path.lastIndexOf('/')+1);
                var url = $(this).attr('href');
                if(url == current){
                    $(this).addClass('active');
                };
            });     