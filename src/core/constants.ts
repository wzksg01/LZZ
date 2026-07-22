export const PROJECT_NAME = 'Librabot';

export const PROJECT_VERSION = '1.0.0';

export const DEFAULT_GATEWAY_PORT = 18780;

export const DEFAULT_GATEWAY_HOST = '127.0.0.1';

export const DEFAULT_LOG_LEVEL = 'info';

export const DEFAULT_MAX_SESSION_AGE = 86400000;

export const DEFAULT_MAX_SESSION_MESSAGES = 100;

export const DEFAULT_REQUEST_TIMEOUT = 30000;

export const DEFAULT_MAX_RETRIES = 3;

export const DEFAULT_RETRY_DELAY = 1000;

export const DEFAULT_RATE_LIMIT = 60;

export const DEFAULT_CORS_ORIGINS = ['*'];

export const DEFAULT_TEMPERATURE = 0.7;

export const DEFAULT_MAX_TOKENS = 4096;

export const DEFAULT_SYSTEM_PROMPT = `You are ${PROJECT_NAME}, a helpful AI assistant. Follow the user's instructions carefully.`;

export const MESSAGE_TYPE_TEXT = 'text';

export const MESSAGE_TYPE_IMAGE = 'image';

export const MESSAGE_TYPE_AUDIO = 'audio';

export const MESSAGE_TYPE_VIDEO = 'video';

export const MESSAGE_TYPE_FILE = 'file';

export const MESSAGE_TYPE_SYSTEM = 'system';

export const AGENT_STATUS_IDLE = 'idle';

export const AGENT_STATUS_THINKING = 'thinking';

export const AGENT_STATUS_PLANNING = 'planning';

export const AGENT_STATUS_ACTING = 'acting';

export const AGENT_STATUS_OBSERVING = 'observing';

export const AGENT_STATUS_REFLECTING = 'reflecting';

export const AGENT_STATUS_ERROR = 'error';

export const CHANNEL_TYPE_TELEGRAM = 'telegram';

export const CHANNEL_TYPE_DISCORD = 'discord';

export const CHANNEL_TYPE_FEISHU = 'feishu';

export const CHANNEL_TYPE_SLACK = 'slack';

export const CHANNEL_TYPE_WECHAT = 'wechat';

export const CHANNEL_TYPE_WHATSAPP = 'whatsapp';

export const CHANNEL_TYPE_SIGNAL = 'signal';

export const CHANNEL_TYPE_LINE = 'line';

export const CHANNEL_TYPE_MATRIX = 'matrix';

export const CHANNEL_TYPE_TEAMS = 'teams';

export const CHANNEL_TYPE_WEB = 'web';

export const LOG_LEVEL_TRACE = 'trace';

export const LOG_LEVEL_DEBUG = 'debug';

export const LOG_LEVEL_INFO = 'info';

export const LOG_LEVEL_WARN = 'warn';

export const LOG_LEVEL_ERROR = 'error';

export const LOG_LEVEL_FATAL = 'fatal';

export const LOG_LEVELS: string[] = [
  LOG_LEVEL_TRACE,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARN,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL,
];

export const PROVIDER_TYPE_OPENAI = 'openai';

export const PROVIDER_TYPE_ANTHROPIC = 'anthropic';

export const PROVIDER_TYPE_DEEPSEEK = 'deepseek';

export const PROVIDER_TYPE_OLLAMA = 'ollama';

export const PROVIDER_TYPE_GOOGLE = 'google';

export const PROVIDER_TYPE_QWEN = 'qwen';

export const TOOL_TYPE_BROWSER = 'browser';

export const TOOL_TYPE_CRON = 'cron';

export const TOOL_TYPE_EXEC = 'exec';

export const TOOL_TYPE_FS = 'fs';

export const TOOL_TYPE_HTTP = 'http';

export const TOOL_TYPE_MEMORY_SEARCH = 'memory-search';

export const TOOL_TYPE_SESSION = 'session';

export const ERROR_CODE_UNKNOWN = 'UNKNOWN_ERROR';

export const ERROR_CODE_VALIDATION = 'VALIDATION_ERROR';

export const ERROR_CODE_CONFIG = 'CONFIG_ERROR';

export const ERROR_CODE_AUTH = 'AUTH_ERROR';

export const ERROR_CODE_RATE_LIMIT = 'RATE_LIMIT_ERROR';

export const ERROR_CODE_PROVIDER = 'PROVIDER_ERROR';

export const ERROR_CODE_TOOL = 'TOOL_ERROR';

export const ERROR_CODE_MEMORY = 'MEMORY_ERROR';

export const ERROR_CODE_CHANNEL = 'CHANNEL_ERROR';

export const ERROR_CODE_GATEWAY = 'GATEWAY_ERROR';

export const ERROR_CODE_AGENT = 'AGENT_ERROR';

export const CONFIG_DIR = './config';

export const CONFIG_LOCAL_DIR = './config/local';

export const MEMORY_DIR = './memory';

export const LOG_DIR = './logs';

export const SKILLS_DIR = './skills';

export const EXTENSIONS_DIR = './extensions';

export const PLUGINS_DIR = './plugins';

export const PACKAGES_DIR = './packages';

export const DEFAULT_CONFIG_FILE = 'default.ts';

export const LOCAL_CONFIG_FILE = 'local.ts';

export const ENV_CONFIG_FILE = '.env';

export const APPLICATION_JSON = 'application/json';

export const TEXT_PLAIN = 'text/plain';

export const CONTENT_TYPE_HEADER = 'Content-Type';

export const AUTHORIZATION_HEADER = 'Authorization';

export const ACCEPT_HEADER = 'Accept';

export const USER_AGENT_HEADER = 'User-Agent';

export const X_REQUEST_ID_HEADER = 'X-Request-ID';

export const X_USER_ID_HEADER = 'X-User-ID';

export const X_CHANNEL_ID_HEADER = 'X-Channel-ID';

export const X_SESSION_ID_HEADER = 'X-Session-ID';

export const HEALTH_CHECK_PATH = '/health';

export const API_PREFIX = '/api';

export const API_V1_PREFIX = '/api/v1';

export const WS_PREFIX = '/ws';

export const WS_MESSAGE_EVENT = 'message';

export const WS_CONNECT_EVENT = 'connect';

export const WS_DISCONNECT_EVENT = 'disconnect';

export const WS_ERROR_EVENT = 'error';

export const LOBSTER_LOOP_PHASES = [
  'perceive',
  'think',
  'plan',
  'act',
  'observe',
  'reflect',
] as const;

export const LOBSTER_LOOP_PHASE_PERCEIVE = 'perceive';

export const LOBSTER_LOOP_PHASE_THINK = 'think';

export const LOBSTER_LOOP_PHASE_PLAN = 'plan';

export const LOBSTER_LOOP_PHASE_ACT = 'act';

export const LOBSTER_LOOP_PHASE_OBSERVE = 'observe';

export const LOBSTER_LOOP_PHASE_REFLECT = 'reflect';