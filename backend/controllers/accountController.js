const {User , Account} = require('../models/user');


// accountController.js
exports.balance = async (req, res) => {
    try {
        console.log("This is the controller of balance: ", req.user);

        const account = await Account.findOne({
            userId: req.user
        });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
