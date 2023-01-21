const auth = require("../config/firebase-config");

// class Middleware {
//   async decodeToken(req, res, next) {
//     const header = req.headers?.authorization;
//     if (
//       header !== "Bearer null" &&
//       req.headers?.authorization?.startsWith("Bearer ")
//     ) {
//       const token = req.headers.authorization.split(" ")[1];
//       try {
//         const decodeValue = await auth.verifyIdToken(token);
//         console.log(decodeValue);
//         if (decodeValue) {
//           return next();
//         }
//       } catch (error) {
//         return res.json({ message: "Error" });
//       }
//     }
//     next();
//   }
// }

// module.exports = new Middleware();

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (
    header !== "Bearer null" &&
    req.headers?.authorization?.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    
    try {
      await auth.verifyIdToken(token).then((decodedToken) => {
        req["currentUser"] = decodedToken.uid;
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  next();
}

module.exports = decodeIDToken;