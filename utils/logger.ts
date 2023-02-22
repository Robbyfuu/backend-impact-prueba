import { createLogger, format, transports,addColors } from "winston";

import fileDirName from "./file-dir-name.js";

const { __dirname } = fileDirName(import.meta);

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
addColors(colors);
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const transporter = [
  new transports.Console({
    level: "debug",
  }),
  new transports.File({
    filename: `${__dirname}/../logs/api-log.log`,
    maxFiles: 5,
    maxsize: 5242880,
  }),
];

const formatter = format.combine(
  format.timestamp({ format: "DD/MM/YYYY - HH:mm" }),
  format.prettyPrint(),
  format.simple(),
  format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);
export const logger = createLogger({
    levels,
  format: formatter,
  transports: transporter,
});
export const morganStream = {
  write: (text: string) => {
    logger.http(text);
  },
};
