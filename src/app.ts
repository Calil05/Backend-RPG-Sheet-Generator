import { json, urlencoded } from 'body-parser';
import express from 'express';
import userRoutes from './routes/userRoutes'
import connection from './db/config';

const app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use("/api/", userRoutes);
app.use((
    err:Error,
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    res.status(500).json({ message:err.message });
});

connection.sync().then(() => {
    console.log("Database synced")
}).catch((err) => {
    console.log("Error:", err);
})

app.listen(3000);