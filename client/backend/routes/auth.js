const express = require('express');
const User = require('../models/User');//imported user to find the same user is present in database or not...
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const Count = require('../models/Counter');

const JWT_SECRET = "Harryisagoodb$oy";




router.get('/counts', async (req, res) => {
//here req and res is used for taking the parameters from the body and res is used to pass the parameters to the body
  
    // Check whether the user with this email exists already
    try {
        Count.count(async function (err, count) {
            if (!err && count === 0) {
               let counter = await Count.create({
                   count: 1
                });
            }
            else{
                console.log(err)
            }
        });
        try {
             const ans = await Count.updateOne({$inc:{"count":1}})
res.json({ans})
        } catch (error) {
            console.error(error.message);
            res.status(404).send("error")
        }
      
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
















// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
//here req and res is used for taking the parameters from the body and res is used to pass the parameters to the body
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false
            return res.status(400).json({success, error: "Sorry a user with this email already exists!" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);//hashing out original password with salt
        

        //mongodb call for creating in database...
        user = await User.create({
            name: req.body.name,
            password: secPass,//here we have stored hashed password..
            email: req.body.email,
        });


        //for creating authtoken using the id of the user hence we can verify user...
        //authtoken is mixture of jwt secret key and user id  of just created user not from fetchuser middleware
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        // res.json(user)
        success = true;
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //destructuring of body
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
//this bcrypt.compare function compare 
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                //this user is taken from finding user from database and in sign in user is taken from creating user...
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)//this auth token and auth token created during user creation is same
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        //to use id from fetchuser we have to use req.user.id
       const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;