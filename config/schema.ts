import { z } from 'zod';

export const GatewayConfigSchema = z.object({
  port: z.number().int().positive().default(18780),
  host: z.string().default('127.0.0.1'),
  cors: z.object({
    origin: z.array(z.string()).default(['*']),
  }).default({ origin: ['*'] }),
  websocket: z.object({
    enabled: z.boolean().default(true),
  }).default({ enabled: true }),
});

export const SecurityConfigSchema = z.object({
  enabled: z.boolean().default(true),
  auditLog: z.boolean().default(true),
  rateLimit: z.object({
    enabled: z.boolean().default(true),
    requestsPerMinute: z.number().int().positive().default(60),
  }).default({ enabled: true, requestsPerMinute: 60 }),
  sandbox: z.object({
    enabled: z.boolean().default(true),
  }).default({ enabled: true }),
});

export const MemoryConfigSchema = z.object({
  session: z.object({
    maxAge: z.number().int().positive().default(86400000),
    maxMessages: z.number().int().positive().default(100),
  }).default({ maxAge: 86400000, maxMessages: 100 }),
  vector: z.object({
    enabled: z.boolean().default(false),
    provider: z.string().default(''),
  }).default({ enabled: false, provider: '' }),
});

export const ProviderConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['openai', 'anthropic', 'deepseek', 'ollama', 'google', 'qwen']),
  apiKey: z.string().optional(),
  baseUrl: z.string().url().optional(),
  model: z.string(),
  config: z.record(z.string(), z.unknown()).default({}),
});

export const AgentConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(''),
  model: z.string(),
  provider: z.string(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().positive().default(4096),
  skills: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  systemPrompt: z.string().default(''),
  config: z.record(z.string(), z.unknown()).default({}),
});

export const ChannelConfigSchema = z.object({
  id: z.string(),
  type: z.enum([
    'telegram',
    'discord',
    'feishu',
    'slack',
    'wechat',
    'whatsapp',
    'signal',
    'line',
    'matrix',
    'teams',
    'web',
  ]),
  name: z.string(),
  config: z.record(z.string(), z.unknown()).default({}),
  enabled: z.boolean().default(true),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export const LoggingConfigSchema = z.object({
  level: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  format: z.enum(['json', 'pretty']).default('pretty'),
});

export const ConfigSchema = z.object({
  gateway: GatewayConfigSchema.default({}),
  security: SecurityConfigSchema.default({}),
  memory: MemoryConfigSchema.default({}),
  providers: z.array(ProviderConfigSchema).default([]),
  agents: z.array(AgentConfigSchema).default([]),
  channels: z.array(ChannelConfigSchema).default([]),
  logging: LoggingConfigSchema.default({}),
});

export type GatewayConfig = z.infer<typeof GatewayConfigSchema>;
export type SecurityConfig = z.infer<typeof SecurityConfigSchema>;
export type MemoryConfig = z.infer<typeof MemoryConfigSchema>;
export type ProviderConfig = z.infer<typeof ProviderConfigSchema>;
export type AgentConfig = z.infer<typeof AgentConfigSchema>;
export type ChannelConfig = z.infer<typeof ChannelConfigSchema>;
export type LoggingConfig = z.infer<typeof LoggingConfigSchema>;
export type Config = z.infer<typeof ConfigSchema>;