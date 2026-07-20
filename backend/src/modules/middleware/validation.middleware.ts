import type { Response,Request,NextFunction, RequestHandler } from 'express'
import  type { ZodType } from 'zod'
import type { ZodSchema } from 'zod/v3'

export const validate =<T>(schema:ZodType<T>,errorMessage:string = "Validation failed"):RequestHandler=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const result= schema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({
                message:errorMessage ,
                error: result.error.issues.map(issue=> ({
                    field: issue.path[0],
                    message: issue.message
                }))
            })
        }
        req.body = result.data
        next()
    }
}


