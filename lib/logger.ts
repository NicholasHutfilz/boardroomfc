// Server-side logging utility with different log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private level: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.level = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO
  }

  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : ''
    return `[${level}] ${timestamp} - ${message}${contextStr}`
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level
  }

  debug(message: string, context?: LogContext) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage('DEBUG', message, context))
    }
  }

  info(message: string, context?: LogContext) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage('INFO', message, context))
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, context))
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    if (this.shouldLog(LogLevel.ERROR)) {
      const errorInfo = error instanceof Error 
        ? { message: error.message, stack: error.stack }
        : error
      
      const fullContext = { ...context, error: errorInfo }
      console.error(this.formatMessage('ERROR', message, fullContext))
    }
  }

  // Specialized logging for database operations
  db = {
    query: (operation: string, table: string, context?: LogContext) => {
      this.debug(`DB Query: ${operation}`, { table, ...context })
    },
    
    success: (operation: string, table: string, context?: LogContext) => {
      this.info(`DB Success: ${operation}`, { table, ...context })
    },
    
    error: (operation: string, table: string, error: unknown, context?: LogContext) => {
      this.error(`DB Error: ${operation}`, error, { table, ...context })
    }
  }

  // Specialized logging for authentication
  auth = {
    attempt: (operation: string, context?: LogContext) => {
      this.info(`Auth Attempt: ${operation}`, context)
    },
    
    success: (operation: string, context?: LogContext) => {
      this.info(`Auth Success: ${operation}`, context)
    },
    
    failure: (operation: string, error: unknown, context?: LogContext) => {
      this.error(`Auth Failure: ${operation}`, error, context)
    }
  }

  // Specialized logging for API requests
  api = {
    request: (method: string, path: string, context?: LogContext) => {
      this.debug(`API Request: ${method} ${path}`, context)
    },
    
    response: (method: string, path: string, status: number, context?: LogContext) => {
      this.info(`API Response: ${method} ${path} -> ${status}`, context)
    },
    
    error: (method: string, path: string, error: unknown, context?: LogContext) => {
      this.error(`API Error: ${method} ${path}`, error, context)
    }
  }
}

// Export a singleton instance
export const logger = new Logger()

// Export default logger functions for convenience
export const { debug, info, warn, error } = logger
export const { db, auth, api } = logger 