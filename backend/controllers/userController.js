const zod = require('zod');
const {User, Account}  = require("../models/user");
const jwt = require('jsonwebtoken');

const signupBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

exports.signup = async (req,res) => {
    const { success, data } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
            errors: signupBody.errors
        });
    }

    const { email } = data;

    const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(401).json({ message: "This email is already taken"});
    }

    const userData = await User.create(data);
    const id = userData._id;

    const amount = Math.floor(Math.random() * (5000- 50000) + 50000);

    const acc = await Account.create({
        userId: id,
        balance: amount,
    });

    console.log(acc);

    const token = jwt.sign({id},process.env.JWT_SECRET);

    console.log(userData);
    res.status(200).json({message:"User created successfully", token:token});
}


const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

exports.signin = async (req, res) => {
    const {success, data} = signinBody.safeParse(req.body);

    if(!success) {
        res.status(401).json({message: "Input is incoorect"});
    }

    console.log(data);
    const user = await User.findOne({
        email: data.email,
        password: data.password
    });

    if(!user){
        res.status(401).json({message: "No user found Signup"});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)

    res.status(200).json({message: "User loggedin successfully", token: token});
}


const userUpdate = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

exports.userUpdate = async (req,res) => {
    const {success} = userUpdate.safeParse(req.body);

    if(!success) {
        res.status(401).json({message: 'Invalid'});
    }

    console.log("This is req.user in update: ", req.user);

    const user = await User.updateOne(req.body,{
        _id: req.user
    });

    res.status(200).json({message: 'user updates successfully', user: user});
}


exports.bulkUsers = async (req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
}
 