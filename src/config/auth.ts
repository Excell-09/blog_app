import "dotenv";

interface AuthConfig {
  secretKey: string;
  expired_access_token: string;
  expired_refresh_token: string;
}

const AUTHCONFIG = {
  secretKey: process.env.SECRET_KEY,
  expired_access_token: process.env.EXPIRED_ACCESS_TOKEN,
  expired_refresh_token: process.env.EXPIRED_REFRESH_TOKEN,
} as AuthConfig;

export default AUTHCONFIG;
