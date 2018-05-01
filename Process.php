<?php
session_start();
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
//require 'vendor/autoload.php';
require 'payment.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

//echo $id;
//die;
$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);
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
if(isset($_GET["auth"])){
if($_SESSION["field"]){
?>
<script>
window.localStorage.setItem("payment","done");
window.localStorage.setItem("field",'<?php echo $_SESSION["field"];?>');</script>
<style>
	.center{position: absolute;
    top: 50%;
    left: 50%; 
	text-align:center;
    transform: translateX(-50%) translateY(-50%);}
</style>
<?php
	

	//header("Location: http://34.215.40.163/subscription.php");
	}
}

if (isset($_POST['select_plan'])) {
	echo '<div style="text-align:center;"><img src="img/yoga-gif.gif" class="center"/></div>';
$total_cycle = $_POST['select_cycles'];
$product_name = $_POST['product_name'];
$product_currency = 'USD';
$cycle_amount = $_POST['price'];
$cycle = $_POST['select_plan'];
$_SESSION["userid"] = $_POST["userid"];
$token = $_POST["token"];
/*
if ($_POST['select_plan'] == 'Daily') {
$cycle_amount = 5;
$cycle = 'D';
} else if ($_POST['select_plan'] == 'Weekly') {
$cycle_amount = 30;
$cycle = 'W';
} else if ($_POST['select_plan'] == 'Monthly') {
$cycle_amount = 12.99;
$cycle = 'M';
} else if ($_POST['select_plan'] == 'Yearly') {
$cycle_amount = 95.88;
$cycle = 'Y';
}*/
if($_POST['select_plan'] != "L"){

//Here we can use PayPal URL or sandbox URL.
$paypal_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
//Here we can used seller email id.
$merchant_email = 'hello-facilitator@divethru.com';
//here we can put cancel URL when payment is not completed.
$cancel_return = "http://34.215.40.163/subscription.php";
//here we can put cancel URL when payment is Successful.
$success_return = "http://34.215.40.163/dashboard.php";
$notifyURL     = 'http://34.215.40.163/ipn';
?>

<form name = "myform" action = "<?php echo $paypal_url; ?>" method = "post" target = "_top">
<input type="hidden" name="cmd" value="_xclick-subscriptions">
<!---<input type="hidden" name="token" value="<?php// echo $token;?>">---->
<input type = "hidden" name = "business" value = "<?php echo $merchant_email; ?>">
<input type="hidden" name="lc" value="IN">
<input type = "hidden" name = "item_name" value = "<?php echo $product_name; ?>">
<input type="hidden" name="no_note" value="1">
<input type="hidden" name="src" value="1">
<?php if (!empty($total_cycle)) { ?>
<!--<input type="hidden" name="srt" value="<?php //echo $total_cycle; ?>">---->
<?php } ?>
<input type="hidden" name="a3" value="<?php echo $cycle_amount; ?>">
<input type="hidden" name="p3" value="1">
<input type="hidden" name="t3" value="<?php echo $cycle; ?>">
<input type="hidden" name="currency_code" value="<?php echo $product_currency; ?>">
<input type="hidden" name="custom" value="<?php echo $_POST['select_plan']; ?>">
<input type = "hidden" name = "cancel_return" value = "<?php echo $cancel_return ?>">
<input type = "hidden" name = "return" value = "<?php echo $success_return; ?>">
<input type="hidden" name="notify_url" value="<?php echo $notifyURL; ?>">
<input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHostedGuest">
</form>
<script type="text/javascript">
document.myform.submit();
</script>
<?php
	}else if($cycle == "L" && $total_cycle == 0){
	
	/*	$apiContext = new \PayPal\Rest\ApiContext(
				new \PayPal\Auth\OAuthTokenCredential(
				'Afzt_C5Z1lw3GffdtPEoALetXDGoJup9oOYl-_2bVNbuk5Ier-YgsEqcfpvwup6jsObQe42UKzGXuErO', // ClientID
				'EIwUIVCIXSbq4zj1qvFa5BoE8Ky678tk6BeWoZMByBJbWIv_geouUVjkifIyctMK0JCi4nBt0smTlCJj'      // ClientSecret
				)
		);

		$apiContext->setConfig(
				array(
					'mode' => 'sandbox',
					'http.ConnectionTimeOut' => 30,
					'log.LogEnabled' => false,
					'log.FileName' => '',
					'log.LogLevel' => 'FINE',
					'validation.level' => 'log'
				)
		);*/

		$moneda = "USD";
		$total = $_POST['price'];
		$descripcion = $_POST['product_name'];


			// Create new payer and method
		$payer = new Payer();
		$payer->setPaymentMethod("paypal");

		// Set redirect urls
		$redirectUrls = new RedirectUrls();
		$redirectUrls->setReturnUrl("http://34.215.40.163/dashboard.php")
			->setCancelUrl("http://34.215.40.163/subscription.php");
			

		// Set payment amount
		$amount = new Amount();
		$amount->setCurrency($moneda)
			->setTotal($total);

		// Set transaction object
		$transaction = new Transaction();
		$transaction->setAmount($amount)
			->setDescription($descripcion);

		// If I comment this line it runs ok.
		//$transaction->setReferenceId($referenceId);

		// Create the full payment object
		$payment = new Payment();
		$payment->setIntent('sale')
			->setPayer($payer)
			->setRedirectUrls($redirectUrls)
			->setTransactions(array($transaction));

		//echo $payment->toJSON();

		// Create payment with valid API context
		try {

			$payment->create($apiContext);

			// Get PayPal redirect URL and redirect user
			$approvalUrl = $payment->getApprovalLink();

			// Finalmente le redirigimos a PayPal para que apruebe el pago
			//redirige($approvalUrl, 'Intentando redirigir a PayPal.');

		} catch (PayPal\Exception\PayPalConnectionException $ex) {
			echo $ex->getCode();
			echo $ex->getData();
			die($ex);
		} catch (Exception $ex) {
			die($ex);
		}
$info = $payment->getTransactions();
//	print_r($info);
//	die;
		header("Location: $approvalUrl");


		}
}
