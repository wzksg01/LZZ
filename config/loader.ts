import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { Config, ConfigSchema } from './schema';
import { defaultConfig } from './default';
import { ConfigError } from '../src/core/errors';
import { mergeDeep } from '../src/core/utils';

const envSchema = z.object({
  GATEWAY_PORT: z.coerce.number().optional(),
  GATEWAY_HOST: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  DEEPSEEK_API_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).optional(),
  ENABLE_AUDIT_LOG: z.coerce.boolean().optional(),
});

type EnvConfig = z.infer<typeof envSchema>;

export class ConfigLoader {
  private config: Config | null = null;

  async load(): Promise<Config> {
    if (this.config) {
      return this.config;
    }

    try {
      const envConfig = this.loadEnv();
      const localConfig = await this.loadLocalConfig();
      const mergedConfig = this.mergeConfigs(defaultConfig, localConfig, envConfig);
      const validatedConfig = this.validate(mergedConfig);

      this.config = validatedConfig;
      return validatedConfig;
    } catch (error) {
      throw new ConfigError('Failed to load configuration', { error });
    }
  }

  private loadEnv(): Partial<Config> {
    if (existsSync('.env')) {
      const envContent = readFileSync('.env', 'utf-8');
      const envLines = envContent.split('\n');
      const env: Record<string, string> = {};

      for (const line of envLines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, value] = trimmedLine.split('=', 2);
          if (key && value !== undefined) {
            env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
          }
        }
      }

      const parsed = envSchema.safeParse(env);
      if (!parsed.success) {
        throw new ConfigError('Invalid environment variables', {
          errors: parsed.error.errors,
        });
      }

      return this.mapEnvToConfig(parsed.data);
    }

    return this.mapEnvToConfig(process.env as unknown as EnvConfig);
  }

  private mapEnvToConfig(env: EnvConfig): Partial<Config> {
    const config: Partial<Config> = {};

    if (env.GATEWAY_PORT !== undefined || env.GATEWAY_HOST !== undefined) {
      config.gateway = {
        port: env.GATEWAY_PORT ?? defaultConfig.gateway.port,
        host: env.GATEWAY_HOST ?? defaultConfig.gateway.host,
        cors: defaultConfig.gateway.cors,
        websocket: defaultConfig.gateway.websocket,
      };
    }

    if (env.LOG_LEVEL !== undefined) {
      config.logging = {
        level: env.LOG_LEVEL,
        format: defaultConfig.logging.format,
      };
    }

    if (env.ENABLE_AUDIT_LOG !== undefined) {
      config.security = {
        ...defaultConfig.security,
        auditLog: env.ENABLE_AUDIT_LOG,
      };
    }

    if (env.OPENAI_API_KEY) {
      config.providers = [
        {
          id: 'openai',
          name: 'OpenAI',
          type: 'openai',
          apiKey: env.OPENAI_API_KEY,
          model: 'gpt-4o',
          config: {},
        },
      ];
    }

    if (env.ANTHROPIC_API_KEY) {
      if (!config.providers) config.providers = [];
      config.providers.push({
        id: 'anthropic',
        name: 'Anthropic',
        type: 'anthropic',
        apiKey: env.ANTHROPIC_API_KEY,
        model: 'claude-3-5-sonnet-latest',
        config: {},
      });
    }

    if (env.DEEPSEEK_API_KEY) {
      if (!config.providers) config.providers = [];
      config.providers.push({
        id: 'deepseek',
        name: 'DeepSeek',
        type: 'deepseek',
        apiKey: env.DEEPSEEK_API_KEY,
        model: 'deepseek-chat',
        config: {},
      });
    }

    return config;
  }

  private async loadLocalConfig(): Promise<Partial<Config>> {
    const localConfigPath = join(__dirname, 'local', 'local.ts');

    if (existsSync(localConfigPath)) {
      try {
        const module = await import(localConfigPath);
        return module.default || {};
      } catch {
        const jsonPath = join(__dirname, 'local', 'local.json');
        if (existsSync(jsonPath)) {
          const content = readFileSync(jsonPath, 'utf-8');
          return JSON.parse(content);
        }
      }
    }

    return {};
  }

  private mergeConfigs(
    defaultConfig: Config,
    localConfig: Partial<Config>,
    envConfig: Partial<Config>
  ): Config {
    const merged = mergeDeep(defaultConfig, localConfig);
    return mergeDeep(merged, envConfig);
  }

  private validate(config: Partial<Config>): Config {
    const result = ConfigSchema.safeParse(config);

    if (!result.success) {
      throw new ConfigError('Invalid configuration', {
        errors: result.error.errors,
      });
    }

    return result.data;
  }

  get(): Config {
    if (!this.config) {
      throw new ConfigError('Configuration not loaded');
    }
    return this.config;
  }

  isLoaded(): boolean {
    return this.config !== null;
  }
}

export const configLoader = new ConfigLoader();