<?php
// Function to log the mails sent
function log_mail()
{
	$filename = dirname(__FILE__) . "logs/mail.json";

	//The $data can be anything, from simple text to a object
	$data['LogID'] = uniqid("log_");
	$data['Server'] = $_SERVER; $data['Time'] = date("Y-m-d H:i:s");
	$data['POST'] = $_POST; $data['GET'] = $_GET;

	$handle = @fopen($filename, 'r+');
	if ($handle === null || $handle === false){ $handle = fopen($filename, 'w+'); }
	if ($handle){
	    fseek($handle, 0, SEEK_END);

	    if (ftell($handle) > 0){
	        fseek($handle, -1, SEEK_END); fwrite($handle, ",\n", 1); fwrite($handle, json_encode($data) . ']');
	    }else{
	        fwrite($handle, json_encode(array($data)));
	    }

	    fclose($handle);
	}
}


// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
	
// Create the email and send the message
$to = 'contact@thblckjkr.tk';
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@thblckjkr.000webhostapp.com\n";
$headers .= "Reply-To: $email_address";	
log_mail();
mail($to,$email_subject,$email_body,$headers);
return true;			
?>
