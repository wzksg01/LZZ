import { ErrorResponse } from './types';
import { getTimestamp } from './utils';

export class LibrabotError extends Error {
  code: string;
  details?: Record<string, unknown>;
  timestamp: number;

  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.timestamp = getTimestamp();
  }

  toResponse(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
    };
  }

  toJSON(): ErrorResponse {
    return this.toResponse();
  }
}

export class ValidationError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, details);
  }
}

export class ConfigError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('CONFIG_ERROR', message, details);
  }
}

export class AuthError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('AUTH_ERROR', message, details);
  }
}

export class RateLimitError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('RATE_LIMIT_ERROR', message, details);
  }
}

export class ProviderError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('PROVIDER_ERROR', message, details);
  }
}

export class ToolError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('TOOL_ERROR', message, details);
  }
}

export class MemoryError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('MEMORY_ERROR', message, details);
  }
}

export class ChannelError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('CHANNEL_ERROR', message, details);
  }
}

export class GatewayError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('GATEWAY_ERROR', message, details);
  }
}

export class AgentError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('AGENT_ERROR', message, details);
  }
}

export class NotFoundError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('NOT_FOUND_ERROR', message, details);
  }
}

export class ConflictError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('CONFLICT_ERROR', message, details);
  }
}

export class NotImplementedError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('NOT_IMPLEMENTED_ERROR', message, details);
  }
}

export class TimeoutError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('TIMEOUT_ERROR', message, details);
  }
}

export class NetworkError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('NETWORK_ERROR', message, details);
  }
}

export class ParseError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('PARSE_ERROR', message, details);
  }
}

export class PermissionError extends LibrabotError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('PERMISSION_ERROR', message, details);
  }
}

export function createErrorResponse(error: LibrabotError): ErrorResponse {
  return {
    code: error.code,
    message: error.message,
    details: error.details,
    timestamp: error.timestamp,
  };
}

export function isLibrabotError(error: unknown): error is LibrabotError {
  return error instanceof LibrabotError;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof LibrabotError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function getErrorCode(error: unknown): string {
  if (error instanceof LibrabotError) {
    return error.code;
  }
  return 'UNKNOWN_ERROR';
}