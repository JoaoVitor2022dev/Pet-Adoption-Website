const jwt = require('jsonwebtoken');

const createUserToken = async (user, req , res ) => {
    // create token 

    const toke = jwt.sign({
        name: user.name, 
        id: user._id
    }, "nossosecret"); 
 
    // return token 
    res.status(200).json({
        message: "Voce está authenticado",
        toke: toke, 
        userId: user._id
    }); 
}

module.exports = createUserToken