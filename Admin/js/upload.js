
function uplaodfile() {
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
}

function uplaodsubimgfile() {
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
}



function uplaodsimgfile() {
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
}   

function uplaodbimgfile() {
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
if(document.getElementById("maudio")){
document.getElementById("maudio").addEventListener('change', function(e){ 
    //Get files
//alert(5);
var audio = []; 
    for (var i = 0; i < e.target.files.length; i++) {
        var File = e.target.files[i];
//console.log(imageFile);
       // uploadImageAsPromise(File,audio);
       var file_data = File;   
    console.log(file_data.type);
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
            $("#murl").val(audio);
            console.log(data); // display response from the PHP script, if any
        }
     });
        
    }
});

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