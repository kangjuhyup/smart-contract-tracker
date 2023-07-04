import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const db_type = configService.get<string>('DATABASE_TYPE')
      const dataSourceOpt:DataSourceOptions = {  
        type : db_type === 'postgres' ? 'postgres' : db_type === 'mysql' ? 'mysql' : db_type === 'mariadb' ? 'mariadb' : db_type === 'mongodb' ? 'mongodb' : 'oracle',   
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PWD'),
        database: configService.get<string>('DATABASE'),
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      };
      
      const dataSource = new DataSource(dataSourceOpt);
      return dataSource.initialize();
    },
    inject: [ConfigService]
  },
];