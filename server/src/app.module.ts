import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: `.${process.env.NODE_ENV}.env`,
//     }),
//     SequelizeModule.forRoot({
//       // dialect: process.env.DIALECT as Dialect,
//       dialect: 'postgres',
//       host: process.env.POSTGRES_HOST,
//       port: Number(process.env.POSTGRES_DB_PORT),
//       username: process.env.POSTGRES_USERNAME,
//       password: process.env.POSTGRES_DB_PASSWORD,
//       database: process.env.POSTGRES_DB_NAME,
//       models: [User],
//       autoLoadModels: true,
//       synchronize: true,
//       logging: console.log,
//     }),
//     UsersModule,
//   ],
// })
// export class AppModule {}

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      // dialect: process.env.DIALECT as Dialect,
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'uniboy-shop',
      models: [User],
      autoLoadModels: true,
      // synchronize: true,
      logging: console.log,
    }),
    UsersModule,
  ],
})
export class AppModule {}
