<?php
header('Content-Type: application/json');

// Send Email Function
function SEND_EMAIL($email,$fullName,$token)
{
    
}

// Calling Connection File
include("../connection/conn.php");

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
            echo json_encode(['status'=>'error','message'=>'All Feilds Are Required!']);
        }
        else
        {
            $readOld= mysqli_query($conn , "SELECT * FROM users WHERE email = '$email'");
            if($readOld && mysqli_num_rows($readOld)>0)
            {
                echo json_encode(['status'=>'error','message'=>"This-($email)-Is Already Taken"]);
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
?>