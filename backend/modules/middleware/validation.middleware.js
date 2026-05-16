import {z} from 'zod'

export const validate =(schema)=>{
    return (req,res,next)=>{
        const result = schema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({
                message:"Validation failed",
                error: result.error.issues.map(issue=> ({
                    field: issue.path[0],
                    message: issues.message
                }))
            })
        }
        req.body = result.data
        next()
    }
}