import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customers/customer.module';
import { EnterpriseModule } from './enterprises/enterprise.module';
import { JuridicShapeModule } from './juridic-shapes/juridic-shape.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    EnterpriseModule,
    JuridicShapeModule,
    CustomerModule,
  ],
})
export class AppModule {}
