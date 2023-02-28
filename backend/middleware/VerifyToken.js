function verifyToken(req, res, next) {
    // Get auth header value
    //console.log(req.headers["authorization"]);
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearerToken = bearerHeader.split(" ")[1];
      // Get token from array
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

export {verifyToken}