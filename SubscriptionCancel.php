<?php
require __DIR__ . '/payment.php';
//require 'vendor/autoload.php';

use PayPal\Rest\ApiContext;
use PayPal\Api\Agreement;
use PayPal\Api\AgreementStateDescriptor;

if(isset($_POST["id"]) && $_POST["id"] != ""){
$agreementId = isset($_POST["id"])?$_POST["id"]:"";

        $agreement = new Agreement();            

        $agreement->setId($agreementId);
        $agreementStateDescriptor = new AgreementStateDescriptor();
        $agreementStateDescriptor->setNote("Cancel the agreement");

        try {
            $agreement->cancel($agreementStateDescriptor, $apiContext);
            $cancelAgreementDetails = Agreement::get($agreement->getId(), $apiContext);  
        } catch (Exception $ex) {
    
                
        }
            echo "done";
}else{
       echo "fail"; 
}                  
        
	