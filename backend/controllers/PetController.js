const Pet = require('../models/Pet');

// helps 
const getToken = require('../helpers/get-toke');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {
    // create a pet 
    static async create(req ,res) {
       
        const { name, age , weight, color } = req.body

        const available = true

        // imgens uploads 

        // validation 
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!"}); 
            return
        }
        if (!age) {
            res.status(422).json({ message: "O idade é obrigatório!"}); 
            return
        }
        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório!"}); 
            return
        }
        if (!color) {
            res.status(422).json({ message: "A cor é obrigatório!"}); 
            return
        }

        // get pet owner 
        const token = getToken(req)
        const user = await getUserByToken(token);

        // create a pet 

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
              _id: user.id,
              name: user.name,
              Image: user.image,
              phone: user.phone,
            },
        })

        try {

         const newpet = await pet.save();
            
         res.status(201).json({message: "Pet cadastrado com sucesso!", newpet,})
            
        } catch (err) {
            res.status(500).json({message: err})
        }
    }
}