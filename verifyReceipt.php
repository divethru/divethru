<?php
	function getReceiptData($receipt,$tid)
	{
		$endpoint = 'https://sandbox.itunes.apple.com/verifyReceipt';
		
		$ch = curl_init($endpoint);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $receipt);
		$response = curl_exec($ch);
		$errno = curl_errno($ch);
		$errmsg = curl_error($ch);
		curl_close($ch);
		$msg = $response.' - '.$errno.' - '.$errmsg;
		$data=json_decode($response);
		// print_r($data);die;
		if($data->status == '21002') {
			$res['status'] = 0;
		} else {
			$renewal= $data->pending_renewal_info[0];
			$status= $renewal->auto_renew_status;
			$trnasctionid= $renewal->original_transaction_id;
			if($status == 0) {
				$res['status'] = $status;
			} else {
				$res['status'] = $status;

			}
		}
		echo json_encode($res);
	}
$receipt_data = json_decode(file_get_contents('php://input'), true);
$newcontent = $receipt_data['receipt'];
$orignaltransctionid = $receipt_data['original_transaction_id'];
if(!empty($newcontent) && !empty($receipt_data)) {
	$new = trim($newcontent);
	$new = trim($newcontent);
	$new = str_replace('_','+',$new);
	$new = str_replace(' =','==',$new);
	if (substr_count($new,'=') == 0){
		if (strpos('=',$new) === false){
			$new .= '=';
		}
	}
	$new = '{"receipt-data":"'.$new.'","password":"b538470866cd4bea961e96f8a160e045"}';
	$info = getReceiptData($new,$orignaltransctionid);
} else {
	$res['status'] = 'false';
	echo json_encode($res);
}
?>