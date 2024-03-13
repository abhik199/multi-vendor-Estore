import { sign } from "../services/jwt.service";

interface User {
    _id: number;
    email: string;
    roles: string;
}

const generateTokens = async (user: User): Promise<string> => {
    try {
        const accessToken: string = await sign({
            _id: user._id,
            email: user.email,
            roles: user.roles,
        });

        return accessToken;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default generateTokens;
