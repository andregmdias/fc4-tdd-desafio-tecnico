import { Repository } from "typeorm";
import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { PropertyMapper } from "../persistence/mappers/property_mapper";
import { PropertyEntity } from "../persistence/entities/property_entity";

export class TypeORMPropertyRepository implements PropertyRepository {
  private readonly repository: Repository<PropertyEntity>;

  constructor(repository: Repository<PropertyEntity>) {
    this.repository = repository;
  }

  async save(property: Property): Promise<Property> {
    const propertyEntity = PropertyMapper.toPersistence(property);
    const newProperty = await this.repository.save(propertyEntity);
    return PropertyMapper.toDomain(newProperty);
  }

  async findById(id: string): Promise<Property | null> {
    const propertyEntity = await this.repository.findOne({ where: { id } });
    return propertyEntity ? PropertyMapper.toDomain(propertyEntity) : null;
  }
}
