import User from '../model/User.js';

export const register = async (req, res) => {
    try {
        const {
            name,
            title,
            designation,
            institution,
            billingAddress,
            email,
            foodPreference,
            paperId,
            registrationCategory,
            isetMembershipNumber,
            studentIdCopy,
            accompanyingPersonDetails,
            registrationFee
        } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Please provide name and email" });
        }

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        user = new User({
            name,
            title,
            designation,
            institution,
            billingAddress,
            email,
            foodPreference,
            paperId,
            registrationCategory,
            isetMembershipNumber,
            studentIdCopy,
            accompanyingPersonDetails,
            registrationFee
        });

        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};



export const findUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



export const getRegistrationFee = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            registrationFee: user.registrationFee
        });


    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

