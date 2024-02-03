export const mailTemplate = (
	emailAddress,
	name,
	imageLink,
	uuid
) => {
	console.log({ emailAddress, name, imageLink, uuid });
	return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your FREE Comedy Show Pass!</title>
      <style>
        body {
          font-family: sans-serif;
          text-align: center;
        }
    
        h1 {
          font-size: 2em;
          margin-bottom: 20px;
        }
    
        img {
          width: 200px;
          height: 200px;
          border: 1px solid #ccc;
          padding: 5px;
        }
    
        p {
          line-height: 1.5;
          margin-bottom: 20px;
        }
    
        .details {
          font-style: italic;
          margin: 10px 0;
        }
    
        a {
          text-decoration: none;
          color: #007bff;
        }
      </style>
    </head>
    <body>
      <h1>Your FREE Comedy Show Pass is here!</h1>
      <p>Hey ${name},</p>
      <p>Get ready to laugh out loud because your FREE pass to the Comedy Show is here!</p>
      <p>Just scan the QR code below to access your pass:</p>
      <img src="${imageLink}" alt="QR Code">
      <p>Code ${uuid},</p>
      <p>**Can't wait to see you there!**</p>
      <p>See you there!</p>
      <p>Team PARSEC</p>
      <p>P.P.S. Having trouble scanning the QR code? No worries! You can also access your pass directly by clicking on this link: <a href="${imageLink}">Click here</a></p>
    </body>
    </html>
    `;
};
