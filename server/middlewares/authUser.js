import jwt from "jsonwebtoken";

// User Authentication Middleware

const authUser = async (req, res, next) => {
  try {
    // don't use camelcasing for {atoken} i.e. aToken etc.
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Login again!",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;