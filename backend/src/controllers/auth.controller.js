const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(req, res){
    const {username, password} = req.body;

    if(username != process.env.ADMIN_USERNAME){
        return res.status(401).json({message: "Invalid username!"});
    }

    const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if(!isValid){
        return res.status(401).json({message: "Invalid password!"});
    }

    const token = jwt.sign(
        {username},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    res.json({token});
}

module.exports = {login};