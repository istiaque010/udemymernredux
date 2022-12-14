const express = require('express');
const connectDB = require('./config/db');



const app = express();

// Connect Database
connectDB();

//Init Middleware --previously it was in body parser
app.use(express.json({exteded: false}));


app.get('/',(req,res)=>res.send('API Running'));

const PORT = process.env.PORT || 5000;


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
