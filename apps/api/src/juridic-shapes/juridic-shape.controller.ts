import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JuridicShapeService } from "./juridic-shape.service";

@ApiTags("Juridics Shapes")
@Controller("api/juridic-shapes")
export class JuridicShapeController {
  constructor(private readonly juridicShapeService : JuridicShapeService) { }

  @Get()
  async GetAll() {
    return await this.juridicShapeService.GetAll();
  }

}