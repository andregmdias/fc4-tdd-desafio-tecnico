import {PropertyEntity} from "../entities/property_entity";
import {PropertyMapper} from "./property_mapper";
import {Property} from "../../../domain/entities/property";

describe("Property Mapper", () => {
    it("deve converter PropertyEntity em Property corretamente", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "Test Property Entity";
        entity.description = "Test Property Description";
        entity.maxGuests = 10;
        entity.basePricePerNight = 100;

        const result: Property = PropertyMapper.toDomain(entity)
        expect(result).toBeInstanceOf(Property);
        expect(result.getId()).toEqual("1");
        expect(result.getName()).toEqual("Test Property Entity");
        expect(result.getName()).toEqual("Test Property Entity");
        expect(result.getDescription()).toEqual("Test Property Description");
        expect(result.getMaxGuests()).toEqual(10);
        expect(result.getBasePricePerNight()).toEqual(100);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.description = "Test Property Description";
        entity.maxGuests = 10;
        entity.basePricePerNight = 100;

        expect(() => PropertyMapper.toDomain(entity)).toThrow("O nome é obrigatório");
    })

    it("deve lançar erro de validação ao receber valor inválido para o máximo de hóspedes no PropertyEntity", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "Test Property Entity";
        entity.description = "Test Property Description";
        entity.maxGuests = -10;
        entity.basePricePerNight = 100;

        expect(() => PropertyMapper.toDomain(entity)).toThrow("O número máximo de hóspedes deve ser maior que zero");
    });

    it("deve lançar erro de validação quando não receber o valor do preço base por noite", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "Test Property Entity";
        entity.description = "Test Property Description";
        entity.maxGuests = 10;

        expect(() => PropertyMapper.toDomain(entity)).toThrow("O preço base por noite é obrigatório");
    });

    it("deve lançar erro de validação ao receber valor inválido para o preço base por noite", () => {
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "Test Property Entity";
        entity.description = "Test Property Description";
        entity.maxGuests = 10;
        entity.basePricePerNight = -100;

        expect(() => PropertyMapper.toDomain(entity)).toThrow("O preço base por noite deve ser maior que zero");
    });

    it("deve converter Property para PropertyEntity corretamente", () => {
       const property: Property = new Property(
           "1",
           "Test Model Property",
           "Test Model Property Description",
           10,
           100
       );

       const result: PropertyEntity = PropertyMapper.toPersistence(property);
        expect(result).toBeInstanceOf(PropertyEntity);
        expect(result.id).toEqual("1");
        expect(result.name).toEqual("Test Model Property");
        expect(result.description).toEqual("Test Model Property Description");
        expect(result.maxGuests).toEqual(10);
        expect(result.basePricePerNight).toEqual(100);
    });
})