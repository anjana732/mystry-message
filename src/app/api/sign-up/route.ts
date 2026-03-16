import connectDb from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import userModel from "@/models/User.model";
import { verificationEmail } from "@/helpers/verificationEmail";



export async function POST(request:Request) {
  try {

    const{email,username,password} = await request.json()
    
    } catch (error) {
        console.log(`Error registring user`,error);
        return Response.json({
            success:false,
            message: "Error registering email"
        })
    }  
}
