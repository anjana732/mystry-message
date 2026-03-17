import connectDb from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import userModel from "@/models/User.model";
import { verificationEmail } from "@/helpers/verificationEmail";
import { success } from "zod";

export async function POST(request:Request) {
  try {

    const{email,username,password} = await request.json()
    const existingUserverifiedByUserName = await userModel.findOne({
        username,
        isVerified: true
    })
    if(existingUserverifiedByUserName){
        return Response.json({
            success: false,
            message: "username is already taken"
        },{status:400})
    }

    const existingUserByEmail = await userModel.findOne({email});
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    if(existingUserByEmail){

    }else{
        const hashedPasword = await bcrypt.hash(password,10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        const newUser = new userModel({
                username,
                email,
                password: hashedPasword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message:[]
        })

        await newUser.save();
    }

    //send verification email

    const emailResponse = await verificationEmail(email,username,verifyCode)

    if(!emailResponse.success){
          return Response.json({
            success: false,
            message: emailResponse.message
        },{status:500})
    }

      return Response.json({
            success: true,
            message: "User registered sucessfully. Please verify your code."
        },{status:500})

    } catch (error) {
        console.log(`Error registring user`,error);
        return Response.json({
            success:false,
            message: "Error registering email"
        })
    }  
}
