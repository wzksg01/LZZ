import { LogLevel } from '../core/types';
import {
  LogRecord,
  LoggerOptions,
  LogFormatter,
  LogTransport,
  Logger,
  LOG_LEVEL_PRIORITY,
} from './types';

class PrettyFormatter implements LogFormatter {
  private readonly levelColors: Record<LogLevel, string> = {
    trace: '\x1b[90m',
    debug: '\x1b[36m',
    info: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m',
    fatal: '\x1b[41m\x1b[37m',
  };

  private readonly resetColor = '\x1b[0m';

  format(record: LogRecord): string {
    const timestamp = new Date(record.timestamp).toISOString();
    const color = this.levelColors[record.level];
    const level = record.level.toUpperCase().padEnd(5);

    let output = `${timestamp} ${color}${level}${this.resetColor}`;

    if (record.namespace) {
      output += ` [${record.namespace}]`;
    }

    output += ` ${record.message}`;

    if (record.context && Object.keys(record.context).length > 0) {
      try {
        output += ` ${JSON.stringify(record.context)}`;
      } catch {
        output += ` ${String(record.context)}`;
      }
    }

    if (record.error) {
      output += `\n${record.error.stack || record.error.message}`;
    }

    return output;
  }
}

class JsonFormatter implements LogFormatter {
  format(record: LogRecord): string {
    const payload: Record<string, unknown> = {
      timestamp: record.timestamp,
      level: record.level,
      message: record.message,
    };

    if (record.namespace) {
      payload.namespace = record.namespace;
    }

    if (record.context) {
      payload.context = record.context;
    }

    if (record.error) {
      payload.error = {
        message: record.error.message,
        stack: record.error.stack,
      };
    }

    return JSON.stringify(payload);
  }
}

class ConsoleTransport implements LogTransport {
  private formatter: LogFormatter;

  constructor(formatter: LogFormatter) {
    this.formatter = formatter;
  }

  log(record: LogRecord): void {
    const message = this.formatter.format(record);

    switch (record.level) {
      case 'trace':
      case 'debug':
        console.debug(message);
        break;
      case 'info':
        console.info(message);
        break;
      case 'warn':
        console.warn(message);
        break;
      case 'error':
      case 'fatal':
        console.error(message);
        break;
    }
  }
}

class LibrabotLogger implements Logger {
  private level: LogLevel;
  private namespace?: string;
  private transports: LogTransport[];

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.namespace = options.namespace;

    const formatter = options.format === 'json'
      ? new JsonFormatter()
      : new PrettyFormatter();

    this.transports = [new ConsoleTransport(formatter)];
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.level];
  }

  private log(level: LogLevel, message: string, error?: Error, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const record: LogRecord = {
      timestamp: Date.now(),
      level,
      message,
      context,
      error,
      namespace: this.namespace,
    };

    for (const transport of this.transports) {
      transport.log(record);
    }
  }

  trace(message: string, context?: Record<string, unknown>): void {
    this.log('trace', message, undefined, context);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, undefined, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, undefined, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, undefined, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log('error', message, error, context);
  }

  fatal(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log('fatal', message, error, context);
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  getLevel(): LogLevel {
    return this.level;
  }
}

let globalLogger: Logger | null = null;

export function createLogger(options?: LoggerOptions): Logger {
  return new LibrabotLogger(options);
}

export function getLogger(namespace?: string): Logger {
  if (!globalLogger) {
    globalLogger = new LibrabotLogger();
  }

  if (namespace) {
    return new LibrabotLogger({
      level: globalLogger.getLevel(),
      namespace,
    });
  }

  return globalLogger;
}

export function setGlobalLogLevel(level: LogLevel): void {
  if (!globalLogger) {
    globalLogger = new LibrabotLogger({ level });
  } else {
    globalLogger.setLevel(level);
  }
}

export { LogLevel };