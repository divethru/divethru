
<?php 
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
require '../vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;


$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$category = get("Category");
$cnm[] = "";
$bnm[] = "";

function get($path){
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}

foreach($category as $k => $v){
    if($v['Session'] != ''){
        
         foreach($v['Session'] as $key => $val ){
            $c2[] = $k;
             $session[] = $val;
             $cat[] = 0;
                $bdn[] = 0;
                $bnm[]= "No Bundle";
         }
    }else if($v['SubCategory'] != ''){
        
        
            foreach($v['SubCategory'] as $s=> $c){
                    if($c['Bundle'] != ''){
                foreach($c['Bundle'] as $b => $bl){
                    if($bl['Session'] != ''){
                        
                        foreach($bl['Session'] as $sn => $v2){
                            $c2[] = $k;
                            $session[] = $v2;
                $cat[] = $s;
                $bdn[] = $b;
                $bnm[] = $bl["bundle_name"];
                        }
                    }
                    //die;
                }
                }
                if($c['Session'] != ''){
                    foreach ($c['Session'] as $ks => $vs) {
                        $c2[] = $k;
                            $session[] = $vs;
                         //   echo $ks;
                $cat[] = $s;
                $bdn[] = 0;
                $bnm[] = "No bundle";
                        # code...
                    }
                }
            } 
        
    }else if($v['Bundle'] != ''){
        foreach($v['Bundle'] as $b2 => $bl2){
                    if($bl2['Session'] != ''){
                        
                        foreach($bl2['Session'] as $b3 => $v3){
                            $c2[] = $k;
                             $session[] = $v3;
                                            $cat[] = 0;
                            $bdn[] = $b2;
                            $bnm[] = $bl2["bundle_name"];
                        }
                    }
                    //die;
                }
    }
}
    //print_r($session[0]);
    //var_dump($session);
    
    
    /*foreach($session as $k => $s){
        
        print_r($s['session_name']);
        
    }
//print_r($category);
die;*/
?>



<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>Session | DiveThru Admin </title>
    <!-- Favicon-->
    <link rel="icon" href="favicon.ico" type="image/x-icon">


    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />

        <!-- Sweetalert Css -->
    <link href="plugins/sweetalert/sweetalert.css" rel="stylesheet" />

  <!-- JQuery DataTable Css -->
    <link href="plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">
    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="css/themes/all-themes.css" rel="stylesheet" />
    <script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
        <script>
          // Initialize Firebase
        var config = {
    apiKey: "AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw",
    authDomain: "divethru-71c56.firebaseapp.com",
    databaseURL: "https://divethru-71c56.firebaseio.com",
    projectId: "divethru-71c56",
    storageBucket: "divethru-71c56.appspot.com",
    messagingSenderId: "53159239409"
  };
  /*var config = {
    apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
    authDomain: "divethrutest.firebaseapp.com",
    databaseURL: "https://divethrutest.firebaseio.com",
    projectId: "divethrutest",
    storageBucket: "divethrutest.appspot.com",
    messagingSenderId: "19401978174"
  };*/
  firebase.initializeApp(config);
        </script>
                   <script type="text/javascript" src="js/check_login.js"></script>
</head>

<body class="theme-red">
    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Please wait...</p>
        </div>
    </div>
    <!-- #END# Page Loader -->
    <!-- Overlay For Sidebars -->
    <div class="overlay"></div>
    <!-- #END# Overlay For Sidebars -->
    <!-- Search Bar -->
    <div class="search-bar">
        <div class="search-icon">
            <i class="material-icons">search</i>
        </div>
        <input type="text" placeholder="START TYPING...">
        <div class="close-search">
            <i class="material-icons">close</i>
        </div>
    </div>
    <!-- #END# Search Bar -->
    <!-- Top Bar -->
    <nav class="navbar">
        <?php include("navbar.php");?>
    </nav>
    <!-- #Top Bar -->
    <section>
        <!-- Left Sidebar -->

        <?php include("sidebar.php");?>
        <!-- #END# Right Sidebar -->
    </section>

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>Session</h2>
            </div>
            
             <!-- Basic Examples -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                 List 
                            </h2>
                            <!--<ul class="header-dropdown m-r--5">
                                <li class="dropdown">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li><a href="javascript:void(0);">Action</a></li>
                                        <li><a href="javascript:void(0);">Another action</a></li>
                                        <li><a href="javascript:void(0);">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>-->
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>Session Name</th>
                                            <th>Session Description</th>
                                          <!--   <th>Session Quote Description</th> -->
                                            <th>Session Category</th>
                                            <th>Session Bundle</th>
                                           <!-- <th>Subcription Type</th>-->    
                                            <th>Image</th>
                                            <th>Quote Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <?php
                                        if(count($session)>0){
                                            
                                        foreach($session as $ky => $u){
                                            echo "<tr>";
                                                echo "<td>";
                                                echo  !empty($u['session_name'])?$u['session_name']:'-';
                                                echo "</td>";
                                                echo "<td>";
                                                echo !empty($u['session_description'])?$u['session_description']:'-';
                                                echo "</td>";
                                               /*  echo "<td>";
                                                echo !empty($u['session_quote_description'])?$u['session_quote_description']:'-';
                                                echo "</td>";*/
                                                
                                              echo "<td>".$c2[$ky]."</td>";
                                              echo "<td>".$bnm[$ky+1]."</td>";
                                                echo "<td><img src='";
                                                echo !empty($u['session_img'])?$u['session_img']:'#';
                                                echo "' width='50' height='50' id='simg'></td>";
                                                 echo "<td><img src='";
                                                echo !empty($u['session_quote_img'])?$u['session_quote_img']:'#';
                                                echo "' width='50' height='50' id='qimg'></td>";
                                            
                                                ?>
                                                
                                                <td><a href='#' onclick='edit("<?php echo $u['session_id'];?>","<?php echo $bdn[$ky];?>","<?php echo $cat[$ky];?>","<?php echo $c2[$ky]; ?>");'><i class="material-icons">mode_edit</i></a> &nbsp;  <a href='#' onclick='del("<?php echo $u['session_id'];?>","<?php echo $bdn[$ky];?>","<?php echo $cat[$ky];?>","<?php echo $c2[$ky]; ?>");'><i class="material-icons" style="color:#dc5753;">delete</i></a></td>
                                                <?php 
                                            echo "</tr>";
                                            
                                        }
                                        
                                        }
                                    
                                        ?>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Basic Examples -->
        </div>
    </section>

    <!-- Jquery Core Js -->
    <script src="plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="plugins/node-waves/waves.js"></script>
        
     <!-- SweetAlert Plugin Js -->
    <script src="plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Jquery DataTable Plugin Js -->
    <script src="plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script> 
   <script type="text/javascript" src="js/jquery.redirect.js"></script>
                <script type="text/javascript" src="js/upload.js"></script>
    <!-- Custom Js -->
    <script src="js/admin.js"></script>

    <!-- Demo Js -->
    <script src="js/demo.js"></script>
    <script type="text/javascript">
        var catRef = firebase.database().ref().child('category');
    catRef.on('child_changed', function(snapshot) {
            location.reload(true);
    });
            function edit(id,bundle,session,c){
            
             $.redirect("session_edit.php",{'id':id,'bundle':bundle,'session':session,'cat':c},"POST",null,null,true);
             
             }
        
            function del(key,b,s,c){
//                alert(b);
                //console.log($("#simg").attr("src"));
            ////var ref = firebase.database().ref('Users');

                // if(ref){
                
                //         alert('This session Deleted Sucessfully');
                //         window.location.reload();
                //     }
            

            swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function () {
                            var id = key;
                            // if(firebase.database().ref().child('/Category/Open Dive/Session/' + id)){
                            //     alert(firebase.database().ref().child('/Category/Open Dive/Session/' + id));
                            // }else{
                            //     alert('NOt');
                            // }
                            if(s!=0 && b!=0){               
                            var ref = firebase.database().ref().child('/Category/'+c+'/SubCategory/'+s+'/Bundle/'+b+'/Session/' + id).remove();
                            }else if(b!=0 && s==0){
                                var ref = firebase.database().ref().child('/Category/'+c+'/Bundle/'+b+'/Session/' + id).remove();
                            }else if(b==0 && s!=0){
                                var ref = firebase.database().ref().child('/Category/'+c+'/SubCategory/'+s+'/Session/' + id).remove();
                            }else{
                                var ref = firebase.database().ref().child('/Category/'+c+'/Session/' + id).remove();
                                
                            }
                        if(ref){
                            
                                    //alert('This category Deleted Sucessfully');
                                swal({title: "Deleted!", text: "Session has been deleted.", type: "success"},
                                        function(){ 
                                         window.setTimeout(function() {
                                  window.location.href = "session_list.php";
                                }, 1000);
                                     }
                                );
                       // window.location.reload();
                        }
                });


            
        }
        
        $(function () {

    
    $('.js-basic-example').DataTable({
        responsive: true,
        //pagination: true,
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
});
    </script>
</body>

</html>