import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import {CreateBookingDTO} from "../dtos/create_booking_dto";
import {CreatePropertyDto} from "../dtos/create_property_dto";
import {randomUUID} from "node:crypto";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async createProperty(dto: CreatePropertyDto): Promise<Property> {
    const property: Property = new Property(
        randomUUID(),
        dto.name,
        dto.description,
        dto.maxGuests,
        dto.basePricePerNight
    );
    return this.propertyRepository.save(property);
  }
}
