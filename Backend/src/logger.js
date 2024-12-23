import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize()
      ),
    transports: [
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

logger.add(
    new DailyRotateFile({
        filename: "logs/application-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        maxSize: "20m",
        maxFiles: "14d",
    })
)

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp()
            ),
        })
    );
}