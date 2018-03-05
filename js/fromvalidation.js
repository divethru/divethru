function formValidation() {
// Make quick references to our fields.
var Fname = document.getElementById('first_name');
var Lname = document.getElementById('last_name');
var Email = document.getElementById('email');


// To check empty form fields.
if (first_name.value.length == 0  && last_name.value.length == 0 && email.value.length == 0 && password.value.length == 0 ) {
document.getElementById('head').innerText = "* All fields are mandatory *"; // This segment displays the validation rule for all fields


return false;
}
// Check each input in the order that it appears in the form.
if (inputfAlphabet(first_name, "* For your First name please use alphabets only *")) {
if (inputlAlphabet(last_name, "* For your Last name please use alphabets only *")) {
if (emailValidation(email, "* Please enter a valid email address *")) {
return true;
}
}
}		
return false;

}

// Function that checks whether input text is an alphabetic character or not.
function inputfAlphabet(inputtext, alertMsg) {
var alphaExp = /^[a-zA-Z]+$/;
if (inputtext.value.match(alphaExp)) {
return true;
} else {
document.getElementById('p1').innerText = alertMsg; // This segment displays the validation rule for name.
//alert(alertMsg);
inputtext.focus();
return false;
}
}
// Function that checks whether input text is an alphabetic character or not.
function inputlAlphabet(inputtext, alertMsg) {
var alphaExp = /^[a-zA-Z]+$/;
if (inputtext.value.match(alphaExp)) {
return true;
} else {
document.getElementById('p2').innerText = alertMsg; // This segment displays the validation rule for name.
//alert(alertMsg);
inputtext.focus();
return false;
}
}

// Function that checks whether an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation(inputtext, alertMsg) {
var emailExp =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (inputtext.value.match(emailExp)) {
return true;
} else {
document.getElementById('p3').innerText = alertMsg; // This segment displays the validation rule for email.
inputtext.focus();
return false;
}
}




 

