import User from '../Models/user';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
export const signup = async (req:any,res:any)=>{
    try{
        const userDetails = req.body;
        // console.log(userDetails);
        const userFound = await User.findOne({email:userDetails.email});
        const saltRounds=10;
        if(userFound){
            res.status(409).json({"message":"Email already exist!!!"});
        }
        else{
            bcrypt.hash(userDetails.password,saltRounds,async (err,hash)=>{
                if(err){
                    res.status(404).json({"message":"Something went wrong!"});
                }
                else{
                    const user = new User({...userDetails,password:hash});
                    await user.save();
                    res.status(200).json(user);
                }
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json({"message":"Something went wrong!"});
    }

}
function generateToken(id:ObjectId){
    return jwt.sign({userID: id},process.env.SECRET_KEY);
}
export const login = async (req:any,res:any) =>{
    const userDetails:{email:string,password:string} = ({...req.body});
    try{
        const user =await User.findOne({email:userDetails.email});
        if(user){
            bcrypt.compare(userDetails.password , user.password, (err,result)=>{
                if(err) res.status(500).json({message:"Something went wrong"});
                else if(result===true){
                    res.status(200).json({message:'Login Successful',username:user.name,token:generateToken(user._id)});
                }
                else{
                    res.status(401).json({message:"Password is incorrect"});
                }
            })
        }
        else{
            res.status(404).json({message:"User not found :("});
        }
        
    }
    catch(err){
        res.status(404).json({message:"Something went wrong:("});
    }
}