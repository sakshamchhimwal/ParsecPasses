export const mailTemplate = (emailAddress, name, imageLink, renderImage, uuid) => {
    console.log({ emailAddress, name, imageLink, renderImage, uuid });
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Your Pass is Here!</title>
    <style>
    body {
        font-family: sans-serif;
    }
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    p {
        font-size: 16px;
        line-height: 1.5;
    }
    .pass-info {
        border: 1px solid #ccc;
        padding: 20px;
        margin-bottom: 20px;
    }
    img {
        width: 100vw;
        height: auto;
        object-fit: fill; /* Ensures QR code fits within image dimensions */
        max-width: 500px;
    }
    </style>
    </head>
    <body>
    <h1>Your Pass is Ready!</h1>
    <p>Hi ${name},</p>
    <p>Your pass is now available. Please access it using the following information:</p>
    <div class="pass-info">
        <h2>Pass ID:</h2>
        <p>${uuid}</p>
        <h2>QR Code:</h2>
        <p><a href="${imageLink}">View QR Code</a></p>
        <center>
        ${renderImage}
        <img src="https://res.cloudinary.com/dozbdw6sd/image/upload/v1704573082/cdf6me8ksozpxc8lwavr.png" />
        </center>
    </div>
    <p>Please keep this information safe and present your QR code when needed.</p>
    <p>Thank you!</p>
    <p>Sincerely,<br>Parsec</p>
    </body>
    </html>
`
}