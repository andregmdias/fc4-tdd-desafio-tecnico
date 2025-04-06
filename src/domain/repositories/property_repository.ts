import { Property } from "../entities/property";

export interface PropertyRepository {
  save(property: Property): Promise<Property>;
  findById(id: string): Promise<Property | null>;
}
