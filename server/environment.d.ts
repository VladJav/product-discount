declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            PORT?: number;
            MONGO_URI: string;
            NODEMAILER_SENDER_EMAIL: string;
            SENDGRID_API_KEY: string;
        }
    }
}

export {};