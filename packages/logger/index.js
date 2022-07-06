const AWS = require('aws-sdk');
const HttpClient = require('@artistdirectory/gateway-http-client').default;

// TODO: Use bunyan? Use winston?

const { LOG_QUEUE_URL, LOGS_API_URL, LOG_SOURCE } = process.env;

const httpClient = new HttpClient({
  baseUrl: LOGS_API_URL
});

const extractErrorData = (error) => {
  const data = {};

  // Include response error.
  if (error?.errors) {
    data.errors = error.errors;
  }

  // Include request error response body.
  if (error?.response?.body) {
    data.responseBody = error.response.body;
  }

  return data;
};

// Stringify and format each object data value.
const formatData = (data = {}) =>
  Object.keys(data).reduce(
    (map, key) => ({
      ...map,
      [key]:
        typeof data[key] === 'object'
          ? JSON.stringify(
              data[key].toObject ? data[key].toObject() : data[key],
              null,
              2
            )
          : data[key]
    }),
    {}
  );

const sendMessage = async (type, message, stackTrace, data) => {
  const source = LOG_SOURCE;

  try {
    const sqs = new AWS.SQS();
    const body = { source, type, message, stackTrace, data };

    if (LOG_QUEUE_URL) {
      await sqs
        .sendMessage({
          QueueUrl: LOG_QUEUE_URL,
          MessageBody: JSON.stringify(body)
        })
        .promise();
    } else {
      await httpClient.post('/logs', body);
    }
  } catch (error) {
    console.error(
      `Unable to log ${source} message "${message}": ${error.message}`
    );
  }
};

const logDebug = async (message) => {
  console.info(message);
};

const logInfo = async (message, data = {}) => {
  console.info(message);

  data = formatData(data);

  console.info(JSON.stringify(data, null, 2));

  await sendMessage('INFO', message, undefined, data);
};

const logWarning = async (message, error, data = {}) => {
  const stackTrace = error instanceof Error && error.stack;

  console.warn(message);

  if (error) {
    console.warn(error.stack);
  }
  if (error?.errors) {
    console.error(error.errors);
  }
  if (error?.response?.body) {
    console.error(error.response.body);
  }

  data = { ...data, ...extractErrorData(error) };
  data = formatData(data);

  console.warn(JSON.stringify(data, null, 2));

  await sendMessage('WARN', message, stackTrace, data);
};

const logError = async (message, error, data = {}) => {
  const stackTrace = error instanceof Error && error.stack;

  console.error(message);

  if (error) {
    console.error(error.stack);
  }
  if (error?.errors) {
    console.error(error.errors);
  }
  if (error?.response?.body) {
    console.error(error.response.body);
  }

  data = { ...data, ...extractErrorData(error) };
  data = formatData(data);

  console.error(JSON.stringify(data, null, 2));

  await sendMessage('ERROR', message, stackTrace, data);
};

module.exports = {
  debug: logDebug,
  info: logInfo,
  warn: logWarning,
  error: logError
};
