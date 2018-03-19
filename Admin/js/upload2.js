(function() { 
var audio; 
var xhr; 
var audioname=document.getElementById('audioname'); 
var access_token=document.getElementById('access_token').value; 
var audiofile=document.getElementById('audiofile'); 
var result=document.getElementById('upload_result'); 
var upload_form=document.getElementById('upload_form'); 
//checks if HTML5 Files supports or not. 
if (window.File && window.FileList && window.FileReader) { 
init(); 
} 
//initilizeing 
function init(){ 
audiofile.addEventListener("change", getAudio, false); 
upload_form.addEventListener("submit",uploadAudio,false); 
} 
//getting audio file when selecting it 
function getAudio(e){ 
audio= this.files[0]; 
} 
//main function of uploaidng file 
function uploadAudio(e) { 
result.innerHTML='<p style="text-align:center"><img src="img/loading.gif"></p>'; 
audioname=audioname.value; 

//Generating custom FormData HTML5 
var formData = new FormData(); 
formData.append("access_token",access_token); 
formData.append("audioname",audioname); 
formData.append("audiofile", audio); 
//Createing XHR2 object 
xhr=new XMLHttpRequest(); 
//triger after successful compleate request 
xhr.addEventListener("load", function(){ 
result.innerHTML=xhr.responseText; 
}, false); 
xhr.open('POST','ajaxupload.php'); 
xhr.send(formData); 
e.preventDefault(); 
} 
})(); 
