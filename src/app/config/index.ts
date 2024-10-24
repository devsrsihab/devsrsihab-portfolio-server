import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the .env file in the project root
dotenv.config({ path: path.join(process.cwd(), '.env') }); // project-dir/.env

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  user_default_password: process.env.USER_DEFAULT_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

  admin_password: process.env.ADMIN_PASSWORD,
  admin_email: process.env.ADMIN_EMAIL,

  client_base_url: process.env.CLIENT_BASE_URL,
  server_base_url: process.env.SERVER_BASE_URL,

  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  payment_url: process.env.PAYMENT_URL,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,

  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,

  sendgrid_api_key: process.env.SENDGRID_API_KEY,
};
