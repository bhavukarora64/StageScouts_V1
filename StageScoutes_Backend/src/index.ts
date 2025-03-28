import express from 'express'
import cors from "cors";
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes"
import stadiumRoute from "./routes/StadiumRoutes"
import imageRoute from "./routes/imageRoutes"
import userAuth from "./middlewares/userAuth"
import dbMiddleware from "./middlewares/dbConnection"


const app = express();

app.use(cors());

app.options('*', cors());

app.use(dbMiddleware);
app.use(bodyParser.json());

app.use('/api/auth', authRoutes)
app.use('/api/stadium', stadiumRoute)
app.use('/api/image', imageRoute)
app.use('/me', userAuth, authRoutes);

app.listen(3001, function() {
    console.log("Server is live on localhost:3000");
});