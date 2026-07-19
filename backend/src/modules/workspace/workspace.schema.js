import {z} from 'zod'

export const createWorkspaceSchema = z.object({
    name: z.string().min(3,"Name must be atleast 3 characters long").max(50,"Name must not exceed 50 characters")
})

export const updateWorkspaceSchema = z.object({
   name: z.string().min(3,"Name must be atleast 3 characters long").max(50,"Name must not exceed 50 characters")
})