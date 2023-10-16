import {Request, Response} from "express";
import {BadRequestError, UnauthenticatedError,} from "../erors";
import {StatusCodes} from "http-status-codes";
import {AccessToken, sendMail} from "../utils";
import {User} from "../models/User";
import JWTService from "../utils/jwt/JWTSercive";

export const register = async (req: Request, res: Response) => {
    const { email } = req.body;

    // First created user is admin
    const role = await User.countDocuments({}) === 0 ? 'admin' : 'user';

    const isEmailAlreadyExists = await User.findOne({ email });
    if (isEmailAlreadyExists) {
        throw new BadRequestError(`User with email: ${email}, already exist`);
    }

    const activationCode = new AccessToken({ email });

    await User.create({ email, activationCode: activationCode.token, role });

    await sendMail(email, 'Account Verification: GIRL GPT Auth ✔', `
                <h2>Please click on below link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/activate-account/${activationCode.token}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `);
    res.status(StatusCodes.ACCEPTED).json({ msg: 'Success! Check your email to verify account' });
};
export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError(`User with email: ${email}, did not exist`);
    }
    if(!user.isActivated){
        throw new BadRequestError(`Please check your email to activate account`);

    }

    const loginCode = new AccessToken({ email: user.email});

    user.loginCode = loginCode.token;
    await user.save();

    await sendMail(email, 'Login in account: Product Discount', `
                <h2>Please click on below link to log in your account</h2>
                <p>${process.env.CLIENT_URL}/confirm-login/${loginCode.token}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `);
    res.status(StatusCodes.ACCEPTED).json({ msg: 'Success! Check your email to confirm log in' });
};
export const refreshToken = () => {

};
export const activateUser = async (req: Request, res: Response) => {
    const { token } = req.params;

    const jwtService = new JWTService();
    const { email } = jwtService.validateToken(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findOne({ email });

    if (!user || user.activationCode !== token) {
        throw new UnauthenticatedError('Bad token');
    }

    user.isActivated = true;
    user.activationCode = '';

    await user.save();
    res.json({ msg: 'Email verified' });
};

export const confirmLogin = async (req: Request, res: Response) => {
    const { token } = req.params;
    const userAgent = req.headers['user-agent'];

    if(!userAgent) return new UnauthenticatedError('User agent is missing');

    const jwtService = new JWTService();

    const { email } = jwtService.validateToken(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findOne({ email });

    if (!user || (user.loginCode !== token)) {
        throw new UnauthenticatedError('Bad token');
    }

    user.loginCode = '';
    await user.save();

    const { accessToken } = await jwtService.generateTokensAndSetRefreshCookie(res, { user: user._id, role: user.role }, userAgent);

    res.json({accessToken});
};