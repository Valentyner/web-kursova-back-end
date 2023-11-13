import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decod = jwt.verify(token, "secret");

            req.userId = decod._id;
            next();
        } catch(err) {
            return res.status(403).json({
                message: "Немає доступу",
            })
        }
        
    }else {
        return res.status(403).json({
            message: "Немає доступу"
        })
    }
    
}
