const buildResponse = async (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
};

export const success = async (body) => {
  return buildResponse(200, body);
};

export const failure = async (body) => {
  const statusCode = body.error.statusCode;
  const result = { status: body.status, message: body.error.message };
  return buildResponse(statusCode, result);
};
