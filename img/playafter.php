<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<title>DiveThru</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
  <link href="css/" rel="stylesheet" type="text/css">
  <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <link href="css/share-style.css" rel="stylesheet" type="text/css">
  <style>
.hidden{
	display: none;
}
/* Modal css */
.col-c{
	    width: 648px;
    min-width: 648px;
    margin-right: 24px;
    flex: 0 1 0%;
}
.col-c2{
	 width: 456px;
    min-width: 456px;
    margin-right: 0px;
    flex: 0 1 0%;
}
.col-c3{
	 padding-left: 40px;
	 flex-basis: 100%;
    flex: 0 1 0%;
}
.share{
	
      font-size: 24px;
    line-height: 32px;
    margin: 0px 0px 40px;
    text-align: center;
    font-family: Apercu, sans-serif;
    font-style: normal;
    letter-spacing: 2.5px;
    /* font-size: 16px; */
    font-weight: 600;
    text-transform: uppercase;
    color: rgb(90, 97, 117);
}
.css-wlgw4p{
	    -webkit-box-align: center;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    font-weight: 400;
    align-items: center;
    margin-bottom: 24px;
    font-family: Apercu, sans-serif;
    font-style: normal;
    color: rgb(90, 97, 117) !important;
	margin-left: 12%;
}
.close2{
	    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 3%;
    /*padding: 32px;*/
	font-size: 55px;
	color: rgb(90, 97, 117);;
}
.modal-share{
	max-width: 60% !important;
}
.share2{
		display: none;
	}
.share{
		display: block;
	}	
	
@media (max-width: 425px){
	.modal-share-content{
		width: 100%;
		height: 100%;
	}
	.share2{
		display: unset;
		width: 100%;
		color: rgb(90, 97, 117) !important;
	}
	.col-c3{
	 padding-left: 0;
	 flex-basis: 100%;
    flex: 0 1 0%;
	padding-top: 20%;
}
	.share{
		display: none;

	}
	
	.modal-share{
		max-width: 100% !important;
	}
	i.fa.fa-facebook,i.fa.fa-twitter,i.fa.fa-link{
		margin-right: 15px;
	}
}
</style>
</head>
<body>

<div class="container-fluid px-0">
    <div class="row mx-0" style="color: rgb(90, 97, 117);">
	    <div class="col-lg-6 part1 text-center">
		    <div class="row part11 py-4">
			    <div class="col-12">
				    <p>WELL DONE</p>
				</div>
			</div>
			
			<div class="row">
			    <div class="col-6 col-lg-12 part22">
				    <h3>385</h3>
					<p>MINUTES MEDITATED</p>
				</div>
			    <div class="col-6 col-lg-12 part33">
				    <h3>1</h3>
					<p>DAY IN A ROW</p>
				</div>
			</div>
		</div>
		
		<div class="col-lg-6 part2 text-center">
			<i class="fa fa-quote-left" aria-hidden="true"></i>
            <p>Throughout the day, try to catch the mind when it wanders off and notice if it's thinking or feeling.</p>
			<i class="fa fa-quote-right" aria-hidden="true"></i><br>
			<a href="#" id="SModal" class=" btn1 btn-primary1 px-4 py-2 mx-2"><i class="fa fa-paper-plane mr-2" aria-hidden="true"></i>SHARE</a>
			<a href="#" class="btn1 btn-primary2 px-4 py-2 mx-2">COMPLETE</a>
		</div>
	</div>
</div>
<!--Modal start -->
<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-share" role="document" >
    <div class="modal-content modal-share-content" >
      <div class="modal-header text-center">
	  				<h2 class="share2 modal-title">SHARE</h2>
       <div  class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </div>
      </div>
      <div class="modal-body">
	  <div class="row">
		<div class="col-md-6">
			<img src="http://localhost/DiveThru/10_day_program/qoute/quote%201.png" style="width:100%;"/>
		</div>
		<div class="col-md-6" style="margin:auto;">
			<div class="col-c3">
				<p class="share">SHARE</p>
				<div style="display:block;">
					<a class="css-wlgw4p"><i class="fa fa-facebook fa-lg white-text mr-md-3"> </i> Facebook</a>
				</div>
				<div style="display:block;">
					<a class="css-wlgw4p"><i class="fa fa-twitter fa-lg white-text mr-md-3"> </i> Twitter</a>
				</div>
				<div style="display:block;">
					<a class="css-wlgw4p"><span><i class="fa fa-link fa-lg white-text mr-md-3"></i></span> Copy Link</a>
				</div>
			</div>
		</div>
		</div>
      </div>
      
  </div>
</div>
</div>
 <!-- modal end -->

</body>
	
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">
		$(document).ready(function(){
			
			$("#SModal").click(function(){

				$("#memberModal").modal("show");
			});
		});
</script>
</html>