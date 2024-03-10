import "dotenv";

interface AuthConfig {
  secretKey: string;
  expired_access_token: string;
  googleClientId: string;
  googleClientSecret: string;
  fontendUrl: string;
  backendUrl: string;
  NodeEnv: string | undefined;
}

const AUTHCONFIG = {
  secretKey: process.env.SECRET_KEY,
  expired_access_token: process.env.EXPIRED_ACCESS_TOKEN,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  fontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  NodeEnv: process.env.NODE_ENV,
} as AuthConfig;

export default AUTHCONFIG;
