const emailClient = require('@artistdirectory/email-client');
const { DIRECTORY_API_URL, ADMIN_EMAIL } = process.env;

const approveProfile = async (artist) => {
  const { firstName, lastName, email } = artist;
  artist.editProfileToken = undefined;
  // send email to the artist about profile review decision
  await emailClient.enqueue({
    to: email,
    from: ADMIN_EMAIL,
    subject: 'Your artist profile has been reviewed',
    body: `
        <html>
          <body>
              <div style="text-align: center;">
                <h1>Hello!</h1>
                <p style="font-weight: 600">We have reviewed your profile.</p>
                <p> Congratulations! Your profile has been approved and is now live on our website.Follow this link to see your profile - <a href="${DIRECTORY_API_URL}/artists/${artist._id}">${firstName} ${lastName}'s artist profile</a>!</p> 
                <p>While you are at it, follow this link to create an account for easy managing your artist profile <a href="${DIRECTORY_API_URL}/create-account/">Create your account</a></p>
                <p style="font-weight: 700">Thank you!</p>
              </div>
          </body>
        </html>`
  });
  return artist;
};

module.exports = approveProfile;
