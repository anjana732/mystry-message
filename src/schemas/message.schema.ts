import {z} from 'zod';

export const messageSchema = z.object({
    content: z.string()
    .min(10, "Message should contain atleast 10 character")
    .max(300, "Message should contain max 100 character")
})