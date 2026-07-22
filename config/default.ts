import { Config } from './schema';

export const defaultConfig: Config = {
  gateway: {
    port: 18780,
    host: '127.0.0.1',
    cors: {
      origin: ['*'],
    },
    websocket: {
      enabled: true,
    },
  },
  security: {
    enabled: true,
    auditLog: true,
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60,
    },
    sandbox: {
      enabled: true,
    },
  },
  memory: {
    session: {
      maxAge: 86400000,
      maxMessages: 100,
    },
    vector: {
      enabled: false,
      provider: '',
    },
  },
  providers: [],
  agents: [
    {
      id: 'default',
      name: 'Default Agent',
      description: 'The default Librabot agent',
      model: 'gpt-4o',
      provider: 'openai',
      temperature: 0.7,
      maxTokens: 4096,
      skills: [],
      tools: [],
      systemPrompt: 'You are Librabot, a helpful AI assistant. Follow the user\'s instructions carefully.',
      config: {},
    },
  ],
  channels: [
    {
      id: 'web',
      type: 'web',
      name: 'Web Console',
      config: {},
      enabled: true,
    },
  ],
  logging: {
    level: 'info',
    format: 'pretty',
  },
};