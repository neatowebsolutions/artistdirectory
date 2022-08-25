const emailClient = require('@artistdirectory/email-client');
const generateToken = require('../../utilities/generateToken');
const { DIRECTORY_API_URL, ADMIN_EMAIL } = process.env;

const rejectProfile = async (artist, rejectionReason) => {
  const { firstName, lastName, email } = artist;

  const editProfileToken = await generateToken();
  artist.editProfileToken = editProfileToken;
  artist.rejectionReasons.push(rejectionReason);
  await artist.markModified('rejectionReasons');
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
                  <p>Unfortunately your artist profile does not comply with our policies.
                  We had to reject your profile creating request for the following reasons:
                  ${rejectionReason}.
                  Follow this link to edit your profile - <a href="${DIRECTORY_API_URL}/reviews/${editProfileToken}/edit">${firstName} ${lastName}'s artist profile</a>!</p>
                  <p style="font-weight: 700">Thank you!</p>
                </div>
            </body>
          </html>
    `
  });
  await artist.save();
  return artist;
};

module.exports = rejectProfile;
