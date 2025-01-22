const jwt = require('jsonwebtoken');
const extractToken = (req) =>{
    const token = req.headers.authorization?.split(' ')[1]
    return token
}

const checkToken = (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' })
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.body.authorId = decoded.id;
        next();
    }catch(err){
        return res.status(500).json({ error: 'Failed to authenticate token' })
    }
    
}

module.exports = checkToken

