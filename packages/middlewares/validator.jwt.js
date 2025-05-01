import jwt from 'jsonwebtoken'

export const valideteJwt = (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers
        if(!authorization)
            return res.status(401).send(
                {
                    message: 'Unauthorized'
                }
        )
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    }catch(e){
        console.error(e)
        return res.status(401).send(
            {
                message: 'Invalid credentials'
            }
        )

    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        const {Staff} = req
        if(!Staff || Staff.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You don't have access | username ${Staff.username}`
            }
        )
        next()
    }catch(e){
        console.error(e)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}
