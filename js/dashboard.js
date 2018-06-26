
var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) { $_GET[name] = value; });
if ($_GET['auth']) {
	$(".page-loader-wrapper").css("display", "unset");
	$(".page-loader-wrapper2").hide();
} else {
	$(".page-loader-wrapper2").show();
}
/*$('#exampleModalCenter').modal('hide');*/

firebase.auth().onAuthStateChanged(function (user) {
	if (!user) {
		window.location.href = "login.php";
		// User is signed in.
	} else {
		// 	console.log(user.uid);
		auth = user;
		firebase.database().ref("Users/" + user.uid).on("value", function (snapshot) {
			window.localStorage.setItem('user', JSON.stringify(snapshot));
			snapshot.forEach(function (childSnapshot) {
				$(".page-loader-wrapper2").hide();
				// key
				var key = childSnapshot.key;
				// value, could be object
				var childData = childSnapshot.val();
				if (key == 'last_free_conversation_id') {
					day = childData + 1;
					if (day != 11) {

						$(".day").html(childData + 1);
					} else {
						$(".day").html(childData);

					}
					window.localStorage.setItem('content', day);
					//					window.localStorage.setItem('content', childData);
					//	console.log("g"+childData);
				}
				if (key == 'payment') {
					$.map(childData, function (value, index) {
						var currentdate2 = new Date();
						var currentdate = new Date(value.date);
						var datetime =
							+currentdate.getFullYear() + "-"
							+ ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
							+ ("0" + currentdate.getDate()).slice(-2) + " "
							+ currentdate.getHours() + ":"
							+ currentdate.getMinutes() + ":"
							+ currentdate.getSeconds();
						var timeDiff = Math.abs(currentdate2.getTime() - currentdate.getTime());
						var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
						if (diffDays > 30) {

							//firebase.database().ref("Users/"+user.uid).update({membership_type:"Free"});
							//console.log(currentdate2.getTime()+"-"+currentdate.getTime());
						} else {
							//console.log("subcribe");
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




//alert(ba_bundle_id);

//for get session paid detail
var cname = "/IndividualSubscription";
var subcate_index = [];
var final_conve_data = [];
var final_conve_data1 = [];
window.cat_index = 0;
firebase.database().ref("Users/" + user.user_id + cname + "/session").once("value", function (snapshot) {
	//alert();
	snapshot.forEach(function (childSnapshot) {

		//	console.log(childSnapshot.val());
		//alert(childSnapshot.val());
		childData = childSnapshot.val();
		final_conve_data.push(childData['id']);

	});
	//console.log(final_conve_data);

	window.localStorage.setItem("cove_data", JSON.stringify(final_conve_data));

});
firebase.database().ref("Users/" + user.user_id + cname + "/bundle").once("value", function (snapshot) {
	//alert();
	snapshot.forEach(function (childSnapshot) {

		//console.log(childSnapshot.val());
		//alert(childSnapshot.val());
		childData = childSnapshot.val();
		final_conve_data1.push(childData['id']);

	});
	//console.log(final_conve_data);

	window.localStorage.setItem("cove_data2", JSON.stringify(final_conve_data1));

});

/*Getting last inserted quotes */

firebase.database().ref("DailyQuotes").orderByChild("quote_id").limitToLast(1).on("value", function (snapshot) {
	snapshot.forEach(function (childSnapshot) {
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
//window.ht;
window.UTGS = [];
if (user.tags) {
	window.UTGS = user.tags.split(',');
	console.log(window.UTGS);
}
/************************ tag list from db ****************************/

firebase.database().ref("Tags").orderByChild("tags_category_id").on("value", function (snapshot) {
	var i = 0;
	window.html1 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';

	window.html2 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';

	window.html3 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';

	window.html4 = '<div class="container-fluid tags"><div class="container bg-secondary text-white"><div class="row justify-content-center" style="text-align:center;">';

	window.HTML = '<ul class="nav nav-tabs" role="tablist">';
	window.HTML2 = '<div class="tab-content">';

	snapshot.forEach(function (childSnapshot) {
		var a = ["chk_decyour", "chk_hopacc", "chk_premo", "chk_obface"];
		// key

		var key = childSnapshot.key;
		// value, could be object
		var childData = childSnapshot.val();

		if (i == 0) {
			//alert(555);

			window.HTML += '<li class="nav-item"><a class="nav-link active" href="#' + childData.tags_category + '" role="tab" data-toggle="tab">' + childData.tags_category + '</a></li>';
		} else {

			window.HTML += '<li class="nav-item"><a class="nav-link" href="#' + childData.tags_category + '" role="tab" data-toggle="tab">' + childData.tags_category + '</a></li>';
		}
		var trainindIdArray = childData.tags.split(',');

		window.HTML2 += '<div role="tabpanel" class="tab-pane fade in active" id="' + childData.tags_category + '">';
		window.HTML2 = '<div class="form-group" style="text-align:left;">';
		$.each(trainindIdArray, function (index, value) {

			if ($.inArray(value, window.UTGS) != -1) {

				window.HTML2 += '<div class="form-check my-2"><label><input class="form-check-input" type="checkbox" name="' + a[i] + '" class="' + a[i] + '" value="' + value + '" id="defaultCheck' + index + '" checked>' + value + '</label></div>';
			} else {

				window.HTML2 += '<div class="form-check my-2"><label><input class="form-check-input" type="checkbox" name="' + a[i] + '" class="' + a[i] + '" value="' + value + '" id="defaultCheck' + index + '">' + value + '</label></div>';
			}
			//window.html1 += '<div class="checkbox"><label><input type="checkbox" name="'+a[i]+'" class="'+a[i]+'" value="'+value+'"> &nbsp;'+value+'</label></div>';

			//alert();
			//    alert(index + ': ' + value);   // alerts 0:[1 ,  and  1:2]
		});

		window.HTML2 += '</div>	';
		if (i == 0) {
			///	$("#tagselection > div .modal-content .modal-header .modal-title").html("Select from the option below to describe"+$(".panel-title").html());
			//$("#tagselection > div .modal-content .modal-body").html(window.HTML2);
			$("#step-1").find(".panel-title").html(childData.tags_category);
			$("#step-1").find(".panel-body").find(".content").html(window.HTML2);
			//	alert(childData.tags_category);
		} else if (i == 1) {
			//	$("#tagselection > div .modal-content .modal-header .modal-title").html(childData.tags_category);

			$("#step-2").find(".panel-title").html(childData.tags_category);
			$("#step-2").find(".panel-body").find(".content").html(window.HTML2);
			//alert(childData.tags_category);
		} else if (i == 2) {

			//	$("#tagselection > div .modal-content .modal-header .modal-title").html(childData.tags_category);
			$("#step-3").find(".panel-title").html(childData.tags_category);
			$("#step-3").find(".panel-body").find(".content").html(window.HTML2);
			//alert(childData.tags_category);
		} else if (i == 3) {
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

$("body").on('click', '.lib', function () {
	//alert(window.HTML2);
	$("#tagselection").modal("show");
	/*console.log(window.HTML2);
	$(".wizard").show();
	$(".plib").hide();*/
});
favorite = [];
if (user.tags) {
	var favorite = user.tags.split(',');
	dowload_list(favorite);
	$(".cat").html(window.ht);
}
/***************************** / show tag's list to user *************************/

$("body").on('click', "input[type='checkbox']", function () {
	$(this).parent().parent().parent().parent().parent().find("span").html("");
	//  alert($(this).parent().parent().parent().parent().parent().find("span"));
});

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
	dowload_list(favorite);
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


/***************************** / show session list without tag filter *************************/

$("body").on('click', '.skip', function () {
	//alert(5);
	favorite = [];
	dowload_list(favorite);
	console.log(window.ht);
	$(".cat").html(window.ht);
});

/***************************** / show session list without tag filter *************************/


//firebase.database().ref("Category").orderByChild("category_id").on("value", function(snapshot) {	
$(".i").hover(function () {
	//$(this).for
	//alert($(this).html());
	var ht = '<div class="row Margins"><p class="MainMenu"><span class="i">QUICK DIVE</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center">';
	ht += '<div class="col-md-4 col-xs-6 boxStyle" style="background-color:#aaa;"><p class="Center">Having A Bad Day</p></div>';
	ht += '</div></div>';
});


var user = JSON.parse(window.localStorage.getItem('user'));
if (user.membership_type != "Free") {
	$(".freeuser").hide();
	$(".divethru").show();
} else {
	$(".freeuser").show();

	$(".divethru").hide();
}
/************** Subcription *********************/
$(".all").click(function () {

	window.location = "subscription.php";

});
/************** / Subcription *********************/
/************** Individual Subcription *********************/
$(".single").click(function () {
	var plan = $(this).data('plan');
	var cycle = $(this).data('cycle');
	var price = $(this).data('amount');
	var subid = $(this).data('subid');
	var sid = $(this).data('sesid');
	var sesnm = $(this).data('sesnm');
	var bid = $(this).data('bid');

	if (bid != 0 && subid != 0) {
		window.localStorage.setItem('session_id', bid);
		//window.localStorage.setItem("sess");
		$.redirect("Process.php", { select_cycles: cycle, product_name: "bundle", "select_plan": plan, "price": price, "userid": user.user_id, "token": "" }, "POST", null, null, true);
	}
	if (bid == 0 && subid != 0) {
		window.localStorage.setItem('session_id', sid);
		//window.localStorage.setItem("sess");
		$.redirect("Process.php", { select_cycles: cycle, product_name: "bundle", "select_plan": plan, "price": price, "userid": user.user_id, "token": "" }, "POST", null, null, true);
	}

});

/************** / IndividualSubcription *********************/

/******************************* Navigation to related page on box click *******************************/
$("body").on('click', ".boxStyle", function () {
	var id = $(this).find("p").attr("id");
	var cat1 = $(this).find("p").data("cat");
	var bundle = $(this).find("p").data("bundle");
	var subcat = $(this).find("p").data("subcat");
	var subid = $(this).find("p").data("subid");
	var sid = $(this).find("p").data("sid");
	var bid = $(this).find("p").data("bid");
	//alert(bid+"="+sid+"="+subid);
	var ref;
	if (bundle == 0 && subcat == 0) {
		$("#description div .modal-content .modal-body .freeuser .single").hide();
		$("#description div .modal-content .modal-body .freeuser .or").hide();

		//alert(cat1);
		var snm = $(this).find("p").data("nm");
		ref = firebase.database().ref("Category/" + cat1 + "/Session/" + sid);
		$(".single").attr("data-subid", 0);
		$(".single").attr("data-bid", 0);
		//$(".single").attr("data-amount","2.79");
		firebase.database().ref("Category/" + cat1 + "/Session/" + sid).on("value", function (snapshot) {

			snapshot.forEach(function (childSnapshot) {
				var key = childSnapshot.key;
				var childData = childSnapshot.val();
				window.localStorage.setItem("session2", childSnapshot);
				$("#description div .modal-content .modal-body .divethru").click(function () {
					window.localStorage.setItem("cat", cat1);
					window.localStorage.setItem("cid", key);
					window.localStorage.setItem("bid", "");
					window.localStorage.setItem("subcategory_id", "");
					window.localStorage.setItem("session", JSON.stringify(snapshot));
					$.redirect("player.php", { bundle: sid }, "POST", null, null, true);
					//window.localStorage.setItem("session3",JSON.stringify(snapshot));
				});
				$("#description div .modal-content .modal-body .modal-title").html(snm);
				if (key == "session_name") {
					$("#description div .modal-content .modal-header #sessionTitle").html(childData);
					$(".single").attr("data-sesnm", childData);
					window.localStorage.setItem("Snm", childData);
				}
				if (key == "session_id") {
					//$("#description div .modal-content .modal-header #sessionTitle").data("sesid",childData);
				}
				if (key == "session_description") {
					$("#description div .modal-content .modal-body p").html(childData);

				}

				//alert(key);
			});
		});
		//alert(ref);
		$("#description").modal('show');
		window.localStorage.setItem("cat", cat1);

		//window.location = "opendive.php";
		if (!$(this).find("p").data("nm")) {
			window.location = "session.php";
		}
	} else if (bundle != 0 && subcat == 0) {
		$("#description div .modal-content .modal-body .freeuser .single").html("Get this " + cat1 + " Session");
		ref = firebase.database().ref("Category/" + cat1 + "/SubCategory/" + subid + "/Session/" + sid);
		$(".single").attr("data-subid", 0);
		$(".single").attr("data-bid", subid);
		$(".single").attr("data-amount", "2.79");
		var snm = $(this).find("p").data("nm");
		firebase.database().ref("Category/" + cat1 + "/SubCategory/" + subid + "/Session/" + sid).on("value", function (snapshot) {
			$("#description div .modal-content .modal-body .divethru").click(function () {

				window.localStorage.setItem("cat", cat1);
				window.localStorage.setItem("subcategory", snm);
				window.localStorage.setItem("subcategory_id", subid);
				window.localStorage.setItem("session_id", sid);
				window.localStorage.setItem("session", JSON.stringify(snapshot));
				//	$.redirect("player.php",{bundle: sid},"POST",null,null,true);
				$.redirect("quickdive.php", { bundle: subid, Qsid: sid }, "POST", null, null, true);
			});
			snapshot.forEach(function (childSnapshot) {
				window.localStorage.setItem("session2", childSnapshot);
				var key = childSnapshot.key;
				var childData = childSnapshot.val();

				$("#description div .modal-content .modal-body .modal-title").html(snm);
				if (key == "session_name") {
					$("#description div .modal-content .modal-header #sessionTitle").html(childData);
					$(".single").attr("data-sesnm", childData);
				}
				if (key == "session_id") {
					$(".single").attr("data-sesid", childData);
				}
				if (key == "session_description") {
					$("#description div .modal-content .modal-body p").html(childData);

				}

				//alert(key);
			});
		});
		//alert(ref);

		window.localStorage.setItem("cat", cat1);
		if (subid != 0 && sid != 0 && bid == 0) {
			if ($(this).find("p").data("nm")) {

				$("#description").modal('show');
			} else {

				$.redirect("quickdive.php", { bundle: subid, Qsid: sid }, "POST", null, null, true);
			}
		} else {
			if ($(this).find("p").data("nm")) {

				$("#description").modal('show');
			} else {

				$.redirect("quickdive.php", { bundle: subid }, "POST", null, null, true);
			}
		}
		//window.location = "quickdive.php";
		//	alert(cat1);

	} else if (bundle == 0 && subcat != 0) {
		//	window.localStorage.setItem("session2",childSnapshot);
		$("#description div .modal-content .modal-body .freeuser .single").html("Get this " + cat1 + " Session");
		ref = firebase.database().ref("Category/" + cat1 + "/SubCategory/" + subid + "/Session/" + sid);
		$(".single").attr("data-subid", subid);
		$(".single").attr("data-bid", 0);
		$(".single").attr("data-amount", "2.79");
		var snm = $(this).find("p").data("nm");
		firebase.database().ref("Category/" + cat1 + "/SubCategory/" + subid + "/Session/" + sid).on("value", function (snapshot) {
			$("#description div .modal-content .modal-body .divethru").click(function () {

				window.localStorage.setItem("cat", cat1);
				window.localStorage.setItem("subcategory", snm);
				window.localStorage.setItem("subcategory_id", subid);
				window.localStorage.setItem("session_id", sid);
				window.localStorage.setItem("session", JSON.stringify(snapshot));
				//	$.redirect("player.php",{bundle: sid},"POST",null,null,true);
				$.redirect("quickdive.php", { bundle: subid, Qsid: sid }, "POST", null, null, true);
			});
			snapshot.forEach(function (childSnapshot) {
				var key = childSnapshot.key;
				var childData = childSnapshot.val();

				$("#description div .modal-content .modal-body .modal-title").html(snm);
				if (key == "session_name") {
					$("#description div .modal-content .modal-header #sessionTitle").html(childData);
					$(".single").attr("data-sesnm", childData);
				}
				if (key == "session_id") {
					$(".single").attr("data-sesid", childData);
				}
				if (key == "session_description") {
					$("#description div .modal-content .modal-body p").html(childData);

				}

				//alert(key);
			});
		});
		//alert(ref);
		//alert(cat1);
		if (subid != 0 && sid != 0 && bid == 0) {
			if ($(this).find("p").data("nm")) {

				$("#description").modal('show');
			} else {

				$.redirect("quickdive.php", { bundle: SESSION, Qsid: sid }, "POST", null, null, true);
			}
		} else {
			if ($(this).find("p").data("nm")) {

				$("#description").modal('show');
			} else {

				$.redirect("quickdive.php", { bundle: SESSION }, "POST", null, null, true);
			}
		}

		window.localStorage.setItem("cat", cat1);
		//window.location = "quickdive.php";

	} else if (bundle != 0 && subcat != 0) {
		ref = firebase.database().ref("Category/" + cat1 + "/SubCategory/" + subid + "/Bundle/" + bid + "/Session/" + sid);
		var bnm = $(this).find("p").data("nm");
		//alert(bnm);
		$("#description div .modal-content .modal-body .freeuser .single").html("Get this " + cat1 + " Bundle");
		$(".single").attr("data-subid", subid);
		$(".single").attr("data-bid", bid);
		$(".single").attr("data-amount", "6.99");
		firebase.database().ref("Category/" + cat1 + "/SubCategory/" + subid + "/Bundle/" + bid + "/Session/" + sid).on("value", function (snapshot) {
			$("#description div .modal-content .modal-body .divethru").click(function () {

				window.localStorage.setItem("cat", cat1);
				window.localStorage.setItem("bundle", bnm);
				window.localStorage.setItem("subcategory_id", subid);
				window.localStorage.setItem("bid", bid);
				//			window.localStorage.setItem("streak",CN);
				//window.localStorage.setItem("subcription_type","paid");
				window.localStorage.setItem("session", JSON.stringify(snapshot));
				$.redirect("player.php", { bundle: sid }, "POST", null, null, true);

			});
			snapshot.forEach(function (childSnapshot) {
				var key = childSnapshot.key;
				var childData = childSnapshot.val();

				$("#description div .modal-content .modal-body .modal-title").html(bnm);

				if (key == "session_name") {
					$("#description div .modal-content .modal-header #sessionTitle").html(childData);
					$(".single").attr("data-sesnm", childData);

				}
				if (key == "session_id") {
					$(".single").attr("data-sesid", bid);
				}
				if (key == "session_description") {
					$("#description div .modal-content .modal-body p").html(childData);

				}

				//alert(key);
			});
		});
		//	alert($("#description div .modal-content").html());
		//	alert("Category/"+cat1+"/SubCategory/"+subid+"/Bundle/"+bid+"/Session/"+sid);
		//	alert(cat1);
		if (subid != 0 && sid != 0 && bid != 0) {
			if ($(this).find("p").data("nm")) {

				$("#description").modal('show');
			} else {

				//			$("#description").modal('show');
				$.redirect("individual.php", { bundle: bid, subcatid: subid }, "POST", null, null, true);
			}
		} else {
			if ($(this).find("p").data("nm")) {

				$("#description").modal('show');
			} else {

				window.location = "DeepMain.php";
			}
		}
	}
	if (cat1 == "Open Dive") {
		console.log(bundle + "==" + subcat);
	} else if (cat1 == "Quick Dive") {
		console.log(bundle + "==" + subcat);
		//window.location = "quickdive.php";

	} else if (cat1 == "Deep Dive") {
		console.log(bundle + "==" + subcat);
		//window.location = "DeepMain.php";

	}
});


/******************************************************************************************************/



// if(window.localStorage.getItem('cat') == "10 Day Intro Program" || !window.localStorage.getItem('cat')){
// 	//alert(5);
// for (i in storedNames)
// {
// 	var conversation = 1;
//    for(j in storedNames[i]){

// 	if(conversation == window.localStorage.getItem('content')){
// 	$(".conv").html(storedNames[i][j].session_name);
// 	  //$(".sdesc").html(storedNames[i][j].session_description);
// 	$(".modal-body h2.session").html(storedNames[i][j].session_name)
// console.log("p"+storedNames[i][j].meditation_audio[0]);
// console.log($(".modal-body p").html());
// }

// conversation++;
// 	}
// }
// }
//console.log("d"+$(".modal-body").html());
if (window.localStorage.getItem("Dname") == "10 Day Intro Program") {
	//$(".bannerHeader").html(window.localStorage.getItem("Intro Program"));
} else {
	//$(".bannerHeader").html(window.localStorage.getItem("Dname"));
}
//$(".day").html(window.localStorage.getItem("content"));
//$(".totalday").html(window.localStorage.getItem("Slen"));

//console.log(window.localStorage.getItem('content'));

/************************************* function to show session **************************************/

function dowload_list(favorite) {
	//console.log(favorite);
	window.ht = "";
	firebase.database().ref("Category").orderByKey().on("value", function (snapshot) {
		var c = [];
		var session = [];
		var session2 = [];
		var desc = '';
		snapshot.forEach(function (childSnapshot) {
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
			if (childData.session_subcription_type != 'Free' && childSnapshot.key != '10 Day Intro Program') {

				window.ht += '<div class="row Margins"><p class="MainMenu1 "><span class="i">' + childSnapshot.key + '</span>&nbsp;&nbsp;<a href="#" class="learnMorestyle" style="outline:none;" data-toggle="modal" data-target="#exampleModalCenter2"><i>LEARN MORE</i></a></p></div><br><div class="container text-center cardContainers"><div class="row Margins text-center">';
			}
			if (childData.session_subcription_type == 'Free' && childSnapshot.key == '10 Day Intro Program') {
				session.push(childData.Session);
				/*console.log(childSnapshot.key);
				var blen = Object.keys(childData.Bundle).length;
				var sblen = Object.keys(childData.SubCategory).length;
				$.map(childData.Session, function(value, index) {
					   // console.log(value.subcategory_id);
						//console.log(value.session_name);
						//(!window.localStorage.getItem('cat') ||  window.localStorage.getItem('cat') != 'Deep Dive' || window.localStorage.getItem('cat') != 'Quick Dive'){
							
							//alert(5);
			//			}
						if(i==window.localStorage.getItem('content')){
							//$(".bg").css('background', 'url('+value.session_img+') '); /*Dynamic image from database*/

				//$(".conv").html(value.session_name);
				/*}
				if(i>3){
				//window.ht +='<div class="col-md-4 col-xs-6 boxStyle hiddens3 '+childSnapshot.key+'" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'" style="color:#fff;">'+value.session_name+'</p></div>';

				}else{
					//chkS2 = true;
				//window.ht +='<div class="col-md-4 col-xs-6 boxStyle '+childSnapshot.key+'" style=" background-image: url('+value.session_img+'); background-size:cover;"><p class="Center" data-cat="'+childSnapshot.key+'" data-bundle="'+blen+'" data-subcat="'+sblen+'">'+value.session_name+'</p></div>';
				}
		i++;
		});*/
			}
			if (childSnapshot.key == 'Open Dive') {
				console.log(childSnapshot.key);
				var blen = Object.keys(childData.Bundle).length;
				var sblen = Object.keys(childData.SubCategory).length;

				$.map(childData.Session, function (value, index) {
					// console.log(value.subcategory_id);
					//console.log(value.session_name);
					//(!window.localStorage.getItem('cat') ||  window.localStorage.getItem('cat') != 'Deep Dive' || window.localStorage.getItem('cat') != 'Quick Dive'){

					//alert(5);
					//			}
					if (value.tag) {
						var stag = value.tag.split(",");
					}
					var prev = "";
					if (favorite.length > 0) {
						for (f in favorite) {
							if ($.inArray(favorite[f], stag) >= 0 && prev != value.session_name) {
								//alert(favorite[f]);
								session2.push(value);
								if (i > 3) {
									window.ht += '<div class="col-md-4 col-xs-6 boxStyle hiddens ' + childSnapshot.key + '" style=" background-image: url(' + value.session_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-nm="' + key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="0" data-sid="' + value.session_id + '" style="color:#fff;">' + value.session_name + '</p></div>';

									chkS = true;
								} else {
									window.ht += '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value.session_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-nm="' + key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="0" data-sid="' + value.session_id + '">' + value.session_name + '</p></div>';
								}
								prev = value.session_name;
							}
						}
					} else {
						if (i > 3) {
							window.ht += '<div class="col-md-4 col-xs-6 boxStyle hiddens ' + childSnapshot.key + '" style=" background-image: url(' + value.session_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="0" data-sid="' + value.session_id + '" style="color:#fff;">' + value.session_name + '</p></div>';

							chkS = true;
						} else {
							window.ht += '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value.session_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="0" data-sid="' + value.session_id + '">' + value.session_name + '</p></div>';
						}
					}
					i++;
				});
			}
			/*Quick Dive*/
			if (childSnapshot.hasChild("Bundle")) {
				console.log(childSnapshot.key);
				var blen = Object.keys(childData.Bundle).length;
				var sblen = Object.keys(childData.SubCategory).length;
				$.map(childData.Bundle, function (value, index) {
					if (favorite.length > 0) {
						for (f in favorite) {
							if ($.inArray(favorite[f], stag) >= 0) {
								if (i > 6) {
									window.ht += '<div class="col-md-4 col-xs-6 boxStyle hiddens ' + childSnapshot.key + '" style=" background-image: url(' + value.bundle_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="' + value.bundle_id + '" data-sid="0" style="color:#fff;">' + value.bundle_name + '</p></div>';

									chkBnd = true;
								} else {
									window.ht += '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value.bundle_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="' + value.bundle_id + '" data-sid="0">' + value.bundle_name + '</p></div>';
								}
							}
						}

					} else {
						if (i > 6) {
							window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle hiddens1 ' + childSnapshot.key + '" style=" background-image: url(' + value.bundle_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="' + value.bundle_id + '" data-sid="0">' + value.bundle_name + '</p></div>';
							chkBnd = true;

						} else {
							window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value.bundle_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="0" data-bid="' + value.bundle_id + '" data-sid="0">' + value.bundle_name + '</p></div>';
						}
					}
					i++;
				});
			}
			/*Deep Dive*/
			if (childSnapshot.hasChild("SubCategory")) {
				//	alert(childSnapshot.key.length);
				console.log(childSnapshot.key);
				var sblen = Object.keys(childData.SubCategory).length;

				$.map(childData.SubCategory, function (value, index) {
					if (value.Session && value.Session != "") {
						//i = 1;
						if (value.Bundle) {
							var blen = Object.keys(value.Bundle).length;
						} else {
							var blen = 0;
						}


						if (index == window.localStorage.getItem("currentID") && childSnapshot.key == window.localStorage.getItem("currentCat")) {
							window.localStorage.setItem("cid", childData.category_id);
							//window.localStorage.setItem("bid","");
							//window.localStorage.setItem("subcategory_id",value.subcategory_id);
							//change dashboard html value

							//	$(".bannerHeader").html(value.subcategory_name);
							//	$(".day").html(window.localStorage.getItem("content"));
							//	$(".totalday").html(Object.keys(value.Session).length);


							//window.localStorage.setItem("Dname",value.subcategory_name);

							//window.localStorage.setItem("Slen",Object.keys(value.Session).length);
							//session2.push(value.Session);
						}

						/* code for remove emty bundle and session subcat */
						var prev = "";
						var prevS = "";
						if (favorite.length > 0) {
							$.map(value.Session, function (value2, index) {
								if (value2.tag) {
									var stag = value2.tag.split(",");
								}


								if (value2.Bundle) {
									var blen = Object.keys(value2.Bundle).length;
								} else {
									var blen = 0;
								}
								for (f in favorite) {
									if ($.inArray(favorite[f], stag) >= 0 && prevS != value2.session_name) {
										if (i > 6) {
											window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle hiddens2 ' + childSnapshot.key + '" style=" background-image: url(' + value2.session_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-nm="' + value.subcategory_name + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="0" data-sid="' + value2.session_id + '">' + value.subcategory_name + "<br>" + value2.session_name + '</p></div>';
											chkSub = true;
										} else {
											//if(!childSnapshot.hasChild('Bundle') && )
											window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value2.session_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-nm="' + value.subcategory_name + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="0" data-sid="' + value2.session_id + '">' + value.subcategory_name + "<br>" + value2.session_name + '</p></div>';
										}
										prev = value.subcategory_name;
										i++;
										return false;
									}
								}

								/* End code for remove emty bundle and session subcat */
								//});

								prevS = value2.session_name;
							});

						} else {

							if (i > 6) {

								window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle hiddens2 ' + childSnapshot.key + '" style=" background-image: url(' + value.subcategory_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="0" data-sid="0" >' + value.subcategory_name + '</p></div>';

								chkSub = true;
							} else {
								//if(!childSnapshot.hasChild('Bundle') && )
								window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value.subcategory_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="0" data-sid="0" >' + value.subcategory_name + '</p></div>';
							}
							i++;

						}
					} else {

						var prev = "";
						var prevB = "";
						if (value.Bundle) {
							var blen = Object.keys(value.Bundle).length;
						} else {
							var blen = 0;
						}
						if (value.Bundle && value.Bundle != "") {
							if (favorite.length > 0) {
								$.map(value.Bundle, function (value2, index) {
									// window.localStorage.setItem("TYPE","S&B");
									if (value.bundle_id == window.localStorage.getItem("currentID") && childSnapshot.key == window.localStorage.getItem("currentCat")) {
										//alert(value2.bundle_name);
										//change dashboard html value
									}
									//window.localStorage.setItem("cid",childData.category_id);
									//	window.localStorage.setItem("bid",value2.bundle_id);
									//	window.localStorage.setItem("subcategory_id",value.subcategory_id);
									//$(".bannerHeader").html(value2.bundle_name);
									//$(".day").html(window.localStorage.getItem("content"));
									//$(".totalday").html(Object.keys(value2.Session).length);

									//window.localStorage.setItem("Dname",value2.bundle_name);
									//alert(index+"="+window.localStorage.getItem("currentID"));	
									//	console.log(value2.Session);
									/* code for remove emty bundle and session subcat */

									/* End code for remove emty bundle and session subcat */

									//session2.push(value2.Session);
									//window.localStorage.setItem("Slen",Object.keys(value2.Session).length);
									//}
									//session.push(value.Session);
									var s = 0;
									$.map(value2.Session, function (value2, index) {

										if (s == 0) {
											window.id = index;
										}
										s++;
									});
									if (value2.tag) {
										var stag = value2.tag.split(",");
									}

									//alert(value2.tag);

									for (f in favorite) {
										if ($.inArray(favorite[f], stag) >= 0 && prevB != value2.bundle_name && s > 0) {

											//	alert(value2.bundle_name);
											if (i > 6) {
												//	alert(i);

												window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle hiddens2 ' + childSnapshot.key + '" style=" background-image: url(' + value2.bundle_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-nm="' + value2.bundle_name + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="' + value2.bundle_id + '" data-sid="' + window.id + '">' + value.subcategory_name + "<br>" + value2.bundle_name + '</p></div>';

												chkBnd = true;
											} else {
												//if(!childSnapshot.hasChild('Bundle') && )

												window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value2.bundle_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-nm="' + value2.bundle_name + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="' + value2.bundle_id + '" data-sid="' + window.id + '">' + value.subcategory_name + "<br>" + value2.bundle_name + '</p></div>';
											}
											prev = value.subcategory_name;

											//}
											i++;
											return false;
										}
									}

									//if(prevB == value2.bundle_name){	


									//}
									//
									//}


									prevB = value2.bundle_name;
								});
								//if(value2.Session && value2.Session != ""){
							} else {

								if (i > 6) {

									window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle hiddens2 ' + childSnapshot.key + '" style=" background-image: url(' + value.subcategory_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="' + value2.bundle_id + '" data-sid="0">' + value.subcategory_name + '</p></div>';

									chkBnd = true;
								} else {
									//if(!childSnapshot.hasChild('Bundle') && )

									window.ht = window.ht + '<div class="col-md-4 col-xs-6 boxStyle ' + childSnapshot.key + '" style=" background-image: url(' + value.subcategory_img + '); background-size:cover;"><p class="Center" data-cat="' + childSnapshot.key + '" data-bundle="' + blen + '" data-subcat="' + sblen + '" data-subid="' + value.subcategory_id + '" data-bid="0" data-sid="0">' + value.subcategory_name + '</p></div>';
								}

								i++;
							}
						}
					}
				});
			}

			//alert(window.ht);
			if (childSnapshot.key == 'Open Dive') {
				//alert("op"+chkS);
				if (chkS) {
					window.ht += '<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				} else {
					window.ht += '</div></div>';
				}
			} else if (childSnapshot.key == '10 Day Intro Program' && chkS2) {
				//window.ht +='<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore3 " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';

			} else if (childSnapshot.hasChild("Bundle")) {

				if (chkBnd && !chkSub) {

					window.ht += '<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore1" style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				} else if (!chkBnd && !chkSub) {
					window.ht += '</div></div>';
				}

				if (chkSub && !chkBnd) {

					window.ht += '<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore2 " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				} else if (!chkSub && !chkBnd) {
					window.ht += "</div></div>";
				}
			} else if (childSnapshot.hasChild("SubCategory")) {
				if (chkSub) {

					window.ht += '<div class="col-md-12 center-block"><button type="submit" class="btn1 exploreMore2 " style=" border-color: #7dd3d5;  margin-top: 10%; outline: none; text-align: center;  color:#FFF; background-color: #7dd3d5;">E X P L O R E &nbsp; M O R E</button></div></div></div>';
				} else {
					window.ht += "</div></div>";
				}

			}
			//$(".cardtexts").html(childData.qoute_description);
			// Do what you want with these key/values here*/
			//	console.log(window.ht);
			//$(".cat").append(window.ht);
			$("body").on('click', ".exploreMore", function () {

				//	alert(555);
				$(".hiddens").show();
				$(".exploreMore").hide();
			});

			$("body").on('click', ".exploreMore1", function () {

				//alert(555);
				//	var c = "."+$(this).prev().closest('div').attr('class').split(' ')[3];
				//	console.log( c);
				$(".hiddens1").show();
				$(".exploreMore1").hide();
			});

			$("body").on('click', ".exploreMore2", function () {

				//alert(555);
				//	var c = "."+$(this).prev().closest('div').attr('class').split(' ')[3];
				//	console.log( c);
				$(".hiddens2").show();
				$(".exploreMore2").hide();
			});

			$("body").on('click', ".exploreMore3", function () {
				//alert(555);
				//	var c = "."+$(this).prev().closest('div').attr('class').split(' ')[3];
				//	console.log( c);
				$(".hiddens3").show();
				$(".exploreMore3").hide();
			});
			if (window.localStorage.getItem('cat') == '10 Day Intro Program' && childData.session_subcription_type == 'Free' || !window.localStorage.getItem('cat')) {
				window.localStorage.setItem('session', JSON.stringify(session));
			}
			$("body").on('click', ".learnMorestyle", function () {

				if (key == $(this).prev().text()) {
					desc = childData.category_description;

					var cat = $(this).prev().text();
					$(".modal-content .modal-body .modal-title").html(cat);
					$(".modal-body p").html(desc);
				}
			});
		});

		// $('.loader').fadeOut();
		console.log(session2);
		if (user.tags && user.tags != "") {

			$(".cat").html(window.ht);
		}
	});


	//alert(window.ht);
}


/************************************* / function to show session **************************************/









$(".bannerButton").click(function () {
	//alert(5);

	//alert(user.membership_type);
	var day = window.localStorage.getItem('content');
	window.localStorage.removeItem("cat");
	window.localStorage.removeItem("Snm");
	window.localStorage.removeItem("bid");
	window.localStorage.removeItem("subcategory_id");
	//window.localStorage.setItem("bid","");
	window.localStorage.setItem("cid", "-L9J9wr-WF71xLKGpHrn"); // remove after new code for Beign button
	//window.localStorage.setItem("cat","10 Day Intro Program");
	var user = JSON.parse(window.localStorage.getItem('user'));
	//alert(day);

	//if(day != 5 || day != 9 || day != 11){

	//}
	if (user.last_free_conversation_id == 10 && user.membership_type == "Free") {
		window.location = "subscription.php";
		//		var url = "player.php";
		//			window.location.href = url;
	} else if ((day == 5 || day == 9 || day >= 10) && user.membership_type == "Free") {
		//	window.location = "subscription.php";
		//			 $('#exampleModalCenter').modal('show');

		var url = "player.php";
		window.location.href = url;
	} else if (day >= 10 && user.membership_type != "Free") {
		var url = "player.php";
		window.location.href = url;
		//swal("You Have Finished Your 10 Day Intro Program");
	} else {
		var url = "player.php";
		window.location.href = url;
	}



	/*
			if(day>8 && day<=10 && user.membership_type == "Free"){
				//alert("a"+day);
				 $('#exampleModalCenter').modal('show');
			}else if((day<=8 || user.membership_type != "Free") && (day<=10)){
				//alert(day);
			var url = "player.php";
			window.location.href = url;
			}else if(day>=10 && user.membership_type == "Free"){
				window.location = "subscription.php";
			}else if(day>=10 && user.membership_type != "Free"){
				swal("You Have Finished Your 10 Day Intro Program");
			}
	*/


	// if(day>8 && day<=10 && user.membership_type == "Free" && window.localStorage.getItem('Dname') == "10 Day Intro Program"){
	//    // alert(day);
	//       $('#exampleModalCenter').modal('show');
	//    }else if(day<=8 || user.membership_type == "Paid" && window.localStorage.getItem('Dname') == "10 Day Intro Program"){

	//     var url = "player.php";
	//     window.location.href = url;
	//    }else if(day>10 && user.membership_type == "Free" && window.localStorage.getItem('Dname') == "10 Day Intro Program"){
	//       //alert(day);
	//       // alert(user.membership_type);
	//      window.location = "subscription.php";
	//    }
	//    else if(day>10 && user.membership_type != "Free" && window.localStorage.getItem('Dname') == "10 Day Intro Program"){
	// 	swal("You Have Finished Your 10 Day Intro Program");
	// }
	// 	var final_conve_data = JSON.parse(window.localStorage.getItem("cove_data"));
	// if(window.localStorage.getItem("TYPE") == "S&B" && window.localStorage.getItem("content") >= 1){
	// 	var id = window.localStorage.getItem("currentID");
	// 	if(user.membership_type != "Free" || $.inArray(id, final_conve_data) > -1){
	// 		 var url = "player.php";
	//    		 window.location.href = url;
	// 	}else{
	//      		window.location = "subscription.php";
	// 	}
	// }else if(window.localStorage.getItem("TYPE") == "SubCategory" && window.localStorage.getItem("content") >= 1){
	// 	var id = window.localStorage.getItem("SESSIONID");
	// 	if(user.membership_type != "Free" || $.inArray(id, final_conve_data) > -1){
	// 		 var url = "player.php";
	//    		 window.location.href = url;
	// 	}else{
	//      		window.location = "subscription.php";
	// 	}
	// }else if(window.localStorage.getItem("TYPE") == "Session" && window.localStorage.getItem("content") >= 1){
	// 	var id = window.localStorage.getItem("currentID");
	// 	if(user.membership_type != "Free"){
	// 		 var url = "player.php";
	//    		 window.location.href = url;
	// 	}else{
	//      		window.location = "subscription.php";
	// 	}
	// }
});
function dash() {
	$("body").on('click', ".boxStyle", function () {
		var id = $(this).find("p").attr("id");
		var cat1 = $(this).find("p").data("cat");
		var bundle = $(this).find("p").data("bundle");
		var subcat = $(this).find("p").data("subcat");

		if (bundle == 0 && subcat == 0) {
			window.localStorage.setItem("cat", cat1);

			//window.location = "opendive.php";
			window.location = "session.php";
		} else if (bundle != 0 && subcat == 0) {
			window.localStorage.setItem("cat", cat1);
			$.redirect("quickdive.php", { bundle: SESSION }, "POST", null, null, true);
			window.location = "quickdive.php";

		} else if (bundle == 0 && subcat != 0) {
			window.localStorage.setItem("cat", cat1);
			window.location = "quickdive.php";

		}
		if (cat1 == "Open Dive") {
			console.log(bundle + "==" + subcat);
		} else if (cat1 == "Quick Dive") {
			console.log(bundle + "==" + subcat);
			//window.location = "quickdive.php";

		} else if (cat1 == "Deep Dive") {
			console.log(bundle + "==" + subcat);
			window.location = "DeepMain.php";

		}
	});
}
//	console.log(sessionStorage.getItem("Test"));

$(".dropdown-item").click(function () {
	var cat = $(this).data("cat");
	var page = $(this).text();
	var x = $(this).prev();
	// console.log(x);
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

if (window.performance.navigation.type > 0) {
	window.localStorage.setItem("back", true);
} else {
	window.localStorage.setItem("back", false);
}

$(".nav-link").click(function () {
	//$(".dropdown-item").click(function(){
	var cat = $(this).text();
	//console.log(cat);
	firebase.database().ref("Category").on("value", function (snapshot) {
		snapshot.forEach(function (childSnapshot) {


			if (childSnapshot.hasChild("Bundle") && (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() != "") {
				window.localStorage.setItem("cat", childSnapshot.key);
				sessionStorage.setItem("cat", childSnapshot.key);
				window.localStorage.setItem("back", false);
				//console.log("quick");
				//window.location = "quickdive.php";

			}
			if (childSnapshot.hasChild("SubCategory") && (childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("SubCategory").val() != "") {
				window.localStorage.setItem("cat", childSnapshot.key);
				//	console.log("quick");
				window.localStorage.setItem("back", false);
				//window.location = "quickdive.php";

			}
			if ((childSnapshot.key).toUpperCase() == cat.toUpperCase() && childSnapshot.child("Bundle").val() == "") {
				//	console.log("open");
				sessionStorage.setItem("cat", childSnapshot.key);
				window.localStorage.setItem("back", false);
				window.localStorage.setItem("cat", childSnapshot.key);
				//window.location = "opendive.php";
				//window.location = "session.php";


			}
		});

	});


});
var user = JSON.parse(window.localStorage.getItem('user'));


var $_GET = [];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) { $_GET[name] = value; });
if ($_GET['auth']) {
	//$(".page-loader-wrapper").css("display","unset");
	setTimeout(function () {
		$.get('http://34.215.40.163/ipn/' + user.user_id + '.txt', function (data) {
			var str = data;
			var arr = str.split("&");
			//console.log(data);
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
			var $_GET = [];
			window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) { $_GET[name] = value; })

			//console.log($_GET);
			for (var i in arr) {
				//	console.log(arr[i].substring(arr[i].indexOf("=")+1));
				// 	console.log(arr[i].substring(0,arr[i].indexOf("=")+1));
				if (arr[i].substring(0, arr[i].indexOf("=")) == "amount3" || arr[i].substring(0, arr[i].indexOf("=")) == "mc_amount3" || arr[i].substring(0, arr[i].indexOf("=")) == "payment_gross") {
					total = arr[i].substring(arr[i].indexOf("=") + 1);
					if (total == "95.88") {
						subcription_type = "Yearly";
					}
					else {
						subcription_type = "Monthly";
					}

				}
				if (arr[i].substring(0, arr[i].indexOf("=")) == "period3") {
					//subcription_type = arr[i].substring(arr[i].indexOf("=")+1);
					// if(arr[i].substring(arr[i].indexOf("=")+1) == "1 M"){

					//    subcription_type = "Monthly";
					// }
					// else{
					// 	subcription_type = "Yearly";
					// }
					// else if(arr[i].substring(arr[i].indexOf("=")+1) == "1 Y"){
					//    subcription_type = "Yearly";

					// }
				}
				switch (arr[i].substring(0, arr[i].indexOf("="))) {
					// case "amount3":
					//      total = arr[i].substring(arr[i].indexOf("=")+1);

					//     break;
					// case "mc_amount3":
					//      total = arr[i].substring(arr[i].indexOf("=")+1);

					//     break;
					case "payer_email":
						eml = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "subscr_date":
						time = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "payer_id":
						pyid = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "payer_status":
						status = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "subscr_id":
						txid = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "first_name":
						full_name = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "last_name":
						l_name = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "address_state":
						state = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "address_city":
						city = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "mc_currency":
						currency = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					case "item_name":
						item_name = arr[i].substring(arr[i].indexOf("=") + 1);
						break;
					// case "period3":
					// 	if(arr[i].substring(arr[i].indexOf("=")+1) == "1 M"){

					//     subcription_type = "Monthly";
					// 	}
					// 	else{
					// 		 subcription_type = "Yearly";
					// 	}
					// else if(arr[i].substring(arr[i].indexOf("=")+1) == "1 Y"){
					//    subcription_type = "Yearly";

					// }

					// break;
					/*    case "custom":
						   if(arr[i].substring(arr[i].indexOf("=")+1) == "M"){
				   
						   subcription_type = "Monthly";
						   }else if(arr[i].substring(arr[i].indexOf("=")+1) == "Y"){
						   subcription_type = "Yearly";
						   	
						   }
						  
						   break;*/
				}
			}
			var chkauth = localStorage.getItem('payment');
			// alert(s);
			//window.location.reload();
			if ($_GET["auth"] && chkauth == 'true') {
				//alert(subcription_type);
				localStorage.setItem('payment', 'false');
				var n = full_name + " " + l_name;
				var currentdate = new Date();
				var datetime = ("0" + currentdate.getDate()).slice(-2) + "-"
					+ ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
					+ currentdate.getFullYear() + " "
					+ ("0" + currentdate.getHours()).slice(-2) + ":"
					+ ("0" + currentdate.getMinutes()).slice(-2) + ":"
					+ ("0" + currentdate.getSeconds()).slice(-2);
				// alert(subcription_type);
				var data = { transaction_id: txid, payer_id: pyid, name: n, email: eml, payment_type: type, payment_status: status, date: datetime, state: state, city: city, price: total, currency: currency, subscription: 'active', subscription_type: subcription_type, item_name: item_name };
				var db = firebase.database();

				db.ref("Users/" + user.user_id).update({ membership_type: "Paid" });
				//db.ref("Users/"+user.user_id).update({lastUpdated_on:datetime});
				/*db.ref("Users/"+user.user_id+"/payment").child(txid).set(data);*/ // Update lalted time on pause
				db.ref("Users/" + user.user_id + "/payment").push(data).then(function () {
					$(".page-loader-wrapper").css("display", "none");
					window.localStorage.setItem("paymentconfirm", "true");
					var useremail = user.email;
					var newtemp2 = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none"></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin-bottom:30px"><span style="color:#000;"><br>Thank for your purchase. We have recevied your payment for ' + subcription_type + ' subscription. <br><br>DiveThru.<br></span></div></div></div></div></div>';

					$.post("sendEreceipt.php", { "email": useremail, "body": newtemp2 }, function (result) {

					});

					if (window.localStorage.getItem("paymentconfirm") == "true") {
						var t = '';
						var useremail = user.email;
						var html = '<div style="font-family: sans-serif;"><div style="background-color:#80429C;text-align:center;"><img src="http://34.215.40.163/img/logo_email.png"></div><div style="margin-top:25px;margin-left: 20px;margin-right: 20px;"><table border="1" style="width:100%;border-collapse: collapse;text-align:center;"><tr style="font-size:20px;background-color: #cccccc8f;"><th style="min-width: 160px;">Item</th><th style="max-width: 30px;padding:15px;">Subscription <br>Type</th><th>Price</th><th style="max-width: 50px;">Amount</th></tr>';
						//$.map(user.payment, function(value, index){
						/*$.map(index, function(value, index){

						});*/
						//alert(total);
						//	console.log(total);
						t = t + total;
						//	 html += '<tr ><td style="padding:15px;">'+item_name+'</td><td >'+subcription_type+'</td><td >$'+total+'</td><td >$'+total+'</td></tr>';

						//});
						//	html += '<tr style="font-weight:600;"><td style="padding:15px;text-align:right;font-size:20px;" colspan="3">Total</td><td >$'+t+'</td></tr></table></div></div>';


						var newtemp = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none" ></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin:20px 0px;font-size:30px;line-height:30px;text-align:left">Thank you</div><div style="margin-bottom:30px"><span style="color:#000;">For Subscribing, Enjoy DiveThru to find the peace within.<br><br></span><div style="margin-bottom:20px;text-align:left"><b>Transaction ID:&nbsp;</b>' + txid + '<br><b>Date:&nbsp;</b>' + datetime + '</div></div><div><div></div><span></span><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:left;font-weight:bold;font-size:12px">Item</td><td style="text-align:right;font-weight:bold;font-size:12px" width="100">Price</td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr></tr><tr><td style="text-align:left;font-size:12px;padding-right:10px"><span><span style="letter-spacing: 2px;text-transform: uppercase;">' + subcription_type + '</span>&nbsp;(' + item_name + ')</span></td><td style="text-align:right;font-size:12px"><span>$' + total + '</span><span></span></td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:right;font-size:12px;font-weight:bold;" width="150" colspan="2"><span style="">Total:&nbsp;&nbsp;&nbsp; </span>$' + t + '</td></tr></tbody></table></div></div></div></div></div>';


						//					console.log(html);
						$.post("sendEreceipt.php", { "email": useremail, "body": newtemp }, function (result) {
							//console.log(result);
							window.localStorage.setItem("paymentconfirm", "false");


						});


					}
				});


				swal({ title: "Thank you", text: "For Subscription!!", type: "success" },
					function () {
						//window.setTimeout(function() {
						window.location.href = "dashboard.php";
						//}, 3000);             
					}
				);

			}
			//console.log(data);
		}, 'text').fail(function () {
			window.location.reload(); // reload if file not wriiten
		});
	}, 4000);
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
var data = { transaction_id: txid, payer_id: pyid, name: full_name, email: eml, payment_type: type, payment_status: status, date: time, state: state, city: city, price: total, currency: currency, subscription: 'active', subscription_type: "Lifetime" };
//console.log(data);
//	console.log(time);
var tranc_data_entry = false;
var chkauth = localStorage.getItem('payment');
if (txid && chkauth == "true") {
	$(".page-loader-wrapper").css("display", "unset");
	localStorage.setItem('payment', 'false');

	var db = firebase.database();
	//alert(description);
	//	console.log(description);
	//alert(tranc_data_entry);
	if (description == "session") {


		var cname = "/IndividualSubscription";

		var session_id = localStorage.getItem('session_id');
		var session_name = localStorage.getItem('session_name');
		var cat = localStorage.getItem('prevcat');
		if (cat == "Quick Dive") {
			cat = "session";
		}
		else {
			cat = "bundle";
		}

		var subcate_index = [];
		window.cat_index = 0;
		var i = 0;

		//	console.log(user.IndividualSubscription);
		var n = full_name;
		var subcription_type = "Lifetime";
		var item_name = session_name;


		if (!user.IndividualSubscription) {

			data = { id: session_id, transaction_id: txid, payer_id: pyid, name: n, email: eml, payment_type: type, payment_status: status, date: time, state: state, city: city, price: total, currency: currency, subscription: 'active', subscription_type: subcription_type, item_name: item_name };
			//console.log(data);
			//alert(data);
			db.ref("Users/" + user.user_id + cname).child(cat).push(data);

			window.setTimeout(function () {
				window.location.href = "dashboard.php";
			}, 3000);
		}
		else {


			firebase.database().ref("Users/" + user.user_id + cname).once("value", function (snapshot) {
				//alert();
				id = Object.keys(snapshot.val());
				//console.log(id[0]);
				cat_index = id[0];

				snapshot.forEach(function (childSnapshot) {
					//	console.log(childSnapshot.val());
					//alert(childSnapshot.val());
					childData = childSnapshot.val();
					//	console.log(childData['id']);
					subcate_index.push(childData['id']);

				});

				// console.log(subcate_index);
				// alert(subcategory_id);
				//$.inArray(session_id, subcate_index) > -1
				//alert(cat_index+'=='+cat);
				if (cat_index == cat) {
					//alert(cat_index);
					data = { id: session_id, transaction_id: txid, payer_id: pyid, name: n, email: eml, payment_type: type, payment_status: status, date: time, state: state, city: city, price: total, currency: currency, subscription: 'active', subscription_type: subcription_type, item_name: item_name };
					// console.log(data);

					db.ref("Users/" + user.user_id + cname + "/" + cat_index).push(data).then(function () {
						$(".page-loader-wrapper").css("display", "none");
						window.location.href = "dashboard.php";
					});
					//db.ref("Users/"+user.user_id+cname+"/"+cat_index).child('payment').push(paymentdata);									
					window.setTimeout(function () {
						window.location.href = "dashboard.php";
					}, 3000);

				}
				else {
					//alert();
					// alert(Object.keys(subcate_index));
					// console.log(Object.keys(subcate_index));
					//cat="session2";

					data = { id: session_id, transaction_id: txid, payer_id: pyid, name: n, email: eml, payment_type: type, payment_status: status, date: time, state: state, city: city, price: total, currency: currency, subscription: 'active', subscription_type: subcription_type, item_name: item_name };
					// console.log(data);
					// //alert(data);
					db.ref("Users/" + user.user_id + cname).child(cat).push(data).then(function () {
						$(".page-loader-wrapper").css("display", "none");
						window.location.href = "dashboard.php";
					});
					//	window.setTimeout(function() {
					window.location.href = "dashboard.php";
					//}, 3000);
				}
			});

		}
	}
	else {
		db.ref("Users/" + user.user_id).update({ membership_type: "Paid" });
		db.ref("Users/" + user.user_id + "/payment").push(data).then(function () { $(".page-loader-wrapper").css("display", "none"); });
	}

	/*db.ref("Users/"+user.user_id+"/payment").child(txid).set(data);*/ // Update lalted time on pause
	window.localStorage.setItem("paymentconfirm", "true");

	var useremail = user.email;
	var newtemp2 = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none"></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin-bottom:30px"><span style="color:#000;"><br>Thank for your purchase. We have recevied your payment for ' + subcription_type + ' subscription. <br><br>DiveThru.<br></span></div></div></div></div></div>';

	$.post("sendEreceipt.php", { "email": useremail, "body": newtemp2 }, function (result) {

	});

	//
	// Update lalted time on pause
	//alert(user.payment);
	if (window.localStorage.getItem("paymentconfirm") == "true") {
		var t = '';
		var currentdate = new Date();
		var date = ("0" + currentdate.getDate()).slice(-2) + "-"
			+ ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
			+ currentdate.getFullYear() + " "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();

		var useremail = user.email;


		var html = '<div style="font-family: sans-serif;"><div style="background-color:#80429C;text-align:center;"><img src="http://34.215.40.163/img/logo_email.png"></div><div style="margin-top:25px;margin-left: 20px;margin-right: 20px;"><table border="1" style="width:100%;border-collapse: collapse;text-align:center;"><tr style="font-size:20px;background-color: #cccccc8f;"><th style="min-width: 160px;">Item</th><th style="max-width: 30px;padding:15px;">Subscription <br>Type</th><th>Price</th><th style="max-width: 50px;">Amount</th></tr>';
		//$.map(user.payment, function(value, index){

		//console.log(value);
		t = t + total;

		var newtemp = '<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none" ></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin:20px 0px;font-size:30px;line-height:30px;text-align:left">Thank you</div><div style="margin-bottom:30px"><span style="color:#000;">For Subscribing, Enjoy DiveThru to find the peace within.<br><br></span><div style="margin-bottom:20px;text-align:left"><b>Transaction ID:&nbsp;</b>' + txid + '<br><b>Date:&nbsp;</b>' + date + '</div></div><div><div></div><span></span><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:left;font-weight:bold;font-size:12px">Item</td><td style="text-align:right;font-weight:bold;font-size:12px" width="100">Price</td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr></tr><tr><td style="text-align:left;font-size:12px;padding-right:10px"><span><span style="letter-spacing: 2px;text-transform: uppercase;">' + subcription_type + '</span>&nbsp;(' + item_name + ')</span></td><td style="text-align:right;font-size:12px"><span>$' + total + '</span><span></span></td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:right;font-size:12px;font-weight:bold;" width="150" colspan="2"><span style="">Total:&nbsp;&nbsp;&nbsp; </span>$' + t + '</td></tr></tbody></table></div></div></div></div></div>';

		// html += '<tr ><td style="padding:15px;">'+value.item_name+'</td><td >'+value.subcription_type+'</td><td >$'+value.price+'</td><td >$'+value.price+'</td></tr><tr style="font-weight:600;"><td style="padding:15px;text-align:right;font-size:20px;" colspan="3">Total</td><td >$'+t+'</td></tr>';

		//	});
		html += '</table></div></div>';
		//console.log(html);
		//alert(html);
		$.post("sendEreceipt.php", { "email": useremail, "body": newtemp }, function (result) {
			//	console.log(result);
			window.localStorage.setItem("paymentconfirm", "false");
		});
	}

	//if(tranc_data_entry==true){
	//alert(tranc_data_entry);
	window.setTimeout(function () {
		// window.location.href = "dashboard.php";
	}, 3000);
	//}

}



