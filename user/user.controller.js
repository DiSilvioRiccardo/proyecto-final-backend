import User from "./user.model";
const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign(
        { user_id: user._id, email: user.email },
        "quemasprofecomolevabacanoelcurso,vaparaelspeechdegrado",
        {
          expiresIn: "12h",
        }
      );
}

export async function createUser(req,res) {
    try{
        const { name, email, password, categories } = req.body;
        if (!(email && password && name && categories)) {
            return res.status(400).send("All input is required");
        }

        const user = User({
            name: name, 
            email: email,
            password: password,
            categories: categories
        });
    
        await user.save();
        user.token = createToken(user);
        await user.save();

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({"error": e.toString()})
    }
}

export async function loginUser(req,res) {
    const { email, password } = req.query;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });
    
    if (user && password === user.password){
        user.token = createToken(user);
        await user.save();
        res.status(200).json({"token": user.token});
    }else{
        res.status(404).json({"error": "user not found or wrong credentials"});
    }

}

export async function getUser(req, res){
    const user = await User.findById(req.query.id);
    if (user){
        res.status(200).json(user);
    }else{
        res.status(404).json({"error": "user not found"});
    }
}

export async function patchUser(req, res){
    try {
        let resultado = await User.updateOne({"_id": req.user._id}, req.body);
    } catch (e){
        return res.status(400).json({"error": e.toString()});
    }
    return res.status(200).json(await User.findById(req.user._id));
} 

export async function deleteUser(req, res){
    await User.deleteOne({"_id": req.user._id});
    return res.status(200).json({"result":"ok"});
}