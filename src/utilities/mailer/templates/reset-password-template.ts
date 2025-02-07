export const resetPasswordTemplate = (props: any) => `
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
</head>

<body style="margin: auto; font-family: sans-serif;">
    <div class="main"
        style="background-color: #f2f9fd; max-width: 650px; min-height: 614px; border-radius: 8px; padding-bottom: 15px; margin: auto;">

        <div style="background-color: #2876dd; height: 300px; padding-top: 35px; border-radius: 8px 8px 0 0;
                        background-image: url('https://www.lapa.ninja//assets/blog/the-best-free-svg-patterns.jpg');
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-attachment: fixed;
                        background-size: 100% 100%;">

            <div
                style="margin: auto;background-color: #ffffff;border-radius: 8px;  margin: auto; text-align: center; width: 90%;">
                <div class="header2"
                    style="max-width: 100%;padding: 25px 0;border-bottom: 1px solid rgb(192, 189, 195);">
                    <img src="https://res.cloudinary.com/dxclgkewn/image/upload/v1704426540/etq2ofsbayuccgilxco3.png"
                        alt="Brand-logo" style="width: 20%" ;>
                </div>
                <div style=" padding: 1px 30px; height: auto">
                    <p
                        style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 390;font-size: 16px;padding: 20px 0 14px;color: #474d66;;margin: auto;text-align: start;">
                        Hello there!
                    </p>
                    <p
                        style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 390;font-size: 16px;padding: 9px 0 13px;color: #474d66; margin: auto;text-align: start;">
                        We received a request to reset the password associated with your account. To proceed with
                        resetting your password, please click on the link below:

                        <a href="${props.resetLink}">[Reset Password Link]</a>
                    </p>
                    <p>
                        If you did not request this password reset, please ignore this email. Your account remains
                        secure, and no changes have been made.

                        For security reasons, this link will expire in 30 minutes from now, so please complete the reset
                        process as soon as possible.

                        Thank you.
                    </p>


                </div>

            </div>
        </div>
    </div>
</body>

</html>
`