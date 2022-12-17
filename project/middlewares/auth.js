// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   // Bearer token

//   console.log(req.headers.authorization);

//   if (!token) {
//     res.status(403).json({
//       message: 'You are not authenticated.',
//       status: 'Error',
//     });
//     return;
//   }
//   // this is decoded
//   const decoded = jwt.verify(token, process.env.JWT_SEC, (error, data) => {
//     if (error) {
//       res.status(403).json({
//         message: 'You are not authenticated.',
//         status: 'Error',
//       });
//       return;
//     }

//     return data;
//   });

//   console.log(decoded);
//   req.user = decoded;
//   console.log(req.user.user);

//   next();
// };

// module.exports = {
//   protect,
// };
