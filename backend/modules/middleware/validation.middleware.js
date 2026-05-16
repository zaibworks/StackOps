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
export const naming = (schema)=>{
    return (req,res,next)=>{
        const result = schema.safeParse(req.body)

        if(!result.success){
            return res.status(400).json({
                message:"Workspace Creation failed",
                error: result.error.issues.map(issue=>({
                    field: issue.path[0],
                    message:issue.message
                }))
            })
        }
        req.body = result.data
        next()
    }
}

export const taskCheck = (schema)=>{
    return (req,res,next)=>{
    const result = schema.safeParse(req.body)

     if(!result.success){
            return res.status(400).json({
                message:"Task Creation Failed",
                error: result.error.issues.map(issue=>({
                    field: issue.path[0],
                    message:issue.message
                }))
            })
        }
        req.body = result.data
        next()
    }
}

