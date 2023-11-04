// import * as jwt from 'jsonwebtoken';

// // Policy helper function
// const generatePolicy = (principalId, effect, resource) => {
//   const authResponse = {};
//   authResponse.principalId = principalId;
//   if (effect && resource) {
//     const policyDocument = {};
//     policyDocument.Version = '2012-10-17';
//     policyDocument.Statement = [];
//     const statementOne = {};
//     statementOne.Action = 'execute-api:Invoke';
//     statementOne.Effect = effect;
//     statementOne.Resource = resource;
//     policyDocument.Statement[0] = statementOne;
//     authResponse.policyDocument = policyDocument;
//   }
//   return authResponse;
// };

// export const auth = async (event, _context, callback) => {
//   const token = event.authorizationToken;
//   if (!token)
//     return callback(null, generatePolicy('user', 'Deny', event.methodArn));
//   // verifies secret and checks exp
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return callback(null, generatePolicy('user', 'Deny', event.methodArn));
//     }
//     return callback(
//       null,
//       generatePolicy(
//         decoded.id,
//         'Allow',
//         event.methodArn.split('/').slice(0, 2).join('/') + '/*'
//       )
//     );
//   });
// };
