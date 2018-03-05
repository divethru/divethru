function loginValidation() {
	var Email = document.getElementById('email');

	if (email.value.length == 0 || password.value.length == 0 ) {
		document.getElementById('all').innerText = "* All fields are mandatory Enter Email ID and Password *"; // This segment displays the validation rule for all fields
		email.focus();

		return false;
}

if (emailValidation(email, "* Please enter a valid email address *")) {
return true;

}
return false;

}

function emailValidation(inputtext, alertMsg) {
var emailExp =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (inputtext.value.match(emailExp)) {
return true;
} else {
document.getElementById('p1').innerText = alertMsg; // This segment displays the validation rule for email.
inputtext.focus();
return false;
}
} 