import jwt from "jsonwebtoken"

export function SignToken(email: string){
    return jwt.sign({email}, process.env.JWT_SECRET as string, {
        expiresIn: "24h"
    })
}