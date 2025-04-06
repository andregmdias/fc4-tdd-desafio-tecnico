import {UserEntity} from "../entities/user_entity";
import {UserMapper} from "./user_mapper";
import {User} from "../../../domain/entities/user";

describe("UserMapper test", () => {
    it("deve converter UserEntity em User corretamente", () => {
        const entity: UserEntity = new UserEntity();
        entity.id = "1";
        entity.name = "Test User Entity";

        const result: User = UserMapper.toDomain(entity);
        expect(result).toBeInstanceOf(User);
        expect(result.getId()).toBe("1");
        expect(result.getName()).toBe("Test User Entity");
    });

    it("deve retornar um erro quando campo nome não estiver presente", () => {
        const entity: UserEntity = new UserEntity();
        entity.id = "1";

        expect(() => UserMapper.toDomain(entity)).toThrow("O nome é obrigatório");
    });

    it("deve retornar um erro quando campo id não estiver presente", () => {
        const entity: UserEntity = new UserEntity();
        entity.name = "Test User Entity";

        expect(() => UserMapper.toDomain(entity)).toThrow("O ID é obrigatório");
    });
    it("deve converter User em UserEntity corretamente", () => {
       const user: User = new User("1", "Test User Model");

       const result: UserEntity = UserMapper.toPersistence(user);
       expect(result).toBeInstanceOf(UserEntity);
       expect(result.id).toBe("1");
       expect(result.name).toBe("Test User Model");
    });
})