import {z} from 'zod'

export const verifySchema = z.object({
    code : z.string().length(6,"Verification code shold be minimum 6 character long")
})