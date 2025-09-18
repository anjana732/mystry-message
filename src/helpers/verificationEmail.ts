import {resend} from '@/lib/resend'
import { ApiResponse } from '@/types/ApiResponse'
import VerificationEmail from '../../Email/verificationEmail'

export async function verificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try{
        await resend.send({
            from: '',
            to: '',
            subject: ' ',
            react: VerificationEmail({})
        })
        return {success: true, message: 'Verification sent successfully'}
    }catch(error){

    }
}