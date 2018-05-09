<!-- <script src="js/jquery-1.10.2.js"></script> -->

<nav class="navbar navbar-expand-lg  fixed-top  navbar-light bg-white header">
        <button class="navbar-toggler togle-pad" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03">
          <span class="navbar-toggler-icon"></span>
        </button> 
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="dashboard.php"><img class="navbar-brand logo img-margin" src="img/logo.png"></a>

        <div class="collapse navbar-collapse header-item" id="navbarTogglerDemo03">
          <ul class="navbar-nav ml-auto ul-bg ipadnav" style="margin-right: 7%;">
            
          <li class="nav-item li-border">
              <a class="nav-link" href="dashboard.php">HOME</a>
           </li>
           <li class="nav-item li-border">
              <a class="nav-link" href="quickdive.php">QUICK DIVE</a>
           </li>
            <li class="nav-item dropdown li-border ">
              <a class="nav-link dropdown-toggle dropdown-toggle1" href="#" data-toggle="dropdown">DEEP DIVE</a>
             <div class="dropdown-menu dropdown1">
                <a class="dropdown-item" href="DeepMain.php">MAIN</a>
                
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="individual.php">INDIVIDUAL</a>
              </div>
              </li>
          <li class="nav-item li-border ">
              <a class="nav-link " href="session.php">OPEN DIVE</a>
              </li>
          
          <li class="nav-item dropdown li-border1">
              <a class="nav-link py-0 dropdown-toggle dropdown-toggle1" href="#" data-toggle="dropdown" >
            <img src="img/profile.png"  class="img-fluid rounded-circle profile" style="max-width: 40px; max-height: 40px; padding-top: 0 !important;
            padding-bottom: 0;"/></a>
            <!-- <div class="dropdown-menu dropdown2" > -->
               <!--  <a class="dropdown-item " href="#" style="font-size: 18px;">MY STATS</a>
                <a class="dropdown-item pb-2" href="#" style="font-size: 18px;">MY PROFILE</a>
                <a class="dropdown-item pb-2" href="#" style="font-size: 18px;">DIV WITH FRIENDS</a> -->
                <div class="dropdown-menu dropdown1">
                <a class="dropdown-item" href="mystreak.php">MY JOURNEY</a>
                
                <div class="dropdown-divider" style=""></div>
                <a class="dropdown-item" href="http://34.215.40.163/editprofile.php">MY PROFILE</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">DIVE WITH FRIENDS</a>
                  <div class="dropdown-divider"></div>
                <a class="dropdown-item pb-2" style="color:red !important; font-size: 18px;" href="javascript:void(0)" onclick="sign_out();">LOG OUT<span><i class="fa fa-power-off pl-5" aria-hidden="true" ></i></span></a>
                 </div>
                       <!--   </div> -->
            
              </li>
            
          
            
          </ul>
          
        </div>
    </nav>
    <script>
      $(document).ready(function(){
        var user = JSON.parse(window.localStorage.getItem('user'));
        
         // console.log(user.profile_image);
          if(user.profile_image !=''){
            $(".profile").attr("src",user.profile_image);
          }
        

      });
    </script>