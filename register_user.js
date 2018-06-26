//for user already login
// $(document).ready(function(){

var user = window.localStorage.getItem('user');
if (user != null) {
    window.location.href = "dashboard.php";
}
//});
//Firebase registration
$(".fa-spinner").hide();


function save_user() {
    $(".fa-spinner").show();
    //alert(5);
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var bdate = document.getElementById('birthdate').value;
    var accesscode = document.getElementById('access_code').value;
    var currentdate = new Date();
    var datetime = +currentdate.getFullYear() + "-"
        + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
        + ("0" + currentdate.getDate()).slice(-2) + " "
        + ("0" + currentdate.getHours()).slice(-2) + ":"
        + ("0" + currentdate.getMinutes()).slice(-2) + ":"
        + ("0" + currentdate.getSeconds()).slice(-2);
    var PCstatus = 'Mobile';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
    if (!isMobile.any()) {
        var PCstatus = 'Desktop';
    }

    var x = document.getElementsByName("gender");
    var s;
    for (var i = 0, length = x.length; i < length; i++) {
        if (x[i].checked) {
            // do whatever you want with the checked radio
            s = x[i].value;
            //alert(s);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        var uid = firebase.auth().currentUser.uid;
        var data = {
            "user_id": uid,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "birthdate": bdate,
            "gender": s,
            "login_via": "email",
            "registered_on": datetime,
            "lastUpdated_on": datetime,
            "halted": 0.0,
            "last_free_conversation_id": 0,
            "device_type": PCstatus,
            "activated_on": "",
            "activation_code": "",
            "access_code": accesscode,
            "device_token": "",
            "fb_id": "",
            "google_id": "",
            "visited": 0,
            "completed_conversation": 0,
            "total_time_divethru": 0,
            "membership_type": "Free",
            "streak": ""
        }
        var updates = {};
        updates['/Users/' + uid] = data;
        firebase.database().ref().update(updates);

        $.post("http://34.215.40.163/sendEmailVerification.php?uid=" + uid, { mail: email }, function (result) {
            //  window.location.href  = "http://localhost/DiveThru/amazon-ses-sample.php?uid="+uid;
            //alert('successfully posted '+email);

            console.log(result);
            $(".fa-spinner").hide();
            document.getElementById('head').innerHTML = "A link to verify your email address has been sent. Please Check your email to proceed further.";
            document.getElementById('head').style.color = "green";
            document.getElementById('first_name').value = "";
            document.getElementById('last_name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmpassword').value = "";
            document.getElementById('birthdate').value = "";
            document.getElementById('access_code').value = "";
            var x = document.getElementsByName("gender");
            var s;
            for (var i = 0, length = x.length; i < length; i++) {
                x[i].checked = false;

            }

            //window.location.href="http://34.215.40.163/login.php";
            //alert('This User Created Sucessfully');
            swal({
                title: "Registered!",
                text: "User Registered Sucessfully.",
                html: true,
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#86CCEB",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        });
    }, function (error) {

        $(".fa-spinner").hide();

        swal({
            title: "Already Registered!",
            text: "User already registered.",
            html: true,
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#86CCEB",
            confirmButtonText: "OK",
            closeOnConfirm: false
        });

    });


}

function _calculateAge() { // birthday is a date
    var date1 = new Date();
    var dob = document.getElementById("birthdate").value;
    //alert(dob);
    var date2 = new Date(dob);
    var pattern = /^\d{4}\-\d{1,2}\-\d{1,2}$/; //Regex to validate date format (dd/mm/yyyy)
    if (pattern.test(dob)) {
        var y1 = date1.getFullYear(); //getting current year
        var y2 = date2.getFullYear(); //getting dob year
        var age = y1 - y2;           //calculating age 
        //  confirm("Age : " + age);
        if (age < 8) {
            //alert("please come after 8");
            document.getElementById("bdt").innerHTML = "* User must be 8 year old or above";
            document.getElementById("birthdate").value = '';
        } else {
            document.getElementById("bdt").innerHTML = "";
        }
    } else {
        alert("Please Input in (yyyy-mm-dd) format!");
    }
}




function fbsave_user() {

    //alert(55);
    var provider = new firebase.auth.FacebookAuthProvider();
    //	provider.addScope('email');
    //provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var fbuser = firebase.auth().currentUser
        //if(fbuser){
        // window.location.href = "http://localhost/DiveThru/login.php";
        //}else{
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        //console.log();
        var user = result.user;
        var uid = firebase.auth().currentUser.uid;
        var detail = result.additionalUserInfo.profile;
        var first_name = detail.first_name;
        var last_name = detail.last_name;
        var email = detail.email;
        var gender = detail.gender;
        var fbid = detail.id;
        var birthday = "";
        var loginvia = "facebook";
        //var membership_type = "free";
        // ...
        save_fbuser(uid, first_name, last_name, email, fbid, birthday, gender);
        //}
    });
}

/************* code before applying accesscode vlaidation ********************* */
// function save_fbuser(uid, first_name, last_name, email, fbid, birthday, gender) {

//     // alert(uid);
//     //return;
//     var currentdate = new Date();
//     var datetime = +currentdate.getFullYear() + "-"
//         + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
//         + ("0" + currentdate.getDate()).slice(-2) + " "
//         + ("0" + currentdate.getHours()).slice(-2) + ":"
//         + ("0" + currentdate.getMinutes()).slice(-2) + ":"
//         + ("0" + currentdate.getSeconds()).slice(-2);
//     var PCstatus = 'Mobile';

//     var isMobile = {
//         Android: function () {
//             return navigator.userAgent.match(/Android/i);
//         },
//         BlackBerry: function () {
//             return navigator.userAgent.match(/BlackBerry/i);
//         },
//         iOS: function () {
//             return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//         },
//         Opera: function () {
//             return navigator.userAgent.match(/Opera Mini/i);
//         },
//         Windows: function () {
//             return navigator.userAgent.match(/IEMobile/i);
//         },
//         any: function () {
//             return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//         }
//     }
//     if (!isMobile.any()) {
//         var PCstatus = 'Desktop';
//     }

//     var x = document.getElementsByName("gender");
//     var s;
//     for (var i = 0, length = x.length; i < length; i++) {
//         if (x[i].checked) {
//             // do whatever you want with the checked radio
//             s = x[i].value;
//             //alert(s);

//             // only one radio can be logically checked, don't check the rest
//             break;
//         }
//     }

//     //  console.log("ss"+uid);
//     //  var uid = user.uid;
//     var data = {
//         "user_id": uid,
//         "first_name": first_name,
//         "last_name": last_name,
//         "email": email,
//         "fb_id": fbid,
//         "google_id": "",
//         "visited": 0,
//         "login_via": "facebook",
//         "birthdate": "",
//         "gender": gender,
//         "registered_on": datetime,
//         "lastUpdated_on": datetime,
//         "halted": 0.0,
//         "last_free_conversation_id": 0,
//         "device_type": PCstatus,
//         "activated_on": "",
//         "activation_code": "",
//         "device_token": "",
//         "membership_type": "Free",
//         "total_time_divethru": 0,
//         "completed_conversation": 0,
//         "streak": '',
//     }
//     var updates = {};
//     updates['/Users/' + uid] = data;



//     var ref = firebase.database().ref('Users').child(uid);
//     ref.once('value').then(function (dataSnapshot) {
//         if (dataSnapshot.val() !== null) {
//             var data = dataSnapshot.val();
//             window.localStorage.setItem('user', JSON.stringify(dataSnapshot));
//             if (!ref.visited) {
//                 // firebase.database().ref('Users').child(uid).child("visited").set(1);
//             } else {

//                 // firebase.database().ref('Users').child(uid).child("visited").set(data.visted+1);
//             }

//             var currentdate = new Date();
//             var datetime = currentdate.getFullYear() + "-"
//                 + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
//                 + ("0" + currentdate.getDate()).slice(-2) + " "
//                 + ("0" + currentdate.getHours()).slice(-2) + ":"
//                 + ("0" + currentdate.getMinutes()).slice(-2) + ":"
//                 + ("0" + currentdate.getSeconds()).slice(-2);
//             // firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
//             swal({
//                 title: "Already Registered!",
//                 text: "User already registered.",
//                 html: true,
//                 type: "info",
//                 showCancelButton: false,
//                 confirmButtonColor: "#86CCEB",
//                 confirmButtonText: "OK",
//                 closeOnConfirm: false
//             });
//         } else {

//             firebase.database().ref().update(updates);
//             swal({
//                 title: "Registered!",
//                 text: "User Registered Sucessfully.",
//                 html: true,
//                 type: "success",
//                 showCancelButton: false,
//                 confirmButtonColor: "#86CCEB",
//                 confirmButtonText: "OK",
//                 closeOnConfirm: false
//             }, function () {
//                 window.setTimeout(function () {

//                     window.location.href = "welcome.php";
//                 }, 1000);
//             });
//         }

//     });

// }



function save_fbuser(uid, first_name, last_name, email, fbid, birthday, gender) {

    // alert(uid);
    //return;
    var currentdate = new Date();
    var datetime = +currentdate.getFullYear() + "-"
        + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
        + ("0" + currentdate.getDate()).slice(-2) + " "
        + ("0" + currentdate.getHours()).slice(-2) + ":"
        + ("0" + currentdate.getMinutes()).slice(-2) + ":"
        + ("0" + currentdate.getSeconds()).slice(-2);
    var PCstatus = 'Mobile';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
    if (!isMobile.any()) {
        var PCstatus = 'Desktop';
    }

    var x = document.getElementsByName("gender");
    var s;
    for (var i = 0, length = x.length; i < length; i++) {
        if (x[i].checked) {
            // do whatever you want with the checked radio
            s = x[i].value;
            //alert(s);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }



    var ref = firebase.database().ref('Users').child(uid);

    ref.once('value').then(function (dataSnapshot) {
        if (dataSnapshot.val() !== null) {
            var data = dataSnapshot.val();
            window.localStorage.setItem('user', JSON.stringify(dataSnapshot));
            if (!ref.visited) {
                // firebase.database().ref('Users').child(uid).child("visited").set(1);
            } else {

                // firebase.database().ref('Users').child(uid).child("visited").set(data.visted+1);
            }

            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-"
                + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
                + ("0" + currentdate.getDate()).slice(-2) + " "
                + ("0" + currentdate.getHours()).slice(-2) + ":"
                + ("0" + currentdate.getMinutes()).slice(-2) + ":"
                + ("0" + currentdate.getSeconds()).slice(-2);
            // firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
            swal({
                title: "Already Registered!",
                text: "User already registered.",
                html: true,
                type: "info",
                showCancelButton: false,
                confirmButtonColor: "#86CCEB",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        } else {

            //  window.access;
            swal({
                title: "Do you have any access code?",
                text: "Write your access code :",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                InputPlaceholder: "Aceess Code"
            }, function (inputValue) {

                var currentdate = new Date();
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
                    + ("0" + currentdate.getDate()).slice(-2) + " "
                    + ("0" + currentdate.getHours()).slice(-2) + ":"
                    + ("0" + currentdate.getMinutes()).slice(-2) + ":"
                    + ("0" + currentdate.getSeconds()).slice(-2);


                if (inputValue === false) {
                    var data = {
                        "user_id": uid,
                        "access_code": "",
                        "first_name": first_name,
                        "last_name": last_name,
                        "email": email,
                        "fb_id": fbid,
                        "google_id": "",
                        "visited": 0,
                        "login_via": "facebook",
                        "birthdate": "",
                        "gender": gender,
                        "registered_on": datetime,
                        "lastUpdated_on": datetime,
                        "halted": 0.0,
                        "last_free_conversation_id": 0,
                        "device_type": PCstatus,
                        "activated_on": "",
                        "activation_code": "",
                        "device_token": "",
                        "membership_type": "Free",
                        "total_time_divethru": 0,
                        "completed_conversation": 0,
                        "streak": '',
                    }

                    //save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender,"");
                    var updates = {};
                    updates['/Users/' + uid] = data;

                    firebase.database().ref().update(updates).then(function (snapshot) {
                        swal({
                            title: "Registered!",
                            text: "User Registered Sucessfully.",
                            html: true,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#86CCEB",
                            confirmButtonText: "OK",
                            closeOnConfirm: false
                        }, function () {
                            window.setTimeout(function () {

                                window.location.href = "login.php";
                            }, 1000);
                        });
                    });
                    return false;
                }

                if (inputValue === "") {
                    swal.showInputError("You need to enter Access Code!");
                    return false
                }



                var code = inputValue;

                if (code != "" && $.inArray(code, window.ACCKEY) != -1) {

                    for (i in window.CODES) {
                        if (code == i) {

                            var date1 = new Date(window.CODES[i].enddate);
                            alert(window.CODES[i].createdOn);
                            var date2 = new Date();
                            window.nopeopleused = window.CODES[i].maxpeopleallowed;
                            window.nopeopleusing = window.CODES[i].nopeopleusing;
                        }
                    }

                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
                    //alert(timeDiff / (1000 * 3600 * 24));
                    //alert(diffDays);
                    if ($.inArray(code, window.ACCKEY) != -1) {

                        if (parseInt(window.nopeopleused) >= parseInt(window.nopeopleusing) || (date1 != date2)) {
                            //$("#access_code").val("");
                            //$("#access_code").focus();
                            inputValue = "";
                            swal.showInputError("This code is not valid now!");

                            return false;

                        } else if (parseInt(window.nopeopleused) < parseInt(window.nopeopleusing)) {
                            window.nopeopleused = window.nopeopleused + 1;
                            firebase.database().ref("/AccessCodes/" + code).update({ nopeopleused: window.nopeopleused });


                            var data = {
                                "user_id": uid,
                                "access_code": inputValue,
                                "first_name": first_name,
                                "last_name": last_name,
                                "email": email,
                                "fb_id": fbid,
                                "google_id": "",
                                "visited": 0,
                                "login_via": "facebook",
                                "birthdate": "",
                                "gender": gender,
                                "registered_on": datetime,
                                "lastUpdated_on": datetime,
                                "halted": 0.0,
                                "last_free_conversation_id": 0,
                                "device_type": PCstatus,
                                "activated_on": "",
                                "activation_code": "",
                                "device_token": "",
                                "membership_type": "Free",
                                "total_time_divethru": 0,
                                "completed_conversation": 0,
                                "streak": '',
                            }
                            var updates = {};
                            updates['/Users/' + uid] = data;

                            firebase.database().ref().update(updates);


                            swal({
                                title: "Registered!",
                                text: "User Registered Sucessfully.",
                                html: true,
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#86CCEB",
                                confirmButtonText: "OK",
                                closeOnConfirm: false
                            }, function () {
                                window.setTimeout(function () {

                                    window.location.href = "login.php";
                                }, 1000);

                            });
                        }
                    }
                } else if (code != "" && $.inArray(code, window.ACCKEY) == -1) {
                    inputValue = "";
                    // $("#access_code").focus();
                    swal.showInputError("Please enter valid code.");

                    return false;
                }
            });
        }

    });

}



//Google Sign Up Code Start 

function googlesave_user() {

    //alert(55);
    var provider = new firebase.auth.GoogleAuthProvider();
    //	provider.addScope('email');
    //provider.addScope('user_birthday');
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        console.log(result);
        var user = result.user;
        var uid = firebase.auth().currentUser.uid;
        var detail = result.additionalUserInfo.profile;
        var first_name = detail.given_name;
        var last_name = detail.family_name;
        //var gender = detail.gender;
        var gid = detail.id;
        var email = detail.email;
        //var birthday = detail.birthday;
        var loginvia = "google";
        //var membership_type = "free";
        // ...
        save_googleuser(uid, first_name, last_name, gid, email);

    });
}



/********* code before applying access code validation ***********/

// function save_googleuser(uid, first_name, last_name, gid, email) {

//     //alert(uid);
//     //return;
//     var currentdate = new Date();
//     var datetime = +currentdate.getFullYear() + "-"
//         + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
//         + ("0" + currentdate.getDate()).slice(-2) + " "
//         + ("0" + currentdate.getHours()).slice(-2) + ":"
//         + ("0" + currentdate.getMinutes()).slice(-2) + ":"
//         + ("0" + currentdate.getSeconds()).slice(-2);
//     var PCstatus = 'Mobile';

//     var isMobile = {
//         Android: function () {
//             return navigator.userAgent.match(/Android/i);
//         },
//         BlackBerry: function () {
//             return navigator.userAgent.match(/BlackBerry/i);
//         },
//         iOS: function () {
//             return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//         },
//         Opera: function () {
//             return navigator.userAgent.match(/Opera Mini/i);
//         },
//         Windows: function () {
//             return navigator.userAgent.match(/IEMobile/i);
//         },
//         any: function () {
//             return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//         }
//     }
//     if (!isMobile.any()) {
//         var PCstatus = 'Desktop';
//     }

//     var x = document.getElementsByName("gender");
//     var s;
//     for (var i = 0, length = x.length; i < length; i++) {
//         if (x[i].checked) {
//             // do whatever you want with the checked radio
//             s = x[i].value;
//             //alert(s);

//             // only one radio can be logically checked, don't check the rest
//             break;
//         }
//     }

//     console.log("ss" + uid);
//     //  var uid = user.uid;
//     var data = {
//         "user_id": uid,
//         "first_name": first_name,
//         "last_name": last_name,
//         "visited": 0,
//         "email": email,
//         "login_via": "google",
//         "fb_id": "",
//         "google_id": gid,
//         "birthdate": "",
//         "gender": "",
//         "halted": 0.0,
//         "last_free_conversation_id": 0,
//         "registered_on": datetime,
//         "lastUpdated_on": datetime,
//         "device_type": PCstatus,
//         "activated_on": "",
//         "activation_code": "",
//         "device_token": "",
//         "membership_type": "Free",
//         "total_time_divethru": 0,
//         "completed_conversation": 0,
//         "streak": '',
//     }
//     var updates = {};
//     updates['/Users/' + uid] = data;


//     var ref = firebase.database().ref('Users').child(uid);
//     ref.once('value').then(function (dataSnapshot) {
//         if (dataSnapshot.val() !== null) {
//             var data = dataSnapshot.val();
//             window.localStorage.setItem('user', JSON.stringify(dataSnapshot));
//             if (!ref.visited) {
//                 // firebase.database().ref('Users').child(uid).child("visited").set(1);
//             } else {

//                 // firebase.database().ref('Users').child(uid).child("visited").set(data.visted+1);
//             }

//             var currentdate = new Date();
//             var datetime = currentdate.getFullYear() + "-"
//                 + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
//                 + ("0" + currentdate.getDate()).slice(-2) + " "
//                 + ("0" + currentdate.getHours()).slice(-2) + ":"
//                 + ("0" + currentdate.getMinutes()).slice(-2) + ":"
//                 + ("0" + currentdate.getSeconds()).slice(-2);
//             // firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
//             swal({
//                 title: "Already Registered!",
//                 text: "User already registered.",
//                 html: true,
//                 type: "info",
//                 showCancelButton: false,
//                 confirmButtonColor: "#86CCEB",
//                 confirmButtonText: "OK",
//                 closeOnConfirm: false
//             });
//         } else {

//             firebase.database().ref().update(updates);
//             swal({
//                 title: "Registered!",
//                 text: "User Registered Sucessfully.",
//                 html: true,
//                 type: "success",
//                 showCancelButton: false,
//                 confirmButtonColor: "#86CCEB",
//                 confirmButtonText: "OK",
//                 closeOnConfirm: false
//             }, function () {
//                 window.setTimeout(function () {

//                     window.location.href = "welcome.php";
//                 }, 1000);
//             });
//         }
//     });



// }



function save_googleuser(uid, first_name, last_name, gid, email) {

    //alert(uid);
    //return;
    var currentdate = new Date();
    var datetime = +currentdate.getFullYear() + "-"
        + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
        + ("0" + currentdate.getDate()).slice(-2) + " "
        + ("0" + currentdate.getHours()).slice(-2) + ":"
        + ("0" + currentdate.getMinutes()).slice(-2) + ":"
        + ("0" + currentdate.getSeconds()).slice(-2);
    var PCstatus = 'Mobile';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
    if (!isMobile.any()) {
        var PCstatus = 'Desktop';
    }

    var x = document.getElementsByName("gender");
    var s;
    for (var i = 0, length = x.length; i < length; i++) {
        if (x[i].checked) {
            // do whatever you want with the checked radio
            s = x[i].value;
            //alert(s);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }


    var ref = firebase.database().ref('Users').child(uid);
    ref.once('value').then(function (dataSnapshot) {
        if (dataSnapshot.val() !== null) {
            var data = dataSnapshot.val();
            window.localStorage.setItem('user', JSON.stringify(dataSnapshot));
            if (!ref.visited) {
                // firebase.database().ref('Users').child(uid).child("visited").set(1);
            } else {

                // firebase.database().ref('Users').child(uid).child("visited").set(data.visted+1);
            }

            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-"
                + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
                + ("0" + currentdate.getDate()).slice(-2) + " "
                + ("0" + currentdate.getHours()).slice(-2) + ":"
                + ("0" + currentdate.getMinutes()).slice(-2) + ":"
                + ("0" + currentdate.getSeconds()).slice(-2);
            // firebase.database().ref('Users').child(uid).child("lastUpdated_on").set(datetime);
            swal({
                title: "Already Registered!",
                text: "User already registered.",
                html: true,
                type: "info",
                showCancelButton: false,
                confirmButtonColor: "#86CCEB",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        } else {

            //  window.access;
            swal({
                title: "Do you have any access code?",
                text: "Write your access code :",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                InputPlaceholder: "Aceess Code"
            }, function (inputValue) {

                var currentdate = new Date();
                var datetime = currentdate.getFullYear() + "-"
                    + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
                    + ("0" + currentdate.getDate()).slice(-2) + " "
                    + ("0" + currentdate.getHours()).slice(-2) + ":"
                    + ("0" + currentdate.getMinutes()).slice(-2) + ":"
                    + ("0" + currentdate.getSeconds()).slice(-2);


                if (inputValue === false) {
                    var data = {
                        "user_id": uid,
                        "access_code": "",
                        "first_name": first_name,
                        "last_name": last_name,
                        "email": email,
                        "fb_id": "",
                        "google_id": gid,
                        "visited": 0,
                        "login_via": "facebook",
                        "birthdate": "",
                        "gender": gender,
                        "registered_on": datetime,
                        "lastUpdated_on": datetime,
                        "halted": 0.0,
                        "last_free_conversation_id": 0,
                        "device_type": PCstatus,
                        "activated_on": "",
                        "activation_code": "",
                        "device_token": "",
                        "membership_type": "Free",
                        "total_time_divethru": 0,
                        "completed_conversation": 0,
                        "streak": '',
                    }

                    //save_fbuser(uid,first_name,last_name,email,fbid,birthday,gender,"");
                    var updates = {};
                    updates['/Users/' + uid] = data;

                    firebase.database().ref().update(updates).then(function (snapshot) {
                        swal({
                            title: "Registered!",
                            text: "User Registered Sucessfully.",
                            html: true,
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#86CCEB",
                            confirmButtonText: "OK",
                            closeOnConfirm: false
                        }, function () {
                            window.setTimeout(function () {

                                window.location.href = "login.php";
                            }, 1000);
                        });
                    });
                    return false;
                }

                if (inputValue === "") {
                    swal.showInputError("You need to enter Access Code!");
                    return false
                }



                var code = inputValue;

                if (code != "" && $.inArray(code, window.ACCKEY) != -1) {

                    for (i in window.CODES) {
                        if (code == i) {

                            var date1 = new Date(window.CODES[i].enddate);
                            alert(window.CODES[i].createdOn);
                            var date2 = new Date();
                            window.nopeopleused = window.CODES[i].maxpeopleallowed;
                            window.nopeopleusing = window.CODES[i].nopeopleusing;
                        }
                    }

                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
                    //alert(timeDiff / (1000 * 3600 * 24));
                    //alert(diffDays);
                    if ($.inArray(code, window.ACCKEY) != -1) {

                        if (parseInt(window.nopeopleused) >= parseInt(window.nopeopleusing) || (date1 != date2)) {
                            //$("#access_code").val("");
                            //$("#access_code").focus();
                            inputValue = "";
                            swal.showInputError("This code is not valid now!");

                            return false;

                        } else if (parseInt(window.nopeopleused) < parseInt(window.nopeopleusing)) {
                            window.nopeopleused = window.nopeopleused + 1;
                            firebase.database().ref("/AccessCodes/" + code).update({ nopeopleused: window.nopeopleused });


                            var data = {
                                "user_id": uid,
                                "access_code": inputValue,
                                "first_name": first_name,
                                "last_name": last_name,
                                "email": email,
                                "fb_id": "",
                                "google_id": gid,
                                "visited": 0,
                                "login_via": "facebook",
                                "birthdate": "",
                                "gender": gender,
                                "registered_on": datetime,
                                "lastUpdated_on": datetime,
                                "halted": 0.0,
                                "last_free_conversation_id": 0,
                                "device_type": PCstatus,
                                "activated_on": "",
                                "activation_code": "",
                                "device_token": "",
                                "membership_type": "Free",
                                "total_time_divethru": 0,
                                "completed_conversation": 0,
                                "streak": '',
                            }
                            var updates = {};
                            updates['/Users/' + uid] = data;

                            firebase.database().ref().update(updates);


                            swal({
                                title: "Registered!",
                                text: "User Registered Sucessfully.",
                                html: true,
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#86CCEB",
                                confirmButtonText: "OK",
                                closeOnConfirm: false
                            }, function () {
                                window.setTimeout(function () {

                                    window.location.href = "login.php";
                                }, 1000);

                            });
                        }
                    }
                } else if (code != "" && $.inArray(code, window.ACCKEY) == -1) {
                    inputValue = "";
                    // $("#access_code").focus();
                    swal.showInputError("Please enter valid code.");

                    return false;
                }
            });
        }
    });

}
//End Google sign up code
