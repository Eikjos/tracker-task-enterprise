import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, EnterpriseModule],
})
export class AppModule {}
