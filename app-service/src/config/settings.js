import dotenv from "dotenv"
dotenv.config()

export const SETTINGS = {
  MONGODB_CONNECTION_URI: `mongodb://mongodb/${process.env.DB_NAME}`,
  PORT: 3001,
  LOG_LEVEL: "info",
}
