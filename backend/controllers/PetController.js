const Pet = require('../models/Pet');

// helps 
const getToken = require('../helpers/get-token');
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
        if (!codeuni) {
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
            console.log(images.length);
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

          // check if id is valid
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

    static async removePetById(req, res) {    
        const id = req.params.id; 

        // check if id is valid
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!' })
            return
        }
        // check exist a pet 
        const pet = await Pet.findOne({ _id: id }); 

        if (!pet) {
            res.status(404).json({ message: 'Pet nao encontrado' })
            return
        }
        // check if logged in user registered the pet 
        const token = getToken(req); 
        const user = await getUserByToken(token)
 
        if(pet.user._id.toString() !== user._id.toString()){ 
          res.status(422).json({ message: 'Houve um problema em processar a sua solicitaçao, tente mais tarde !'});
          return
        }
        await Pet.findByIdAndRemove(id);

        res.status(200).json({ message: "Pet temovido com sucesso!" })

    }

    static async updatePet( req, res) {
       const id = req.params.id; 

       const { name, age, weight, color} = req.body

       const images = req.files

       const updatedData = {}; 

       // check if pet exists
       const pet = await Pet.findOne({_id: id}); 

       if (!pet) {
         res.status(404).json({ message: "Pet nao encontrado!"})
         return 
       }

        // check if logged in user registered the pet 
       const token = getToken(req); 
       const user = await getUserByToken(token)
 
      if(pet.user._id.toString() !== user._id.toString()){ 
          res.status(422).json({ message: 'Houve um problema em processar a sua solicitaçao, tente mais tarde !'});
          return
        }

        // validation 
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!"}); 
            return
        } else {
            updatedData.name = name
        }

        if (!age) {
            res.status(422).json({ message: "O idade é obrigatório!"}); 
            return
        }else {
            updatedData.age = age
        }

        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório!"}); 
            return
        } else {
            updatedData.weight = weight
        }

        if (!color) {
            res.status(422).json({ message: "A cor é obrigatório!"}); 
            return
        } else {
            updatedData.color = color
        }
        if (images.length === 0) {
            res.status(422).json({ message: "A imagem é obrigatório!"}); 
            console.log(images.length);
            return
        } else {
            updatedData.images = []; 
            images.map((image) => {
               updatedData.images.push(image.filename)
                })
        }
        // update in database
        await Pet.findByIdAndUpdate(id, updatedData); 

        res.status(200).json({ message: 'Pet atualizado com sucesso!'});
    }

    static async schedule( req, res) {
        const id = req.params.id; 

        // check if exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({ message: 'Pet não encontrado!' })
            return
        }

       // check if logged in user registered the pet 
       const token = getToken(req); 
       const user = await getUserByToken(token)
 
      if(pet.user._id.equals(user._id)){ 
          res.status(422).json({ message: 'Voce nao pode agendar uma visita com seu proprio pet!',});
          return
        }

        // check if user has already scheduled a visit
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({ message: 'Voce ja agendou uma visita para este pet!',});
                return
            }
        }

    //  add user to pet 

       pet.adopter = { 
           _id: user._id,
           name: user.name, 
           image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({ message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`})
   }

static async concludeAdoption( req, res) {
       const id = req.params.id; 

       // check if exists
       const pet = await Pet.findOne({ _id: id })

        if (!pet) {
           res.status(404).json({ message: 'Pet não encontrado!' })
           return
        }
 
        // check if user has already scheduled a visit

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.adopter) {
           if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({ message: 'Voce ja agendou uma visita para este pet!',});
                return
            }

            pet.available = false; 

            await Pet.findByIdAndUpdate(id, pet); 

            res.status(200).json({ message: "Parabéns! O ciclo de adoçao foi finalizado com sucesso!"});
        }
    }
}