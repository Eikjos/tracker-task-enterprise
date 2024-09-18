import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { EnterpriseController } from "./enterprise.controller";
import { EnterpriseService } from "./enterprise.service";

@Module({
  imports: [PrismaModule],
  providers: [EnterpriseService],
  controllers: [EnterpriseController]
})
export class EnterpriseModule {

}