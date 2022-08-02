const AWS = require('aws-sdk');

const { EMAIL_QUEUE_URL } = process.env;

const enqueue = async ({ to, from, subject, body }) => {
  if (!EMAIL_QUEUE_URL) {
    return;
  }

  const sqs = new AWS.SQS();

  await sqs
    .sendMessage({
      QueueUrl: EMAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        to,
        from,
        subject,
        body
      })
    })
    .promise();
};

const send = async ({ from, to, subject = '', body = '' }) => {
  if (!from) {
    throw new Error('"from" required when sending email');
  }

  if (!to) {
    throw new Error('"to" required when sending email');
  }

  // Only us-east-1 is verified for sending emails.
  const ses = new AWS.SES({ region: 'us-east-1' });

  const params = {
    Source: from,
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to]
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    }
  };

  await ses.sendEmail(params).promise();
};

module.exports = {
  enqueue,
  send
};
