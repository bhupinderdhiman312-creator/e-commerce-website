const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  console.log("Cookies:", req.cookies);
console.log("Token:", req.cookies?.token);

  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.key);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

function checkAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next(); 
  } else{
    // console.log(err);
    res.status(403).json({ message: "Access denied. Admins only." });
  }
}

module.exports = { authMiddleware, checkAdmin };