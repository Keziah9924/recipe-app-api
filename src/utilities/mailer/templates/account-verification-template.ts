export const verifyAccountTemplate = (props: any) => `
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
                                    Hello ${props.firstname}!
                                </p>
                                <p
                                    style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 390;font-size: 16px;padding: 9px 0 13px;color: #474d66; margin: auto;text-align: start;">
                                    We are pleased to confirm your attempt to signup to <strong>Beksfel</strong>.
                                </p>
                            
                                <p
                                    style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 390;font-size: 16px;padding: 3px 0 14px;color: #474d66; margin: auto;text-align: start;">
                                    Kindly use this One Time Password (OTP) code to confirm your registration process. Thank you.
                                </p>
                                <div style="display: flex; justify-content: center; align-items: center;">
                                    <strong style="font-size: 40px;">${props.otp}</strong>
                                    <img src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg" alt="otp-image" style="width: 50%; height: auto;">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </body>

        </html>
`