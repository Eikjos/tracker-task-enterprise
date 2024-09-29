import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma.module";
import { JuridicShapeController } from "./juridic-shape.controller";
import { JuridicShapeService } from "./juridic-shape.service";

@Module({
  imports: [PrismaModule],
  controllers: [JuridicShapeController],
  providers: [JuridicShapeService],
})
export class JuridicShapeModule {

}