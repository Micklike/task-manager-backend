import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Authentication middleware
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: no token provided" });
    }

  

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    req.user = user;


    next(); 
  } catch (err) {
    console.error("Auth error:", err); 
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" }); 
  }
};


export const authorizee = (req, res, next) => { console.log("Checking admin access..."); console.log(req.user); 
   if (!req.user || req.user.role !== "admin")
     { return res.status(403).json({ message: "Forbidden: Admins only" }); }
    next(); // user is admin, allow access
     };