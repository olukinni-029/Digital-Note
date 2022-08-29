require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db.config');

const userRoutes =require  ('./src/routes/user.route');
const noteRoutes = require('./src/routes/note.route');

const app = express();

app.use(express.json());

connectDB();
const port = process.env.PORT || 4500;

app.get('/', (req, res) =>{
    res.send('welcome to Vestica APP')
});

app.use('/api/user',userRoutes);
app.use('/api/note',noteRoutes);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})