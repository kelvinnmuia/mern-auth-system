export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        .outer-container {
            font-family: Arial, sans-serif;
            background-color: #ecfeff; /* cyan-50 */
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
            font-weight: bold;
            margin-bottom: 16px;
        }
        p {
            font-size: 16px;
            color: #000000;
            line-height: 1.6;
            margin-bottom: 16px;
            text-align: left;
        }
        .otp-container {
            background: #ffffff;
            padding: 15px 20px;
            margin: 0;
            border-radius: 8px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
            display: inline-block;
        }
        .otp_code {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background: #0284c7; /* Cyan-600 */
            padding: 12px 230px;
            border-radius: 8px;
            letter-spacing: 3px;
            display: inline-block;
        }
    </style>
</head>
<body>
<div class="outer-container">
    <div class="container">
        <h2>Forgot your password?</h2>
        <p>We have received a request to reset the password for the account:</p>
        <p>{{email}}</p>
        <p><b>Use the OTP below to reset your password:</b></p>
        <div class="otp-container">
            <span class="otp_code">{{otp}}</span>
        </div>
        <p>The password reset OTP will expire in 10 minutes.</p>
    </div>
</div>
</body>
</html>
`
export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        .outer-container {
            font-family: Arial, sans-serif;
            background-color: #ecfeff; /* cyan-50 */
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
            font-weight: bold;
            margin-bottom: 16px;
        }
        p {
            font-size: 16px;
            color: #000000;
            line-height: 1.6;
            margin-bottom: 16px;
            text-align: left;
        }
        .otp-container {
            background: #ffffff;
            padding: 15px 20px;
            margin: 0;
            border-radius: 8px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
            display: inline-block;
        }
        .otp_code {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background: #0284c7; /* Cyan-600 */
            padding: 12px 230px;
            border-radius: 8px;
            letter-spacing: 3px;
            display: inline-block;
        }
    </style>
</head>
<body>
<div class="outer-container">
    <div class="container">
        <h2>Verify Your Email Address</h2>
        <p>Thank you for creating an account with us! To complete the registration process, please verify your email address:</p>
        <p>{{email}}</p>
        <p><b>Use the OTP below to verify your account:</b></p>
        <div class="otp-container">
            <span class="otp_code">{{otp}}</span>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
    </div>
</div>
</body>
</html>
`