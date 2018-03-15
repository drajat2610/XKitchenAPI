const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routers
const userRouter = require('./api/routers/users');
const tableRouter = require('./api/routers/tables');
const categoryRouter = require('./api/routers/categories');
const productRouter = require('./api/routers/products');

//Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/XKitchen');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());


//access untuk beda port API
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//Router
app.use('/api/users', userRouter);
app.use('/api/tables', tableRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

app.use((req, res, next) => {
    console.log("Server is Running...");
    res.status(200).json({
        message: "Hi, I'm learning NodeJS"
    });
});


module.exports = app; // diexport ke server.js





// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// //Routers
// const userRouter = require('./api/routers/users');
// const tableRouter = require('./api/routers/tables');
// const categoryRouter = require('./api/routers/categories');
// const productRouter = require('./api/routers/products');

// //Connecting to MongoDB
// mongoose.connect('mongodb://localhost:27017/XKitchen');
// mongoose.Promise = global.Promise;

// app.use(bodyParser.urlencoded({extended: false }));
// app.use(bodyParser.json());

// app.use('/api/users', userRouter);
// app.use('/api/tables', tableRouter);
// app.use('/api/categories', categoryRouter);
// app.use('/api/products', productRouter);

// app.use((req, res, next) => {
//     console.log("Server is Running...");
//     res.status(200).json({
//         message: "Hi, I'm learning NodeJS"
//     });
// });


// module.exports = app; // diexport ke server.js