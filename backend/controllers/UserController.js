const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {
    static async register( req , res ) {
          
    const { name , email , phone , password, confirmpassword } = req.body; 

    // validations 
    if(!name){
       res.status(422).json({ message: "O nome é obrigatorio" });
       return 
    }
    if(!email){
        res.status(422).json({ message: "O Email é obrigatorio" });
        return 
    }
    if(!phone){
        res.status(422).json({ message: "O telefone é obrigatorio" });
         return 
    }
    if(!password){ 
       res.status(422).json({ message: "A senha é obrigatorio"});
    }
    if(!confirmpassword){
        res.status(422).json({ message: "A confirmaçao de senha é obrigatorio" });
         return 
     }

    // conferir se a senha esta correta 

    if(password !== confirmpassword){
      res.status(422).json({ message: "A senha e a confirmaçao de senha precisam ser iguais!" })
      return
    } 

    // // 2 email iguais

    //  const userExists = await User.find({email: email}) 

    // if (userExists) {
    //   res.status(422).json({ message: "Por favor, utilize outro E-mail"});
    //   return
    // }
    
    // create a password 
    const salt = await bcrypt.genSalt(12); 
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
 
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    }); 

    try {

    const newUser = await user.save();

    await createUserToken(newUser, req, res); 

      
    } catch (error) {
      res.status(500).json({ message: error.message});
    }

    }
}