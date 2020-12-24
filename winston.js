var appRoot = require('app-root-path');
var winston = require('winston');

//winston logger
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
 
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level}: ${message}`;
});


var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

 
const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ]
});

module.exports = logger;