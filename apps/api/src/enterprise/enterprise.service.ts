import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EnterpriseCreateDto } from 'src/dto/enterprise/enteprise-create';
import { EnterpriseInformationDto } from 'src/dto/enterprise/enterprise-info.dto';
import { PrismaService } from 'src/prisma.service';
import {
  EtablissementResponse,
  SireneAuthentification,
} from 'types/sirene-api';

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  // -- Methods --

  async create(model: EnterpriseCreateDto, userId: number) {
    await this.prisma.enterprise.create({
      data: {
        siret: model.siret,
        address: model.address,
        city: model.city,
        siren: model.siret.substring(0, 8),
        managerId: userId,
        creationDate: new Date(),
        juridicShapeId: model.juridicShape,
        country: 'France',
        zipCode: model.zipCode,
        TVANumber: model.numberTVA,
        name: model.name,
        email: model.email,
        phone: model.phone,
      },
    });
  }

  async findByid(id: number) {
    return await this.prisma.enterprise.findFirst({
      where: {
        id,
      },
    });
  }

  async getInformationBySiret(
    siret: string,
  ): Promise<Omit<EnterpriseInformationDto, 'id'>> {
    const insee = await this.getInseeInformation(siret);
    return {
      siret: insee.etablissement.siret,
      name: insee.etablissement.uniteLegale.denominationUniteLegale,
      address:
        insee.etablissement.adresseEtablissement.numeroVoieEtablissement +
        ' ' +
        insee.etablissement.adresseEtablissement.typeVoieEtablissement +
        ' ' +
        insee.etablissement.adresseEtablissement.libelleVoieEtablissement,
      city: insee.etablissement.adresseEtablissement
        .libelleCommuneEtablissement,
      zipCode: insee.etablissement.adresseEtablissement.codePostalEtablissement,
      juridicShape:
        insee.etablissement.uniteLegale.categorieJuridiqueUniteLegale,
      socialCapital: insee.etablissement.uniteLegale.capitalSocialUniteLegale,
      numberTVA:
        'FR' +
        this.getCleControleTVANumber(insee.etablissement.siren) +
        insee.etablissement.siren,
    };
  }

  // -- Tools --
  private async getInseeInformation(siret: string) {
    // Récupération du jeton d'authentification
    const header = {
      Authorization: 'Basic ' + process.env.INSEE_API_KEY,
    };
    const token = await this.httpService.axiosRef.post<SireneAuthentification>(
      'https://api.insee.fr/token',
      'grant_type=client_credentials',
      { headers: header },
    );
    // Récupération des informations de l'entreprise
    const url = 'https://api.insee.fr/entreprises/sirene/V3.11/siret/' + siret;
    const response = await this.httpService.axiosRef.get<EtablissementResponse>(
      url,
      { headers: { Authorization: 'Bearer ' + token.data.access_token } },
    );
    return response.data;
  }

  private getCleControleTVANumber(siren: string) {
    // Convertir le SIREN en entier
    const sirenInt = parseInt(siren, 10);

    // Calculer la clé de contrôle
    const cleDeControle = (12 + 3 * (sirenInt % 97)) % 97;

    // Retourner la clé de contrôle sous forme de chaîne de 2 chiffres
    return cleDeControle.toString().padStart(2, '0');
  }
}
