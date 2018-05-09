<?php
require 'vendor/autoload.php';
use PayPal\Rest\ApiContext;
//use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payment;
use PayPal\Api\Payer;
use PayPal\Api\Details;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;

$apiContext = new \PayPal\Rest\ApiContext(
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
);

$moneda = "USD";
$total = "20.00";
$descripcion = "Dummy";

    // Create new payer and method
$payer = new Payer();
$payer->setPaymentMethod("paypal");

// Set redirect urls
$redirectUrls = new RedirectUrls();
$redirectUrls->setReturnUrl("http://localhost/DiveThru/index.php")
    ->setCancelUrl("http://localhost/DiveThru/subcription.php");

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
echo $payment->getId();
//header("Location: $approvalUrl");
