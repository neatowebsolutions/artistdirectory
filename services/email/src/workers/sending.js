const emailClient = require('@artistdirectory/email-client');
const logger = require('@artistdirectory/logger');

const processRecord = async (record) => {
  // Parse the message.
  const { to, from, subject, body } = JSON.parse(record.body);

  try {
    await emailClient.send({ to, from, subject, body });
  } catch (error) {
    // **DO NOT** log an error here, or an infinite loop may ensue.
    // error log -> email -> error log -> email -> etc.
    await logger.warn(`Failed to send email to "${to}"`, error, {
      to,
      from,
      subject,
      body
    });
    throw error;
  }
};

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // Using Promise.all() instead of Promise.allSettled() because batchSize is set to 1.
  // batchSize is set to 1 as messages should never be processed successfully more than once.
  await Promise.all(event.Records.map(processRecord));
};

module.exports.handler = handler;
