import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { config } from 'dotenv';
import { ENV } from './env.dto';

config();

@Injectable()
export class EnvService {
    public readonly envConfig: ENV;

    constructor() {
        const configInstance = plainToInstance(ENV, process.env, { enableImplicitConversion: true });
        const errors = validateSync(configInstance, { skipMissingProperties: false });
        if (errors.length > 0) {
            throw new Error('Config validation error');
        }
        this.envConfig = configInstance;
    }

    get isDevelopment(): boolean {
        return this.envConfig.NODE_ENV !== 'production';
    }

    get isProduction(): boolean {
        return !this.isDevelopment;
    }

    get apiUrl(): string {
        return `${this.envConfig.APP_PROTOCOL}://${this.envConfig.APP_HOST}:${this.envConfig.APP_PORT}/${this.envConfig.APP_PATH}`
    }
}