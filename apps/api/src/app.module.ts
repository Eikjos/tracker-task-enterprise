import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnterpriseModule } from './enterprises/enterprise.module';
import { JuridicShapeModule } from './juridic-shapes/juridic-shape.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    EnterpriseModule,
    JuridicShapeModule,
  ],
})
export class AppModule {}
