import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EnterpriseInformationDto } from "src/dto/enterprise/enterprise-info.dto";
import { EnterpriseService } from "./enterprise.service";

@ApiTags("Enterprise")
@Controller("api/enterprise")
export class EnterpriseController {
  constructor(private readonly enterpriseService : EnterpriseService) { }


  @Get("information")
  async getInformation(@Query('siret') siret : string) : Promise<EnterpriseInformationDto> {
    return await this.enterpriseService.getInformationBySiret(siret);
  } 
}