<?php
if($_POST) {
  $toEmail = "delightme@lumitri.com"; //Recipient email, Replace with own email here

  //check if its an ajax request, exit if not
  if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    $output = json_encode(array( //create JSON data
      'type'=>'error', 
      'text' => 'Sorry Request must be Ajax POST'
    ));
    die($output); //exit script outputting json data
  } 
  
  //Sanitize input data using PHP filter_var().
  $userName    = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
  $userEmail   = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
  $phoneNumber = filter_var($_POST["phone"], FILTER_SANITIZE_NUMBER_INT);
  $message    = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
  $subject = "Message form ".$userName." via lumitri.com";
  
  //additional php validation
  $valid = true;
  $msg = '';
  if(strlen($userName)<3){ // If length is less than 3 it will output JSON error.
    $msg .= 'Wirklich? Das ist dein Name?<br>';
    $valid = false;
  }
  if(!filter_var($userEmail, FILTER_VALIDATE_EMAIL)){ //email validation
    $msg .= 'Bist Du sicher das dies deine E-Mail Adresse ist?<br>';
    $valid = false;
  }
  if(strlen($message)<3){ //check emtpy message
    $msg .= 'Mhh, \'nicht sicher ob ich deine Nachricht wirklich verstehe...';
    $valid = false;
  }
  if (!$valid) {
    $output = json_encode(array('type'=>'error', 'text' => $msg));
    die($output);
  }
  
  //email body
  $message_body = $message."\r\n\r\n-".$userName."\r\nEmail : ".$userEmail."\r\nPhone Number : ". $phoneNumber ;
  
  //proceed with PHP email.
  $headers = 'From: '.$userEmail.'' . "\r\n" .
  'Reply-To: '.$userEmail.'' . "\r\n" .
  'X-Mailer: PHP/' . phpversion();
  
  $send_mail = mail($toEmail, $subject, $message_body, $headers);
  
  if(!$send_mail) {
    //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
    $output .= json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
    die($output);
  } else {
    $output .= json_encode(array('type'=>'message', 'text' => 'Vielen Dank für deine Nachricht '.$userName .'!'));
    die($output);
  }
}
?>