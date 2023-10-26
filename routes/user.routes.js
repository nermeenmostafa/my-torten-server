const express = require("express");
const router = express.Router();
const User = require("../models/User.model");


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.post('/changeUserRole/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.isAdmin = true;
        await user.save();

        res.json({ message: 'User role changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error changing user role' });
    }
});



module.exports = router;