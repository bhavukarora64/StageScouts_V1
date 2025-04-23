import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

//@ts-ignore
function userAuth(req, res, next) {
    try {
        const { authorization } = req.headers;
        console.log("Checking User Auth...");

        if (!authorization) {
            return res.status(401).json({
                error: 'JWT does not exist, please re-login'
            });
        }

        //@ts-ignore
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId) {
            return res.status(401).json({
                error: 'Invalid JWT, please re-login'
            });
        }

        //@ts-ignore
        req.db.query('SELECT userId FROM Users WHERE userId = ?', [userId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Something went wrong, please try again later."
                });
            }

            if (!result || !result.length) {
                return res.status(404).json({
                    error: "User does not exist."
                });
            }

            req.userId = userId;
            next();
        });

    } catch (e) {
        return res.status(401).json({
            error: 'JWT expired or invalid, please re-login'
        });
    }
}

export default userAuth;
