import { Transform, Type } from "class-transformer";
import { IsNumber, IsString, IsIn } from "class-validator";

export const ENV_VALUES = ["test", "production", "development"] as const;
export type ENV_VALUES = (typeof ENV_VALUES)[number];

export class ENV {
    @IsIn(ENV_VALUES)
    @IsString()
    NODE_ENV: ENV_VALUES;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    DATABASE_PORT: number;

    @IsString()
    DATABASE_HOST: string;

    @IsString()
    DATABASE_USERNAME: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    APP_PORT: number;

    @IsString()
    APP_HOST: string;

    @IsString()
    APP_PATH: string;

    @IsString()
    APP_PROTOCOL: string;
}