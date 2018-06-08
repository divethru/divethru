<style>
.loginline {
        height: 40px;
    }

#lg:hover{
	color: #7dd3d5;
}

#lg:not(:hover){
	color: rgba(0,0,0,.5) !important;
}

@media only screen and (max-width: 991px) {
    .loginline {
		padding-left: 10px;
        height: 1px;
		width: 206px;
    }
	.reg_button{
		width: 206px;
	}
	.navbar-fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
	}
	 
}
	.btn123 {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
        border: 2px solid #7dd3d5;
    padding: .450rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 1.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.navbar-bg {background-color: transparent;}

.navs-pad a {padding-right: 1.5rem !important; 
	       padding-left: 1.5rem !important;       
	       color:#34495e;}

.navs-pad1 a {padding-right: 2.5rem !important;  
	        padding-left: 2.5rem !important; }

.li-border{border-bottom:none;
          padding: 7px 0;}

.li-border1{border-bottom:none;
          padding: 7px 0;}

.nav-style {padding: 9px 100px 9px 10px; 
	        box-shadow: 0 0px 37px 0 rgba(0,2,0,0.1)}


.mobile-hide {display: block;}

.mobile-show {display: none;}

@media(max-width:991px){
	.mobile-hide {display: none;}
	
	.mobile-show {display: block;}
	
	.nav-style {padding: 0px 0px 0px 0px; 
	            box-shadow: 0 0px 37px 0 rgba(0,2,0,0.1);}
	
	.navbar-bg {background-color: #7dd3d5 !important;}
	
	.navbar-bg li a {color: #fff !important;}
	
	.li-border{border-bottom:1px solid #fff;
          padding: 7px 0;
	      width: 90%;
	      margin: 0 auto;}

    .li-border1{border-bottom:none;
          padding: 7px 0;
	       width: 90%;
	      margin: 0 auto;}
	
	.navs-pad a {padding-right: 0 !important; 
	       padding-left: 0 !important;       
	       color:#34495e;}

.navs-pad1 a{padding-right: 0 !important;  
	        padding-left: 0 !important; }
	
}
</style>
 <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<header>

	<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-white nav-style">
			  <button class="navbar-toggler ml-3" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			  </button> 
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <a href="http://34.215.40.163"><img class="navbar-brand" src="img/logo.png"  style="float: left; height: 100px; width: 90px; margin-right:80px; "></a>

									  <div class="collapse navbar-collapse " id="navbarTogglerDemo03">
										<ul class="navbar-nav ml-auto mt-2 mt-lg-0 navbar-bg">
										  <li class="nav-item li-border navs-pad ">
											<a class="nav-link" href="http://34.215.40.163/WhyDiveThru.php"  onmouseover='this.style.color="#7dd3d5"' 
							onmouseout='this.style.color="#34495e"'>WHY DIVE THRU</a>
										  </li>

										  <li class="nav-item li-border navs-pad">
											<a class="nav-link" href="http://divethru.com/blog/" target="_blank" onmouseover='this.style.color="#7dd3d5"' 
							onmouseout='this.style.color="#34495e"'>BLOG</a>
										  </li>
										  <li class="nav-item li-border navs-pad">
											<a class="nav-link" href="http://34.215.40.163/about.php"  onmouseover='this.style.color="#7dd3d5"' 
							onmouseout='this.style.color="#34495e"'>ABOUT</a>
										  </li>
										  <li class="nav-item li-border navs-pad">
											<a class="nav-link" href="http://34.215.40.163/support.php"  onmouseover='this.style.color="#7dd3d5"' 
							onmouseout='this.style.color="#34495e"'>SUPPORT</a>
										  </li>
										  <li class="loginline mobile-hide" style="
							border: 0.5px solid lightgray;"></li>
										  <li class="nav-item li-border navs-pad log">
											<a class="nav-link" href="http://34.215.40.163/login.php"  onmouseover='this.style.color="#7dd3d5"' 
							onmouseout='this.style.color="#34495e"'>LOGIN</a>
										  </li>
										 <li class="nav-item mobile-show li-border1 navs-pad">
											<a class="nav-link" href="http://34.215.40.163/registration.php"  onmouseover='this.style.color="#7dd3d5"' 
							onmouseout='this.style.color="#34495e"'>JOIN FOR FREE</a>
										  </li>
										  <li class="nav-item mobile-hide navs-pad1">
											<a class="nav-link btn123 btn-default reg_button" href="http://34.215.40.163/registration.php">JOIN FOR FREE</a>
										  </li>
										</ul>
									 </div>
</nav>

</header>