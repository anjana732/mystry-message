import {z} from 'zod';

export const userValidation = z
    .string()
    .min(5, "Username should be 5 character long")
    .max(20, "Username should not exceed 20 character")
    .regex(/^[A-Za-z0-9]+$/ ,"Invalid username")

export const signUpSchema = z.object({
    username: userValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, "Password should be of atleast 8 character")
})