	var user = JSON.parse(window.localStorage.getItem('user'));


	window.UTGS = [];
			if(user.tags){
				window.UTGS = user.tags.split(',');
				console.log(window.UTGS);
			}
/************************ tag list from db ****************************/

firebase.database().ref("Tags").orderByChild("tags_category_id").on("value", function(snapshot) {
			var i = 0;
			window.html1 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';
		
			window.html2 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';
			
			window.html3 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';
			
			window.html4 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';
			
			window.HTML = '<ul class="nav nav-tabs" role="tablist">';
			window.HTML2 = '<div class="tab-content">';
			
			snapshot.forEach(function(childSnapshot) {
				var a = ["chk_decyour","chk_hopacc","chk_premo","chk_obface"];
				// key
				
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
				
				if(i == 0){
					//alert(555);

				window.HTML += '<li class="nav-item"><a class="nav-link active" href="#'+childData.tags_category+'" role="tab" data-toggle="tab">'+childData.tags_category+'</a></li>';
				}else{
					
				window.HTML += '<li class="nav-item"><a class="nav-link" href="#'+childData.tags_category+'" role="tab" data-toggle="tab">'+childData.tags_category+'</a></li>';
				}
				var trainindIdArray = childData.tags.split(',');
				
				window.HTML2 += '<div role="tabpanel" class="tab-pane fade in active" id="'+childData.tags_category+'">';
										window.HTML2 = '<div class="form-group" style="text-align:left;">';
						$.each(trainindIdArray, function(index, value) { 

							if($.inArray(value, window.UTGS) != -1){

							window.HTML2 += '<div class="form-check my-2"><label><input class="form-check-input" type="checkbox" name="'+a[i]+'" class="'+a[i]+'" value="'+value+'" id="defaultCheck'+index+'" checked>'+value+'</label></div>';
							}else{
													
							window.HTML2 += '<div class="form-check my-2"><label><input class="form-check-input" type="checkbox" name="'+a[i]+'" class="'+a[i]+'" value="'+value+'" id="defaultCheck'+index+'">'+value+'</label></div>';
							}
							//window.html1 += '<div class="checkbox"><label><input type="checkbox" name="'+a[i]+'" class="'+a[i]+'" value="'+value+'"> &nbsp;'+value+'</label></div>';
							
										//alert();
						//    alert(index + ': ' + value);   // alerts 0:[1 ,  and  1:2]
						});

							window.HTML2 += '</div>	';
							if(i == 0){
							///	$("#tagselection > div .modal-content .modal-header .modal-title").html("Select from the option below to describe"+$(".panel-title").html());
								//$("#tagselection > div .modal-content .modal-body").html(window.HTML2);
								$("#step-1").find(".panel-title").html(childData.tags_category);
								$("#step-1").find(".panel-body").find(".content").html(window.HTML2);
							//	alert(childData.tags_category);
							}else if(i == 1){
							//	$("#tagselection > div .modal-content .modal-header .modal-title").html(childData.tags_category);
								
								$("#step-2").find(".panel-title").html(childData.tags_category);
								$("#step-2").find(".panel-body").find(".content").html(window.HTML2);
								//alert(childData.tags_category);
							}else if(i == 2){
								
							//	$("#tagselection > div .modal-content .modal-header .modal-title").html(childData.tags_category);
								$("#step-3").find(".panel-title").html(childData.tags_category);
								$("#step-3").find(".panel-body").find(".content").html(window.HTML2);
								//alert(childData.tags_category);
							}else if(i == 3){
							//	$("#tagselection > div .modal-content .modal-header .modal-title").html(childData.tags_category);
								
								$("#step-4").find(".panel-title").html(childData.tags_category);
								$("#step-4").find(".panel-body").find(".content").html(window.HTML2);
								//alert(childData.tags_category);
							}
			
				i++;
				
			});


		window.HTML += "</ul>";
		window.HTML2 += "</div>";
			window.html1 += "<div><button class='btn btn-info'>NEXT</button></div></div></div></div>";
			window.html2 += "<div><button class='btn btn-info'>NEXT</button></div></div></div></div>";
			window.html3 += "<div><button class='btn btn-info'>NEXT</button></div></div></div></div>";
			window.html4 += "<div><button class='btn btn-info'>NEXT</button></div></div></div></div>";

	
});
			
/************************ / tag list from db ****************************/		


			
/***************************** show tag's list to user *************************/

$("body").on('click','.updatefeed',function(){
	//alert(window.HTML2);
	$("#tagselection").modal("show");
	/*console.log(window.HTML2);
	$(".wizard").show();
	$(".plib").hide();*/
});

/***************************** / show tag's list to user *************************/	


$("body").on('click', ".finish", function () {
	//	alert($(".form-check").find("input:checkbox:checked").val());

	$.each($("input[type='checkbox']:checked"), function (index, value) {
		//alert($(this).val());
		favorite.push($(this).val());
	});
	window.f = favorite;
	var db = firebase.database();
	var t = favorite.toString();
	db.ref("Users/" + user.user_id).update({ tags: t });
	//dowload_list(favorite);
	var curStep = $(this).closest(".setup-content"),
		curStepBtn = curStep.attr("id"),
		nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
		curInputs = curStep.find(".form-check").find("input[type='text'],input[type='checkbox']"),
		curInputs2 = curStep.find(".form-check").find("input:checkbox:checked"),
		isValid = true;
	$(".form-group").removeClass("has-error");
	//  for (var i = 0; i < curInputs.length; i++) {
	// if (!curInputs[i].prop("checked")) {
	//  alert(window.f.toString());
	if (curInputs2.length <= 0) {
		$(this).prev("span").remove();
		$(this).before("<span style='color:red;'>Please select at least one tag.!!</span>");
		//alert();
		isValid = false;
		$(curInputs[i]).closest(".form-group").addClass("has-error");
	} else if (curInputs2.length > 0) {
		$(".cat").html(window.ht);
		$("#tagselection").modal("hide");
	}

	//alert(user.user_id);

	//console.log(favorite);
});
