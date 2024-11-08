<?php
header('Content-Type: application/json');
// Calling Connection File
include("../connection/conn.php");
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
// Send Email Function
function SEND_EMAIL($email,$fullName,$token)
{

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'affanacademy0@gmail.com';                     //SMTP username
    $mail->Password   = 'cvlw lwvt zmtu ghpb';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('affanacademy0@gmail.com', 'Learn2Loop');
    $mail->addAddress($email, $fullName);     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Email Verification From Learn2Loop';
    $mail->Body ='
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --Pcolor: #A41045;
            --Scolor: #18457C;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #1b1b2f; color: #ffffff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px;">

    <div style="max-width: 400px; background-color: #18457C; border-radius: 15px; text-align: center; padding: 40px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);">
        <div style="display: flex; justify-content: center; margin-bottom: 20px; color: #A41045; font-size: 50px;">
            <i class="fas fa-check-circle"></i>
        </div>

        <h2 style="color: #ffffff; margin-top: 0;">Hello, Dear '.$fullName.'!</h2>
        <p style="color: #dcdcdc; font-size: 16px;">Thank you for registering with LearnLoop. Please click the button below to confirm your email.</p>

        <a href="http://localhost/quiz_app/password.html?token='.$token.'" style="display: inline-block; padding: 12px 24px; margin-top: 20px; background-color: #ffff; color: #A41045; border-radius: 30px; text-decoration: none; font-weight: bold;">Confirm Now</a>

        <p style="color: #c0c0c0; font-size: 12px; margin-top: 20px;">Please ignore this email if you did not request it. By accepting, it means you have accepted the terms and conditions.</p>
    </div>

</body>
</html>

    ';
    

    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
   echo json_encode(['status'=>'success',
   'message'=>"<div style='height: 40vh !important;' class='shape merror'>
            <div style='width: 100%;  display: flex;
            justify-content: center;
            align-items: center; padding: 20px; ' class='icon  circle p-20  text-center'><h1 class='bg-white p-30 circle' style='width: 20px; height: 20px; padding: 20px; color: green; display: flex;
            justify-content: center;
            align-items: center; padding: 20px; ' ><i class='fas fa-check'></i></h1></div>
            <h4 class='title-sm text-center  w-title'>Hello, <span id='getName'>$fullName</span></h4>
            <p class='disc text'>Congratulations!, You have successfully 
                registered. We have sent you a confirmation 
                email, to this email (<strong id='email'>$email</strong>) please confirm the email.</p>
        </div>"]);
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
}


// Action Start Here
if(isset($_POST['action']))
{   extract($_POST);
    if(function_exists($action))
    {
        $action($conn);
    }
    else
    {
        echo json_encode(['status'=>'error','message'=>'Invalid Action']);
    }
}
else
{
    echo json_encode(['status'=>'error','message'=>'Action Is Required!']);
}
// Action End Her

// Registration Api
function Registration ($conn)
{
    if(isset($_POST['Registration']) && $_POST['Registration']=='RegPass3344')
    {
        extract($_POST);
        // Form Validation
        if(empty($fullName)||empty($email)||empty($level)||empty($eduType))
        {
            echo json_encode(['status'=>'error','message'=>'All Fields Are Required!']);
        }
        elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['status'=>'error',"type"=>"back_error",'message'=>'Please enter a valid email address!']);
        }
        else
        {
            $readOld= mysqli_query($conn , "SELECT * FROM users WHERE email = '$email'");
            if($readOld && mysqli_num_rows($readOld)>0)
            {
                echo json_encode(['status'=>'error',"type"=>"back_error",'message'=>"This-($email)-Is Already Taken"]);
            }
            else
            {
                $token = md5(rand(0,9999));
                $insert = mysqli_query($conn ,"INSERT INTO users ( `fullName`, `email`, `level`, `eduType`, `token`)VALUES('$fullName','$email','$level','$eduType','$token')");
                if($insert)
                {
                    SEND_EMAIL($email,$fullName,$token);
                }
            }
        }
    }
    else
    {
        echo json_encode(['status'=>'error','message'=>"Sorry You Don't Have Permission to Register To Get Permission Send The Register Password"]);
    }
}



// Cheack Token  And Create Password Api 
function checkToken($conn)
{
    if(isset($_POST['token']))
    {
        extract($_POST);
        // Cheack If Token Is Valid
        $readToken = mysqli_query($conn , "SELECT * FROM users WHERE token = '$token'");
        if($readToken && mysqli_num_rows($readToken)>0)
        {
            // Password Form Validation
            if(empty($password)||empty($cPassword))
            {
                echo json_encode(['status'=>'error','message'=>'All Fields Are Required']);
            }
            else if($cPassword == $password)
            {
                $updateToken = mysqli_query($conn,"UPDATE users SET token = 'Confirmed' ,user_password ='$password' WHERE token = '$token'");
                if($updateToken)
                {
                   
                        echo json_encode(['status'=>'success','message'=>'SuccessFully Created']);
                    
                }
            }
            else
            {
                echo json_encode(['status'=>'error','message'=>'Passwords Are Not Match']);
            }
        }
        else
        {
            // echo json_encode(['status' => 'error','tokenStatus'=>'noToken', 'message' => "The Email Confirmation Code is Expired or Invalid"]);
            echo json_encode(['status'=>'success','message'=>$token]);
        }
    }
    else
    {
        echo json_encode(['status'=>'error','tokenStatus'=>'noToken','message'=>"Token Is Required!"]);
    }
}

// Login Api
function login($conn)
{
    extract($_POST);
    if(empty($email)||empty($password))
    {
        echo json_encode(['status'=>'error','message'=>'All Fields Are Required!']);
    }
    else
    {
        $readEmail = mysqli_query($conn ,"SELECT * FROM users WHERE email ='$email'");
        if($readEmail && mysqli_num_rows($readEmail)>0)
        {
            $readEmailV=mysqli_query($conn , "SELECT * FROM users WHERE email ='$email' AND token='Confirmed'");
            if($readEmailV && mysqli_num_rows($readEmailV)>0)
            {
               $read= mysqli_query($conn , "SELECT * FROM users WHERE email = '$email' AND user_password ='$password'");
               if($read && mysqli_num_rows($read)>0)
               {
                $row = mysqli_fetch_assoc($read);
                $userEdu=$row['eduType'];
                echo json_encode(['status'=>'success','message'=>'SuccessFully LogedIn','eduType'=>"$userEdu"]);
               } 
               else
               {
                echo json_encode(['status'=>'error','message'=>'Password Is Incorrect!']);
               }
            }
            else
            {
                echo json_encode(['status'=>'error','message'=>'Please Confirm Your Email Address!']);
            }
        }
        else
        {
            echo json_encode(['status'=>'error','message'=>'Email Is Not Valid!']);
        }
    }
}

// Edu Type Api
function eduType()
{
    
}
?>