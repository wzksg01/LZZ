export type UUID = string;

export type Timestamp = number;

export type ChannelType =
  | 'telegram'
  | 'discord'
  | 'feishu'
  | 'slack'
  | 'wechat'
  | 'whatsapp'
  | 'signal'
  | 'line'
  | 'matrix'
  | 'teams'
  | 'web';

export type MessageType = 'text' | 'image' | 'audio' | 'video' | 'file' | 'system';

export type AgentStatus = 'idle' | 'thinking' | 'planning' | 'acting' | 'observing' | 'reflecting' | 'error';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface User {
  id: UUID;
  name: string;
  email?: string;
  avatar?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Channel {
  id: UUID;
  type: ChannelType;
  name: string;
  config: Record<string, unknown>;
  enabled: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Message {
  id: UUID;
  channelId: UUID;
  channelType: ChannelType;
  userId: UUID;
  user: User;
  content: string;
  type: MessageType;
  metadata: Record<string, unknown>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Session {
  id: UUID;
  channelId: UUID;
  userId: UUID;
  messages: Message[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt?: Timestamp;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  parameters: ToolParameter[];
  returnType: string;
}

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  default?: unknown;
}

export interface ToolCall {
  id: UUID;
  toolId: string;
  toolName: string;
  parameters: Record<string, unknown>;
  sessionId: UUID;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  tools: string[];
  config: Record<string, unknown>;
}

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  model: string;
  provider: string;
  temperature: number;
  maxTokens: number;
  skills: string[];
  tools: string[];
  systemPrompt: string;
  config: Record<string, unknown>;
}

export interface ProviderConfig {
  id: string;
  name: string;
  type: string;
  apiKey?: string;
  baseUrl?: string;
  model: string;
  config: Record<string, unknown>;
}

export interface GatewayConfig {
  port: number;
  host: string;
  cors: {
    origin: string[];
  };
  websocket: {
    enabled: boolean;
  };
}

export interface SecurityConfig {
  enabled: boolean;
  auditLog: boolean;
  rateLimit: {
    enabled: boolean;
    requestsPerMinute: number;
  };
  sandbox: {
    enabled: boolean;
  };
}

export interface MemoryConfig {
  session: {
    maxAge: number;
    maxMessages: number;
  };
  vector: {
    enabled: boolean;
    provider: string;
  };
}

export interface Config {
  gateway: GatewayConfig;
  security: SecurityConfig;
  memory: MemoryConfig;
  providers: ProviderConfig[];
  agents: AgentConfig[];
  channels: Channel[];
  logging: {
    level: LogLevel;
    format: 'json' | 'pretty';
  };
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Timestamp;
}