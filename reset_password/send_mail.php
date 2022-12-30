<?php

########### CONFIG ###############

# $recipient = 'b.trossmann@web.de';
# $redirect = 'success.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email'];
        $timestamp = $_POST['timestamp'];

        $message = "Hello,\n
        \nFollow this link to reset your JOIN password for your " . $email . "\n 
        \nhttps://gruppe-411.developerakademie.net/reset_password/reset_password.html?email=" . $email . "&timestamp=" . $_timestamp ."\n
        \nIf you didn't ask to reset your password, you can ignore this email. \n
        \nThanks,\n
        \nYour Join team\n";

        $recipient = $email;
        $subject = "Reset your password for JOIN App" . $_POST['name'];
        $headers = "From:  noreply@https://gruppe-411.developerakademie.net";

        $result = mail($recipient, $subject, $message, $headers);
        print($result);
        # header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
