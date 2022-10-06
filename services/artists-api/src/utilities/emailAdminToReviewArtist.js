const emailClient = require('@artistdirectory/email-client');

const { DIRECTORY_API_URL, ADMIN_EMAIL } = process.env;

const emailAdminToReviewArtist = async (reviewToken) => {
  // TODO - edit the text to make it work with newly created and edited
  // send email to admin to initiate artist profile review
  await emailClient.enqueue({
    to: ADMIN_EMAIL,
    from: 'noreply@artistdirectory.com',
    subject: 'New artist profile ready for review',
    body: `
          <html>
            <body>
                <div style="text-align: center;">
                  <h1>Hello!</h1>
                  <p style="font-weight: 600">A new Artist has just created/edited their profile. Follow this link to review - <a href="${DIRECTORY_API_URL}/profile/${reviewToken}/review">ArtistDirectory</a>!</p>
                  <p style="font-weight: 700">Thank you!</p>
                </div>
            </body>
          </html>
          `
  });
};

module.exports = emailAdminToReviewArtist;
