const User = require('../../../models/Users');
const { validatePassword, generateUserTokens } = require('../../../auth');

// Login
const login = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        const user = await User.findOne({ emailAddress });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Could not find user.' });
        }

        const passwordValid = await validatePassword(password, user.password);

        if (!passwordValid) {
            return res.status(401).json({ success: false, message: 'Password was incorrect.' });
        }

        const userData = {
            date: Date(),
            userId: user.id,
            emailAddress: user.emailAddress
        };

        const { accessToken, refreshToken } = generateUserTokens(userData);

        // Store tokens in cookies
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.cookie('accessToken', accessToken); // Consider adding secure, same-site, and path options

        // Respond with success message and any additional data
        res.json({
            success: true,
            message: 'User logged in successfully.',
            userId: user.id
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = login;
