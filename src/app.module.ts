import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env/env.service';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envService: EnvService) => ({
        type: 'mysql',
        host: envService.envConfig.DATABASE_HOST,
        port: envService.envConfig.DATABASE_PORT,
        username: envService.envConfig.DATABASE_USERNAME,
        password: envService.envConfig.DATABASE_PASSWORD,
        database: envService.envConfig.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: envService.isDevelopment,
        autoLoadEntities: true,
        migrationsTransactionMode: "each"
      }),
      inject: [EnvService]
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [EnvService],
})
export class AppModule {
  constructor(private envService: EnvService) { }
}