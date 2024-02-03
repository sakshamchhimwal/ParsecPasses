export const mailTemplate = (
	emailAddress,
	name,
	imageLink,
	renderImage,
	uuid
) => {
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
        <img src="https://res.cloudinary.com/dozbdw6sd/image/upload/v1706464405/BinaryBeats/jyzvj1n4ngzt9obfiyv5.png" />
        </center>
    </div>
    <p>Please keep this information safe and present your QR code when needed.</p>
    
    <div dir="ltr"><div class="gmail_default" style="font-family:comic sans ms,sans-serif"><div class="adM"><span style="font-family:Arial,Helvetica,sans-serif;color:rgb(102,102,102)"><span class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif"></span></span></div><span style="font-family:Arial,Helvetica,sans-serif">To check out the fantastic range of Parsec 4.0 merchandise, please refer to the</span><a href="https://drive.google.com/file/d/11bDZ2tmKSmUGAfKHQJJNTtWRmP7K44Gf/view?usp=sharing" style="font-family:Arial,Helvetica,sans-serif" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://drive.google.com/file/d/11bDZ2tmKSmUGAfKHQJJNTtWRmP7K44Gf/view?usp%3Dsharing&amp;source=gmail&amp;ust=1706649029923000&amp;usg=AOvVaw3O4BW5HpC-wgTNhQidIyrN">&nbsp;Catalogue PDF</a><span style="font-family:Arial,Helvetica,sans-serif">, where you'll find a variety of items ranging from stylish apparel to must-have accessories. The designs have been curated to reflect the dynamic and forward-thinking atmosphere of Parsec 4.0.</span><br></div><div><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><div class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif"><br style="font-family:Arial,Helvetica,sans-serif"><span style="font-family:Arial,Helvetica,sans-serif">Be sure to place your orders soon, as these limited-edition items are available on a first-come, first-served basis. Don't miss the chance to showcase your Parsec 4.0 pride with our exclusive merchandise!</span><br style="font-family:Arial,Helvetica,sans-serif"><br style="font-family:Arial,Helvetica,sans-serif"><span style="font-family:Arial,Helvetica,sans-serif">Important Details:</span><br style="font-family:Arial,Helvetica,sans-serif"><span style="font-family:Arial,Helvetica,sans-serif">-&nbsp;</span><a href="https://forms.gle/RADoaXWQGwiGwgot9" style="font-family:Arial,Helvetica,sans-serif" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://forms.gle/RADoaXWQGwiGwgot9&amp;source=gmail&amp;ust=1706649029924000&amp;usg=AOvVaw2oicqgaXjD_QY-xhgmOtXf">Merchandise Order Form</a><br style="font-family:Arial,Helvetica,sans-serif"><span style="font-family:Arial,Helvetica,sans-serif">- Deadline for Orders:&nbsp;</span><b style="font-family:Arial,Helvetica,sans-serif">2nd Feb, 11:59 PM.</b><br></div><div class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif"><b style="font-family:Arial,Helvetica,sans-serif"><br></b></div><div class="gmail_default" style="text-align:center;font-family:&quot;comic sans ms&quot;,sans-serif"><font size="4">For further communication, please join the Whatsapp group with this&nbsp;<a href="https://chat.whatsapp.com/Fkl6G66ruSP36P0lfBw1nw" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://chat.whatsapp.com/Fkl6G66ruSP36P0lfBw1nw&amp;source=gmail&amp;ust=1706649029924000&amp;usg=AOvVaw2U4g5KtnGVDALgF4o8-KKG">link</a>.</font><br></div><div class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif"><br></div><div class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif">Catalogue:<a href="https://drive.google.com/file/d/11bDZ2tmKSmUGAfKHQJJNTtWRmP7K44Gf/view?usp=sharing" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://drive.google.com/file/d/11bDZ2tmKSmUGAfKHQJJNTtWRmP7K44Gf/view?usp%3Dsharing&amp;source=gmail&amp;ust=1706649029924000&amp;usg=AOvVaw3cMH6-KDAp53Hh7SruGyCL">https://drive.<wbr>google.com/file/d/<wbr>11bDZ2tmKSmUGAfKHQJJNTtWRmP7K4<wbr>4Gf/view?usp=sharing</a></div><div class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif">Whatsapp:<a href="https://chat.whatsapp.com/Fkl6G66ruSP36P0lfBw1nw" style="font-family:Arial,Helvetica,sans-serif" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://chat.whatsapp.com/Fkl6G66ruSP36P0lfBw1nw&amp;source=gmail&amp;ust=1706649029924000&amp;usg=AOvVaw2U4g5KtnGVDALgF4o8-KKG">https://chat.<wbr>whatsapp.com/<wbr>Fkl6G66ruSP36P0lfBw1nw</a></div><div class="gmail_default" style="font-family:&quot;comic sans ms&quot;,sans-serif">Form Link:<a href="https://forms.gle/TGct6zToeAZb1Yur7" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://forms.gle/TGct6zToeAZb1Yur7&amp;source=gmail&amp;ust=1706649029924000&amp;usg=AOvVaw2ZOSTPichgNDxbM4GsAYux">https://forms.gle/<wbr>TGct6zToeAZb1Yur7</a></div></div></div></div></div>
    
    
    <p>Thank you!</p>
    <p>Sincerely,<br>Team PARSEC</p>
    </body>
    </html>
`;
};
