import jwt from 'jsonwebtoken'
import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
dotenv.config();
// @ts-ignore
function userAuth(req, res, next){
    try{
        const {authorization} = req.headers;
        console.log("Checking User Auth...")

        if(!authorization){
            return res.status(401).json({
                "error": 'JWT Does not exists, Please Re-Login'
            })
        }
// @ts-ignore
        const response = jwt.verify(authorization, process.env.JWT_SECRET, (err, result) => {
            if(err){
                return res.status(401).json({
                    "error": 'JWT Expired or Does not exists, Please Re-Login'
                })
            }

            return result;
        });
        
        if(response){
            // @ts-ignore
            req.db.query('SELECT UserId from Users WHERE UserId = ?', [response.userId], (err, userRecord) => {
                if(err){
                    return res.status(500).json({
                                "error":  "Something Went Wrong, Please try again after refreshing the page!"
                            })
                }
// @ts-ignore
                if(!userRecord[0].UserId || !response.userId){
                    return res.status(500).json({
                        "error":  "Something Went Wrong, Please try again after refreshing the page!"
                    })
                }
// @ts-ignore
                if(userRecord[0].UserId == response.userId){
                    // @ts-ignore
                    req.body.UserId = response.userId;
                    next();
                }else{
                    return res.status(404).json({
                        "error": 'User Does not exist!'
                    })
                }
            })
        }else{
            return res.status(401).json({
                "error": 'JWT Expired or Does not exists, Please Re-Login'
            })
        }
    }catch(e){
       return res.status(500).json({
            "error":  "Something Went Wrong, Please try again after refreshing the page!"
        })
    }
    
}

export default userAuth        
