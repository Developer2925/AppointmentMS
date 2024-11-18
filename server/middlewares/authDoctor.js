import jwt from "jsonwebtoken";

// Doctor Authentication Middleware

const authDoctor = async (req, res, next) => {
  try {
    // don't use camelcasing for {atoken} i.e. aToken etc.
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not authorized. Login again!",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;