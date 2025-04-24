import jwt from 'jsonwebtoken';
import { v4 as uuid4 } from 'uuid';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

// @ts-ignore
async function userSignup(req, res) {
    try {
        const { name, email, password }: { name: string, email: string, password: string } = req.body;

        const userId = uuid4();

        if (!name || !email || !password) {
            return res.status(400).json({
                "error": "Missing mandatory values, Please enter all the mandatory values"
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS || '10'));

        const newUser = { userId: userId, name: name, email: email };

        // Adding User
        req.db.query('INSERT INTO Users SET ?', newUser, (err: any) => {
            if (err) {
                if(err.code === 'ER_DUP_ENTRY'){
                    return res.status(400).json({
                        'error': "User already exists with this email"
                    });
                }else{
                    return res.status(500).json({
                        'error': "Somthing Went wrong, Please try again after refreshing the page!"
                    });
                }
               
            }

            // Adding Credentials
            const newUserCredentials = { userId: userId, hashedPassword: hashedPassword };

            req.db.query('INSERT INTO UserCredentials SET ?', newUserCredentials, (err: any) => {
                if (err) {
                    return res.status(500).json({
                        'error': err
                    });
                }

                return res.status(201).json({
                    'message': "User registered successfully!"
                });
            });
        });
    } catch (e) {
        return res.status(500).json({
            'error': "Something Went Wrong, Please try again after refreshing the page!"
        });
    }
}

// @ts-ignore
function userLogin(req, res) {
    try {
        const { email, password }: { email: string, password: string } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                "error": "Mandatory values missing, Please recheck"
            });
        }

        req.db.query('SELECT userId, email FROM Users WHERE email = ?', [email], (err: any, userResults: any) => {
            if (err) {
                return res.status(500).json({
                    'error': "Something Went Wrong, Please try again after refreshing the page!"
                });
            }
            try {
                if (!userResults[0]?.userId) {
                    return res.status(403).json({
                        'error': "Unauthorized! Please register and then try to login!"
                    });
                }

                req.db.query('SELECT userId, hashedPassword FROM UserCredentials WHERE userId = ?', [userResults[0].userId], async (err: any, result: any) => {
                    if (err) {
                        return res.status(500).json({
                            'error': "Something Went Wrong, Please try again after refreshing the page!"
                        });
                    }
                    const isUserValid = await bcrypt.compare(password, result[0]?.hashedPassword);

                    if (isUserValid) {
                        if (!process.env.JWT_SECRET) {
                            throw new Error("JWT_SECRET is not defined in environment variables");
                        }
                        const jwtToken = jwt.sign({ userId: userResults[0].userId }, process.env.JWT_SECRET, {
                            expiresIn: 624000
                        });
                        if (jwtToken) {
                            return res.status(200).json({
                                'Authorization': jwtToken
                            });
                        }
                    } else {
                        return res.status(403).json({
                            'error': "Invalid credentials, please try again!"
                        });
                    }
                });
            } catch (e) {
                return res.status(500).json({
                    'error': "Something Went Wrong, Please check your credentials or try after some time!"
                });
            }
        });
    } catch (e: any) {
        return res.status(500).json({
            'error': e.message
        });
    }
}

// @ts-ignore
function userVerification(req, res) {
    try {
        const { userId }: { userId: string } = req;

        if (userId) {
            return res.status(200).json({
                'userId': userId,
                'error': null
            });
        } 
        else 
        {
            return res.status(404).json({
                'error': "User Not Found!"
            });
        }
    } catch (e: any) {
        return res.status(500).json({
            'error': e.message
        });
    }
}

export {
    userSignup,
    userLogin,
    userVerification
};