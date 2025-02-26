const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name, email } });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
};



const getUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
};

module.exports = { registerUser, getUsers, loginUser};
