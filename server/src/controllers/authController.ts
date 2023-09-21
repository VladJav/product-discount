import {Request, Response} from "express";
import {BadRequestError, UnauthenticatedError} from "../erors";
import jwt, {JwtPayload} from 'jsonwebtoken';
import {StatusCodes} from "http-status-codes";
import {sendMail, validateAccessToken} from "../utils";
import {User} from "../models/User";

export const register = async (req: Request, res: Response) => {
    const { email } = req.body;

    // First created user is admin
    const role = await User.countDocuments({}) === 0 ? 'admin' : 'user';

    const isEmailAlreadyExists = await User.findOne({ email });
    if (isEmailAlreadyExists) {
        throw new BadRequestError(`User with email: ${email}, already exist`);
    }

    const activationCode = jwt.sign({ email }, process.env.JWT_SECRET || '');

    await User.create({ email, activationCode, role });

    await sendMail(email, 'Account Verification: GIRL GPT Auth ✔', `
                <h2>Please click on below link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/activate-account/${activationCode}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `);
    res.status(StatusCodes.ACCEPTED).json({ msg: 'Success! Check your email to verify account' });
};
export const login = () => {

};
export const refreshToken = () => {

};
export const activateUser = async (req: Request, res: Response) => {
    const { token } = req.params;

    const { email } = validateAccessToken(token);

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Bad token');
    }

    user.isActivated = true;
    user.activationCode = '';

    await user.save();
    res.json({ msg: 'Email verified' });
};
