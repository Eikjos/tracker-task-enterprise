import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EnterpriseService {
  constructor(private readonly prisma : PrismaService) {}

  // -- Methods --

  findByid(id : number) {
    this.prisma.enterprise.findFirst({
      where: {
        id
      }
    })
  }

  // -- Tools --
}