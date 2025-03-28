import jwt from 'jsonwebtoken'
import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
dotenv.config();
// @ts-ignore
async function userSignup(req, res){
    try
    {
        const {firstName, lastName, emailId, mobileNumber, password}: {firstName:string, lastName:string, emailId:string, mobileNumber:string, password:string} = req.body;

        const userId = uuid4();

        if(!firstName || !lastName || !emailId || !mobileNumber || !password || !userId){
            return res.status(400).json({
                "error": "Missing mandtory values, Please enter all the mandatory values"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);
    
        const newUser = {userId: userId, firstName : firstName, lastName: lastName, emailId:emailId, mobileNumber: mobileNumber };
        
        //Adding User
        req.db.query('INSERT INTO Users SET ?', newUser, (err:any) => {
            if(err){
                return res.status(500).json({
                    'error': "Something Went Wrong, Please try again after refreshing the page!"
                })
                
            }
    
            //Adding Credentials
            const newUserCredentails = {UserId: userId, HashedPassword: hashedPassword};
    
            req.db.query('INSERT INTO UserCredentials SET ?', newUserCredentails, (err:any) => {
                if(err){
                    return res.status(500).json({
                        'error': "Something Went Wrong, Please try again after refreshing the page!"
                    })
                }
                
            });        
        });
    }
    catch(e)
    {
        return res.status(500).json({
            'error': "Something Went Wrong, Please try again after refreshing the page!"
        })
    }

}
// @ts-ignore
function userLogin(req, res){
    try{
        const {username, password}: {username:string, password:string} = req.headers;

        if(!username || !password){
           return res.status(400).json({
                "error": "Manadatory Values Missing, Please recheck"
            })
        }
    
         req.db.query('SELECT userId, emailId FROM Users WHERE emailId = ?', [username], (err:any, userResults:any) => {
            if(err){
                return res.status(500).json({
                    'error': "Something Went Wrong, Please try again after refreshing the page!"
                })
            }
            try {

                if(!userResults[0].userId){
                    return res.status(403).json({
                        'error': "Unauthorized ! Please register and then try to login !"
                    })
                }

                req.db.query('SELECT UserId, hashedPassword from UserCredentials WHERE UserId = ?', [userResults[0].userId], async (err:any, result:any) => {
                    if(err){
                        return res.status(500).json({
                            'error': "Something Went Wrong, Please try again after refreshing the page!"
                        })
                    }
                    const isUserValid =  await bcrypt.compare(password, result[0].hashedPassword);
        
                    if(isUserValid){
                        if (!process.env.JWT_SECRET) {
                            throw new Error("JWT_SECRET is not defined in environment variables");
                        }
                        const jwtToken = jwt.sign({userId: userResults[0].userId}, process.env.JWT_SECRET, {
                            expiresIn: 624000
                        })
                        if(jwtToken) res.send({
                            'Authorization': jwtToken
                        })
                    }
        
                });
                
            } catch (e) {
                return res.status(500).json({
                    'error': "Something Went Wrong, Please check your credentails or try after some time !"
                })
            }
            
        });
    }
    catch(e:any){
        return res.status(500).json({
            'error': e.message
        })
        
    }

}
// @ts-ignore
function userVerification(req, res){
    try{
        const userId:string = req.body.UserId;

        if(userId){
            return res.status(200).json({
                'userId': userId,
                'error': null
            })
        }else{
            return res.status(404).json({
                'error': "User Not Found !"
            })
        }
    }catch(e:any){
       return  res.status(500).json({
            'error': e.message
        })
    }
}


export {
    userSignup,
    userLogin,
    userVerification
};