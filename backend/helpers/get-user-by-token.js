const jwt = require('jsonwebtoken'); 

const User = require('../models/User')

// get user by jwt token 

const getUserByToken = async ( token ) => {
    if (!token) return res.status(401).json({ error: "Acesso negado!" });

    // find user
    const decoded = jwt.verify(token, "nossosecret");

    console.log(decoded);
  
    const userId = decoded.id;

    console.log(userId);
  
    const user = await User.findOne({ _id: userId });
    
    console.log(user);

    return user;

}

module.exports = getUserByToken;
