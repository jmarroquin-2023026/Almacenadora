import rateLimit from "express-rate-limit";

export const  limiter = rateLimit(
    {
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 150,
        message:{
            message: 'You are blocked for 15 minutes'
        } 
    }
)