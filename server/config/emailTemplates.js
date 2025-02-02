export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }
        .otp_code {
            font-size: 24px;
            font-weight: bold;
            color: #000;
            background: #67e8f9; /* cyan-300 */
            display: inline-block;
            padding: 15px 30px;
            margin: 20px 0;
            border-radius: 8px;
            letter-spacing: 3px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your account:
        {{email}}. <br /> Use the OTP below to proceed:</p>
        <div class="otp_code">{{otp}}</div>
        <p class="footer">This OTP will expire in 10 minutes. If you didn't request a password reset, please ignore this email.</p>
    </div>
</body>
</html>
`