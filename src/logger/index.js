import winston from 'winston';
import dotenv from 'dotenv';

// Load dotenv
dotenv.config();

const {
  createLogger, // Create a new Log instance
  format, // format to the messages
  transports, // Define the logger transport
} = winston;

// Format elements
const { combine, timestamp, printf } = format;

// Define our logger format
const customFormat = printf(({ level, message, timestamp: time }) => (
  `${time} - [${level.toUpperCase()}]: ${message}`));

// Define log level
const logLevel = process.env.LOG_LEVEL;

// Create the logger
const logger = createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    customFormat,
  ),
  transports: [
    new transports.Console(), // The transport will be the console
  ],
});

// Our log function is a wrapper to the logger.log function
const log = (message, level = logLevel) => logger.log({ level, message });

export default log;
