<?php
session_start();
//session_destroy();
require 'payment.php';
//require 'vendor/autoload.php';

use PayPal\Rest\ApiContext;
//use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payment;
use PayPal\Api\Payer;
use PayPal\Api\Details;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\CreditCard;
use PayPal\Api\FundingInstrument;
use PayPal\Api\Address;
use PayPal\Api\BillingInfo;
use PayPal\Api\Cost;
use PayPal\Api\Currency;
use PayPal\Api\Invoice;
use PayPal\Api\InvoiceAddress;
use PayPal\Api\InvoiceItem;
use PayPal\Api\MerchantInfo;
use PayPal\Api\PaymentTerm;
use PayPal\Api\Phone;
use PayPal\Api\ShippingInfo;

	if(isset($_GET)){
	
			$paymentid = $_GET["paymentId"];
			try{
				$paydetail = Payment::get($paymentid,$apiContext);
				$obj = json_decode($paydetail);
				
				 //print_r($obj);
				// die;
			}catch(Exception $ex){
//				print_r($ex);
				echo "Exception";
			}
		} 
	?>

<html>
<head>
</head>
<body>
	<?php if ($paymentid) {
		echo $_SESSION["userid"];
?>
<table id="results" class="messages">
<thead>
<tr class="head">
<th colspan="2">Payer Detail</th>
<input type="hideen" class="tr_id" value="<?php echo $obj->id; ?>">
<input type="hideen" class="payment_type" value="<?php echo $obj->payer->payment_method; ?>">
<input type="hideen" class="payment_status" value="<?php echo $obj->payer->status; ?>">
<input type="hideen" class="payment_time" value="<?php echo $obj->create_time; ?>">
<input type="hideen" class="state" value="<?php echo $obj->state; ?>">
<input type="hideen" class="payer_id" value="<?php $obj->payer->payer_info->payer_id; ?>">
<input type="hideen" class="email" value="<?php echo $obj->payer->payer_info->email; ?>">
<input type="hideen" class="total" value="<?php echo $obj->transactions[0]->amount->total; ?>">
<input type="hideen" class="currency" value="<?php echo $obj->transactions[0]->amount->currency; ?>">
<input type="hideen" class="full_name" value="<?php echo $obj->payer->payer_info->first_name. ' '. $obj->payer->payer_info->last_name; ?>">
<input type="hideen" class="city" value="<?php echo $obj->payer->payer_info->shipping_address->city; ?>">
</tr>
</thead>
<tbody id="left90">
<tr>
<td>TransactionID</td>
<td><?php echo $obj->id; ?></td>
</tr>
<tr>
<td>Payment Method</td>
<td><?php echo $obj->payer->payment_method; ?></td>

</tr>
<tr>
<td>Full Name</td>
<td><?php
echo $obj->payer->payer_info->first_name;
echo ' ';
echo $obj->payer->payer_info->last_name;
?></td>
</tr>
<tr>
<td>Email</td>
<td><?php echo $obj->payer->payer_info->email; ?></td>
</tr>
<tr>
<td>Payer ID</td>
<td><?php echo $obj->payer->payer_info->payer_id; ?></td>
</tr>
<tr>
<td>Address</td>
<td><ul style="text-align: left;">
<li><?php echo "Line1 --> " . $obj->payer->payer_info->shipping_address->line1 ?></li>
<li><?php echo "City --> " . $obj->payer->payer_info->shipping_address->city ?></li>
<li><?php echo "State --> " . $obj->payer->payer_info->shipping_address->state ?></li>
<li><?php echo "Postal Code --> " . $obj->payer->payer_info->shipping_address->postal_code ?></li>
<li><?php echo "Country Code --> " . $obj->payer->payer_info->shipping_address->country_code ?></li>
<li><?php echo "Recipient Name --> " . $obj->payer->payer_info->shipping_address->recipient_name ?></li>
</ul></td>
</tr>
<tr>
<td>Status</td>
<td><?php echo $obj->payer->status; ?>
</td>
</tr>
</tbody>
<thead>
<tr class = "head">
<th colspan = "2">Transactions Detail</th>
</tr>
</thead>
<tbody id="left90">
<tr><td>Invoice_Number</td>
<td><?php //echo $obj->transactions[0]->invoice_number; ?></td>
</tr>
</tbody>
<tbody id="left90">
<tr><td>Total Amount</td>
<td>
<ul style="text-align: left;">
<li><?php echo "Total Amount --> " . $obj->transactions[0]->amount->total ?></li>
<li><?php echo "Currency --> " . $obj->transactions[0]->amount->currency ?></li>
</ul>
</td>
</tr>
</tbody>
<tbody id="left90">
<tr><td>Description</td>
<td><?php echo $obj->transactions[0]->description; ?></td>
</tr>
</tbody>
<tbody id="left90">
<tr><td>State</td>
<td><?php echo $obj->state; ?></td>
</tr>
<tbody id="left90">
<tr><td>Create Time</td>
<td><?php echo $obj->create_time; ?></td>
</tr>
</tbody>
<tbody id="left90">
<tr><td>Update Time</td>
<td><?php echo $obj->update_time; ?></td>
</tr>
</tbody>
</table>

<?php }else if(isset($_GET["auth"])){
print_r($_SESSION);
}?>

<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
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
  // var config = {
  //   apiKey: "AIzaSyBwDEs5JfwQNSRKCDMHE9TrVlWArbYG9NU",
  //   authDomain: "divethrutest.firebaseapp.com",
  //   databaseURL: "https://divethrutest.firebaseio.com",
  //   projectId: "divethrutest",
  //   storageBucket: "divethrutest.appspot.com",
  //   messagingSenderId: "19401978174"
  // };
  firebase.initializeApp(config);
        </script>
<script type="text/javascript">
		$(document).ready(function(){
			var eml = $(".email").val();
			var txid = $(".tr_id").val();
			var pyid = $(".payer_id").val();
			var type = $(".payment_type").val();
			var status = $(".payment_status").val();
			var time = $(".payment_time").val();
			var state = $(".state").val();
			var total = $(".total").val();
			var currency = $(".currency").val();
			var full_name = $(".full_name").val();
			var address = $(".address").val();
			var city = $(".city").val();
			var data = {transection_id:txid,payer_id:pyid,name:full_name,email:eml,payment_type:type,payment_status:status,payment_time:time,state:state,city:city};
			console.log(data);
			var user = JSON.parse(window.localStorage.getItem('user'));
			console.log(txid);
						var db = firebase.database();
			db.ref("Users/"+user.user_id+"/payment").child(txid).set(data); // Update lalted time on pause
			/* window.setTimeout(function() {
                                  window.location.href = "subscription.php";
                                }, 1000);*/
		});
</script>

</body>
</html>