import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, EnvObjects, MongoOptions } from '../configurations';
import { OrmModule } from '../database/orm';
import { ChatModule } from './chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    OrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const data = configService.get<MongoOptions>(EnvObjects.MONGO_OPTIONS);

        return { uri: data?.host, ...data.options };
      },
      inject: [ConfigService],
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
