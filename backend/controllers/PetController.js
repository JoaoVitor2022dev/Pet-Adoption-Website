const Pet = require('../models/Pet');

// helps 
const getToken = require('../helpers/get-toke');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    // create a pet 
    static async create(req ,res) {
       
        const { name, age , weight, color } = req.body

        const images = req.files

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
        if (images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatório!"}); 
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
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
              },
        })
 
        images.map((image) => {
           pet.images.push(image.filename)
        })

        try {

         const newpet = await pet.save();
            
         res.status(201).json({message: "Pet cadastrado com sucesso!", newpet,})
            
        } catch (err) {
            res.status(500).json({message: err})
        }
    }

    static async getAll(req, res){ 
       
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({ pets: pets});
    }

    // get all user pets
     static async getAllUserPets(req, res) {
       const token = getToken(req)
       const user = await getUserByToken(token)

       console.log(user);

       console.log(user._id);

       const pets = await Pet.find({ "user._id": user._id }).sort('-createdAt')

        res.status(200).json({ pets })
    }

    // pets para a adoçao
    static async getAllUserAdoptions(req , res){
        const token = getToken(req)
        const user = await getUserByToken(token)
 
        const pets = await Pet.find({ "adopter._id": user._id }).sort('-createdAt')
 
        res.status(200).json({ pets })
    }

    static async getPetById(req, res ) {
       
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID invalido!' }); 
        }

        // get pat by id 
        const pet = await Pet.findOne({ _id: id });

        if (!pet) {
            res.status(404).json({ message: 'Pet nao encontrado!' })
        }

        res.status(200).json({ pet: pet })
    }
}