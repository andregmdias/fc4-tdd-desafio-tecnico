import {BookingEntity} from "../entities/booking_entity";
import {PropertyEntity} from "../entities/property_entity";
import {UserEntity} from "../entities/user_entity";
import {BookingMapper} from "./booking_mapper";
import {Booking} from "../../../domain/entities/booking";
import {User} from "../../../domain/entities/user";
import {Property} from "../../../domain/entities/property";
import {DateRange} from "../../../domain/value_objects/date_range";

describe("Booking Mapper", () => {
    it("deve converter BookingEntity em Booking corretamente", () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = "1";
        propertyEntity.name = "Test Property Entity";
        propertyEntity.description = "Test Property Description";
        propertyEntity.maxGuests = 10;
        propertyEntity.basePricePerNight = 100;

        const userEntity: UserEntity = new UserEntity();
        userEntity.id = "1";
        userEntity.name = "Test User Entity";


        const bookingEntity: BookingEntity = new BookingEntity();
        bookingEntity.id = "1";
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date("2024-12-20");
        bookingEntity.endDate = new Date("2024-12-25");
        bookingEntity.guestCount = 3;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = "CONFIRMED";

        const result: Booking = BookingMapper.toDomain(bookingEntity)
        expect(result).toBeInstanceOf(Booking);
        expect(result.getGuest()).toBeInstanceOf(User);
        expect(result.getGuest().getId()).toBe("1");
        expect(result.getProperty()).toBeInstanceOf(Property);
        expect(result.getProperty().getId()).toBe("1");
        expect(result.getTotalPrice()).toBe(500);
        expect(result.getStatus()).toBe("CONFIRMED");
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = "1";
        propertyEntity.name = "Test Property Entity";
        propertyEntity.description = "Test Property Description";
        propertyEntity.maxGuests = 10;
        propertyEntity.basePricePerNight = 100;

        const userEntity: UserEntity = new UserEntity();
        userEntity.id = "1";
        userEntity.name = "Test User Entity";


        const bookingEntity: BookingEntity = new BookingEntity();
        bookingEntity.id = "1";
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date("2024-12-20");
        bookingEntity.endDate = new Date("2024-12-25");
        bookingEntity.guestCount = -3;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = "CONFIRMED";

        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O número de hóspedes deve ser maior que zero.");
    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        const property: Property = new Property(
            "1",
            "Test Model Property",
            "Test Model Property Description",
            10,
            100
        );

        const user: User = new User("1", "Test User")

        const booking: Booking = new Booking(
            "1",
            property,
            user,
            new DateRange(new Date("2024-12-20"), new Date("2024-12-25")),
            10
        )

        const result: BookingEntity = BookingMapper.toPersistence(booking);
        expect(result).toBeInstanceOf(BookingEntity);
        expect(result.guest).toBeInstanceOf(UserEntity);
        expect(result.guest.id).toBe("1");
        expect(result.property).toBeInstanceOf(PropertyEntity);
        expect(result.property.id).toBe("1");
        expect(result.totalPrice).toBe(500);
        expect(result.status).toBe("CONFIRMED");
    });
});