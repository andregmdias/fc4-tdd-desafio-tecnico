import { PropertyService } from "./property_service";
import { FakePropertyRepository } from "../../infrastructure/repositories/fake_property_repository";
import { Property } from "../../domain/entities/property";
import {CreatePropertyDto} from "../dtos/create_property_dto";

describe("PropertyService", () => {
  let propertyService: PropertyService;
  let fakePropertyRepository: FakePropertyRepository;

  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    propertyService = new PropertyService(fakePropertyRepository);
  });

  it("deve retornar null quando um ID inválido for passado", async () => {
    const property = await propertyService.findPropertyById("999");
    expect(property).toBeNull();
  });

  it("deve retornar uma propriedade quando um ID váilido for fornecido", async () => {
    const property = await propertyService.findPropertyById("1");
    expect(property).not.toBeNull();
    expect(property?.getId()).toBe("1");
    expect(property?.getName()).toBe("Apartamento");
  });

  it("deve salvar uma nova propriedade com sucesso", async () => {
    const newProperty: CreatePropertyDto = {
      name: "Test Property",
      description: "Test Description",
      maxGuests: 3,
      basePricePerNight: 100
    };
    const property = await propertyService.createProperty(newProperty);
    expect(property).not.toBeNull();
    expect(property?.getId()).not.toBeNull();
    expect(property?.getName()).toBe("Test Property");
  });
});
