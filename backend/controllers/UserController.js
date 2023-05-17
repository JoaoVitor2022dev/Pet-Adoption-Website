const User = require('../models/User');
const bcrypt = require('bcrypt');

// jwt 
const jwt = require('jsonwebtoken');
// helps
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

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

   // 2 email iguais

     const userExists = await User.findOne({email: email}) 

     if (userExists) {
       res.status(422).json({ message: "Por favor, utilize outro E-mail"});
       return
     }
    
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


static async login( req , res ){
     
  const { email, password } = req.body;

 //  verificaçao de preenchimentod e campo de input

  if(!email){
      res.status(422).json({ message: "O Email é obrigatorio" });
      return 
  }
 
  if(!password){ 
    res.status(422).json({ message: "A senha é obrigatorio"});
    }


  // verificaçao de email e senha existente   

  const user = await User.findOne({email: email}) 

  if (!user) {
      res.status(422).json({ message: "Nao há usuario cadastrado com esse E-mail"});
      return
  }

  // check password

  const checkPassword = await bcrypt.compare(password, user.password)

   if (!checkPassword) {
    res.status(422).json({ message: "Senha invalida"});
    return
   }

   await createUserToken(user, req, res); 
   
  }

static async checkUser( req , res ){
     
    let currentUser; 

    if(req.headers.authorization){  
 
      const token = getToken(req) 
      const decoded = jwt.verify(token, 'nossosecret');

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined

    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
   }

static async getUserById( req , res ) {
     
     const id = req.params.id; 

     const user = await User.findById(id).select("-password")

     if(!user){ 
      res.status(422).json({ message: "Usuário nao encontrado!"}); 
      return
     }
 
     res.status(200).json({ user });
      
   }

static async editUser( req , res ) {
 
  // check if user exists 
  const token = getToken(req);

  const user =  await getUserByToken(token)

  const { name , email , phone , password, confirmpassword } = req.body;

  if (req.file) {
    user.image = req.file.filename
  }

    // validations 
    if(!name){
      res.status(422).json({ message: "O nome é obrigatorio" });
      return 
   }

   user.name = name

   if(!email){
       res.status(422).json({ message: "O Email é obrigatorio" });
       return 
   }
    // check if email has already taken  

   const userExists = await User.findOne({ email: email}); 

   if (user.email !== email && userExists) {
    res.status(422).json({
      message: "Por favor, utilize outro e-mail!"
    })
    return
   } 

   user.email = email
   
   if(!phone){
       res.status(422).json({ message: "O telefone é obrigatorio" });
        return 
   }

   user.phone = phone

   if (password != confirmpassword) {
      res.status(422).json({ message: 'As senhas nao conferem !' }); 
      return
   } else if(password === confirmpassword && password != null ){ 
     
      // create a password 
      const salt = await bcrypt.genSalt(12); 
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash
   }

   try {
    
    // return user update 

     await User.findOneAndUpdate(
     {_id: user._id},
     {$set: user},
     { new: true},
    )

    res.status(200).json({
      message: 'Usuário atualizado com sucesso!',
    })

   } catch (err) {
     res.status(500).json({ message: err })
     return
   }

  }
} 