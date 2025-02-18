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

module.exports = { registerUser };
