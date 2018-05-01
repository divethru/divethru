<?php
$p = isset($_POST["price"])?$_POST["price"]:"00.00";
require 'vendor/autoload.php';
$trans="";
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;

define("AUTHORIZENET_LOG_FILE", "phplog");

function payPalAuthorizeOnly($amount)
{
    /* Create a merchantAuthenticationType object with authentication details
       retrieved from the constants file */
    $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
  $merchantAuthentication->setName("97AhBt9k");
    $merchantAuthentication->setTransactionKey("96769TCaAcEB87eR");
    
    // Set the transaction's refId
    $refId = 'ref' . time();

    // Create the payment data for a paypal account
    $payPalType = new AnetAPI\PayPalType();
    $payPalType->setCancelUrl("http://34.215.40.163/subcription.php");
    $payPalType->setSuccessUrl("http://34.215.40.163/dashboard.php");
    $paymentOne = new AnetAPI\PaymentType();
    $paymentOne->setPayPal($payPalType);

    //create a auth-only transaction
    $transactionRequestType = new AnetAPI\TransactionRequestType();
    $transactionRequestType->setTransactionType( "authOnlyTransaction");
    $transactionRequestType->setAmount($amount);
    $transactionRequestType->setPayment($paymentOne);

    $request = new AnetAPI\CreateTransactionRequest();
    $request->setMerchantAuthentication($merchantAuthentication);
    $request->setRefId( $refId);
    $request->setTransactionRequest( $transactionRequestType);

    $controller = new AnetController\CreateTransactionController($request);
    $response = $controller->executeWithApiResponse( \net\authorize\api\constants\ANetEnvironment::SANDBOX);

    if ($response != null)
    {
      if($response->getMessages()->getResultCode() == 'Ok' || $response->getMessages()->getResultCode() == 'Error')
      {
        $tresponse = $response->getTransactionResponse();
        
	      if ($tresponse != null && $tresponse->getMessages() != null)   
        {
            /*echo " Transaction Response code : " . $tresponse->getResponseCode() . "\n";
            echo "Received response code: ".$tresponse->getResponseCode()."\n";*/
            //return $tresponse->getTransId()."\n";
			//payPalGetDetails($tresponse->getTransId());
      //      echo "Transection Hash: ".$tresponse->getTransHash()."\n";
            //Valid response codes: 1=Approved, 2=Declined, 3=Error, 5=Need Payer Consent\n";
            return $tresponse->getSecureAcceptance()->getSecureAcceptanceUrl();
          /*  echo " Code : " . $tresponse->getMessages()[0]->getCode() . "\n"; 
	          echo " Description : " . $tresponse->getMessages()[0]->getDescription() . "\n";*/
        }
        else
        {
          echo "Transaction Failed \n";
          if($tresponse->getErrors() != null)
          {
            echo " Error code  : " . $tresponse->getErrors()[0]->getErrorCode() . "\n";
            echo " Error message : " . $tresponse->getErrors()[0]->getErrorText() . "\n";            
          }
        }
      }
      else
      {
        echo "Transaction Failed \n";
        $tresponse = $response->getTransactionResponse();
        if($tresponse != null && $tresponse->getErrors() != null)
        {
          echo " Error code  : " . $tresponse->getErrors()[0]->getErrorCode() . "\n";
          echo " Error message : " . $tresponse->getErrors()[0]->getErrorText() . "\n";                      
        }
        else
        {
          echo " Error code  : " . $response->getMessages()->getMessage()[0]->getCode() . "\n";
          echo " Error message : " . $response->getMessages()->getMessage()[0]->getText() . "\n";
        }
      }      
    }
    else
    {
      echo  "No response returned \n";
    }

   // return $response;
}

if(!defined('DONT_RUN_SAMPLES'))
$t =  payPalAuthorizeOnly($p);
$token =  substr($t, strpos($t, "&") + 1);
echo substr($token, strpos($token, "=") + 1);
?>