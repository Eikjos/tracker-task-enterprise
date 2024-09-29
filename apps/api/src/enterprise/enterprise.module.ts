import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { EnterpriseController } from "./enterprise.controller";
import { EnterpriseService } from "./enterprise.service";

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [EnterpriseService],
  controllers: [EnterpriseController]
})
export class EnterpriseModule {

}