var _URL = window.URL || window.webkitURL;
window.imagesize = false;

function uplaodqimg() {
    
    document.getElementsByClassName("catadd").disabled = true;

$(".sessionadd").attr("disabled","disabled");
   
    var img,file;
    if ((file = $('#qimage').prop('files')[0])) {
        img = new Image();
        img.onload = function () {
           if(this.width == 1920 && this.height == 1080){
            window.imagesize = true;
           }else{
            window.imagesize = false;
           }
        };
        img.src = _URL.createObjectURL(file);
    }
   // if(window.imagesize){
    var file_data = $('#qimage').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('quote', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
           // alert(data);
            $("#qimgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
 //}
}





function uplaodfile() {
	//catagory Image Validation Start
	

		
	//catagory Image Validation End
	
    document.getElementsByClassName("catadd").disabled = true;

$(".catadd").attr("disabled","disabled");
  /*  var selectedfile = document.querySelector('#catimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/category/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('imgurl').value = downloadURL;
        document.getElementsByClassName("catadd").disabled = false;
        
$(".catadd").removeAttr("disabled");
    });*/
    var img,file;
    if ((file = $('#catimage').prop('files')[0])) {
        img = new Image();
        img.onload = function () {
           if(this.width == 1920 && this.height == 1080){
            window.imagesize = true;
           }else{
            window.imagesize = false;
           }
        };
        img.src = _URL.createObjectURL(file);
    }
 //if(window.imagesize){                       
    var file_data = $('#catimage').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('cat', file_data);
 //   alert(form_data);  
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
           // alert(data);
            $("#imgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".catadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
  //  }
}

function uplaodsubimgfile() {
	
	//Subcatagory Image Validation Start
	

		
	//Subcatagory Image Validation End	
	
   // document.getElementsByClassName("catadd").disabled = true;

$(".subcatadd").attr("disabled","disabled");
  /*  var selectedfile = document.querySelector('#subcatimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/subcategory/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('subimgurl').value = downloadURL;
        //document.getElementsByClassName("catadd").disabled = false;
        
$(".subcatadd").removeAttr("disabled");
    });*/
    var img,file;
    if ((file = $('#subcatimage').prop('files')[0])) {
        img = new Image();
        img.onload = function () {
           if(this.width == 1920 && this.height == 1080){
            window.imagesize = true;
           }else{
            window.imagesize = false;
           }
        };
        img.src = _URL.createObjectURL(file);
    }

    //if(window.imagesize){
    var file_data = $('#subcatimage').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('subcat', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            $("#subimgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".subcatadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
   // }
}



function uplaodsimgfile() {
	//Session Image Validation Start
	

		
	//Session Image Validation Start	
    document.getElementsByClassName("sessionadd").disabled = true;

$(".sessionadd").attr("disabled","disabled");
/*    var selectedfile = document.querySelector('#sessionimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/session/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('simgurl').value = downloadURL;
        document.getElementsByClassName("sessionadd").disabled = false;
        
$(".sessionadd").removeAttr("disabled");
    });*/
	var img,file;
    if ((file = $('#sessionimage').prop('files')[0])) {
        img = new Image();
        img.onload = function () {
           if(this.width == 1920 && this.height == 1080){
            window.imagesize = true;
           }else if(this.width != 1920 && this.height != 1080){
            window.imagesize = false;
           }
        };
        img.src = _URL.createObjectURL(file);
    }

//    if(window.imagesize){
    var file_data = $('#sessionimage').prop('files')[0];
    console.log(file_data);
    var form_data = new FormData();                  
    form_data.append('session', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            $("#simgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
    //}
}   

function uplaodbimgfile() {
	
	//
	//Bundle Image Validation End
	
    //document.getElementsByClassName("sessionadd").disabled = true;

$(".bundleadd").attr("disabled","disabled");
  /*  var selectedfile = document.querySelector('#bundleimage').files[0];
    var filename = selectedfile.name;
    var storageRef = firebase.storage().ref("/bundle/" + filename);
    var metadata = {contentType: selectedfile.type};
    var uploadTask = storageRef.put(selectedfile, metadata);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }

    },function(error){
        console.log(error);
    },function(){

         var downloadURL = uploadTask.snapshot.downloadURL;
        document.getElementById('bimgurl').value = downloadURL;
        //document.getElementsByClassName("sessionadd").disabled = false;
        
$(".bundleadd").removeAttr("disabled");
    });*/
    var img,file;
    if ((file = $('#bundleimage').prop('files')[0])) {
        img = new Image();
        img.onload = function () {
           if(this.width == 1920 && this.height == 1080){
            window.imagesize = true;
           }else{
            window.imagesize = false;
           }
        };
        img.src = _URL.createObjectURL(file);
    }

    if(window.imagesize){
    var file_data = $('#bundleimage').prop('files')[0];   

    var form_data = new FormData();                  
    form_data.append('bundle', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            $("#bimgurl").val("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $(".bundleadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
   } 
    
}   


function uploadsfile() {
    document.getElementsByClassName("sessionadd").disabled = true;

$(".sessionadd").attr("disabled","disabled");
    var fileno = document.querySelector('#soutro').files.length;
    var files = document.querySelector('#soutro').files;
    
    
    
    
        
            var selectedfile = document.querySelector('#soutro').files[0];
            
            var filename = selectedfile.name;
            uploadImageAsPromise(filename);
//console.log(selectedfile);
            var storageRef = firebase.storage().ref("/outro/" + filename);
            var metadata = {contentType: selectedfile.type};
            var uploadTask = storageRef.put(selectedfile, metadata);

            uploadTask.on('state_changed', function (snapshot) {

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }

            },function(error){
                console.log(error);
            },function(){

                 var downloadURL = uploadTask.snapshot.downloadURL;
                 console.log("FILE"+downloadURL);
                 
                 
                document.getElementById('surl').value = downloadURL;
                document.getElementsByClassName("sessionadd").disabled = false;
                
        $(".sessionadd").removeAttr("disabled");
    });
    
    
}
var audio = []; 
var time = []; 

if(document.getElementById("maudio")){
document.getElementById("maudio").addEventListener('change', function(e){ 
    //Get files
//alert(5);
if($("#maudio").next().has('.time')){
    console.log(e.target.files.length);
$(".time").remove();
    //var aud = new Audio();
   // audio = []; 
}

// code for removing more than entry
if(audio.length >= 1){

    audio.pop();
        time.pop();
   // audio.splice(-1,1);
    console.log("pop");
    console.log(audio);
}
$(".sessionadd").attr("disabled", "disabled");
    document.getElementsByClassName("sessionadd").disabled = true;
 $(".fa-spinner").show();
$("#maudio").after("");
 for (var j = 0; j < e.target.files.length; j++) {
 var File = e.target.files[j];
obUrl = URL.createObjectURL(File);
       var aud = new Audio();
aud.src = obUrl;
        console.log(obUrl);          
                    //Now lets play the music
                    aud.onloadedmetadata = function() {
  //return aud.duration;
var ti = Math.round(aud.duration/60);
$("#maudio").after("<span class='time'>Time duration : <b>"+ti+" Minutes</b></span>");
  //$(".meditaoion").append(m);
};
 audio_time(File);
 }
    for (var i = 0; i < e.target.files.length; i++) {
        var File = e.target.files[i];
//console.log(imageFile);
       // uploadImageAsPromise(File,audio);
        
       var file_data = File;   
       
    console.log(File.name);
    var form_data = new FormData();                  
    form_data.append('meditation', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            if(data){
                    //You could also do
                    
                
            /*$.post("test.php", {"path": 'http://34.215.40.163/Admin/'+data.replace(/\n/g, '')}, function(result){
                console.log(result);
            });*/
            }
            audio.push("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $("#murl").val(audio);
            if($("#audio").length){
                
            $("#audio").tagsinput("removeAll");
            $("#audio").tagsinput("add",File.name);
            }
         //   if($("#cat option:selected").text() == 'Open Dive'){

                        $(".fa-spinner").hide();
            $(".sessionadd").removeAttr("disabled");
            //}
            console.log(data); // display response from the PHP script, if any
        }
     });
        
    }
});

}
if(document.getElementById("maudio2")){
document.getElementById("maudio2").addEventListener('change', function(e){ 
    //Get files
//alert(5);
///$("#maudio2").next().remove();
if($("#maudio2").next().has('.time2')){
    console.log(e.target.files.length);
$(".time2").remove();
   // var aud = new Audio();
   // audio = []; 

}
//removing id entry more than 2
if(audio.length >= 2){
    audio.pop();
    time.pop();
   // audio.splice(-1,1);
    console.log("pop");
    console.log(audio);
}
console.log($("#mtime").val().length);
$(".sessionadd").attr("disabled", "disabled");
    document.getElementsByClassName("sessionadd").disabled = true;
        $(".fa-spinner").show();
 for (var j = 0; j < e.target.files.length; j++) {
 var File = e.target.files[j];
obUrl = URL.createObjectURL(File);
       var aud = new Audio();
aud.src = obUrl;
        console.log(obUrl);          
                    //Now lets play the music
                    aud.onloadedmetadata = function() {
  //return aud.duration;
var ti = Math.round(aud.duration/60);
$("#maudio2").after("<span class='time2'>Time duration : <b>"+ti+" Minutes</b></span>");
  //$(".meditaoion").append(m);
};

 audio_time(File);
 }
    for (var i = 0; i < e.target.files.length; i++) {
        var File = e.target.files[i];
//console.log(imageFile);
       // uploadImageAsPromise(File,audio);
        
       var file_data = File;   
       
    console.log(File);
    var form_data = new FormData();                  
    form_data.append('meditation', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            if(data){
                    //You could also do
                    
                
            /*$.post("test.php", {"path": 'http://34.215.40.163/Admin/'+data.replace(/\n/g, '')}, function(result){
                console.log(result);
            });*/
            }
            audio.push("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
            $("#murl").val(audio);

            if($("#audio3").length){
                // $(".fa-spinner").hide();
         //   $(".sessionadd").removeAttr("disabled");
            $("#audio3").tagsinput("removeAll");
            $("#audio3").tagsinput("add",File.name);
            }
                var murl2 = $("#murl").val();
       var audioLEN = murl2.split(',');
      // alert(audioLEN.length);

    //  alert($("#catnm").val());
        if(audioLEN.length == 2){
              $(".fa-spinner").hide();
             $(".sessionadd").removeAttr("disabled");
         }
              //          $(".fa-spinner").hide();
            //$(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
        
    }
});

}
if(document.getElementById("maudio3")){
document.getElementById("maudio3").addEventListener('change', function(e){ 
    //Get files
//alert(5);
//$("#maudio3").next().remove();
if($("#maudio3").next().has('.time3')){
    console.log(e.target.files.length);
$(".time3").remove();
   // var aud = new Audio();
   // audio = []; 
}
// removing if entry more than 3
if(audio.length >= 3 ){
    audio.pop();
    time.pop();
   // audio.splice(-1,1);
    console.log("pop");
    console.log(audio);
}
$(".sessionadd").attr("disabled", "disabled");
    document.getElementsByClassName("sessionadd").disabled = true;
 $(".fa-spinner").show();
 for (var j = 0; j < e.target.files.length; j++) {
 var File = e.target.files[j];
obUrl = URL.createObjectURL(File);
       var aud = new Audio();
aud.src = obUrl;
        console.log(obUrl);          
                    //Now lets play the music
                    aud.onloadedmetadata = function() {
  //return aud.duration;
var ti = Math.round(aud.duration/60);
$("#maudio3").after("<span class='time3'>Time duration : <b>"+ti+" Minutes</b></span>");
  //$(".meditaoion").append(m);
};

 audio_time(File);
 }
    for (var i = 0; i < e.target.files.length; i++) {
        var File = e.target.files[i];
//console.log(imageFile);
       // uploadImageAsPromise(File,audio);
        
       var file_data = File;   
       
    console.log(File);
    var form_data = new FormData();                  
    form_data.append('meditation', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            if(data){
                    //You could also do
                    
                
            /*$.post("test.php", {"path": 'http://34.215.40.163/Admin/'+data.replace(/\n/g, '')}, function(result){
                console.log(result);
            });*/
            }
            audio.push("http://34.215.40.163/Admin/"+data.replace(/\n/g, ''));
           var murl = $("#murl").val(audio);
            if($("#audio4").length){
                
            $("#audio4").tagsinput("removeAll");
            $("#audio4").tagsinput("add",File.name);
            }
           var murl2 = $("#murl").val();
       var audioLEN = murl2.split(',');
   //   alert(audioLEN.length);
        if(audioLEN.length == 3 || ($("#catnm").val() == "10 Day Intro Program" && audioLEN.length == 2) ){
              $(".fa-spinner").hide();
             $(".sessionadd").removeAttr("disabled");
         }
     //       $(".fa-spinner").hide();
     //      $(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
        
    }
});

}
// Function yo get audio time

function audio_time(File){
    obUrl = URL.createObjectURL(File);
       var aud = new Audio();
    aud.src = obUrl;
     console.log(obUrl);          
                    //Now lets play the music
  aud.onloadedmetadata = function() {
        //return aud.duration;
      time.push(Math.round(aud.duration/60));
    $("#mtime").val(time);
    };
}


//Handle waiting to upload each file using promise
function uploadImageAsPromise (File,audio) {
    $(".sessionadd").attr("disabled","disabled");
    
    return new Promise(function (resolve, reject) {
 /*       var storageRef = firebase.storage().ref("/meditation/"+File.name);
var metadata = {contentType: File.type};
        //Upload file
        var task = storageRef.put(File,metadata);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
               // uploader.value = percentage;
                console.log('Upload is ' + percentage + '% done');
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
                audio.push(downloadURL);
                document.getElementById('murl').value = audio;
                $(".sessionadd").removeAttr("disabled");
        
            }
        );*/
        var file_data = File;   
    console.log(file_data);
    var form_data = new FormData();                  
    form_data.append('meditation', file_data);
 //   alert(form_data);                             
    $.ajax({
        url: 'action.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(data){
            audio.push("http://34.215.40.163/Admin/"+data);
            $(".sessionadd").removeAttr("disabled");
            console.log(data); // display response from the PHP script, if any
        }
     });
        
                
    });
}