import {PropertyService} from "../../application/services/property_service";
import {Request, Response} from "express";
import {CreatePropertyDto} from "../../application/dtos/create_property_dto";
import {Property} from "../../domain/entities/property";

export class PropertyController {
    private readonly propertyService: PropertyService;

    constructor(propertyService: PropertyService) {
        this.propertyService = propertyService;
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const dto: CreatePropertyDto = {
                name: req.body.name,
                description: req.body.description,
                maxGuests: req.body.maxGuests,
                basePricePerNight: req.body.basePricePerNight,
            }

            const property: Property = await this.propertyService.createProperty(dto);

            return res.status(201).json({
                message: "Property created successfully",
                property: {
                    id: property.getId(),
                    name: property.getName(),
                    description: property.getDescription(),
                    maxGuests: property.getMaxGuests(),
                    basePricePerNight: property.getBasePricePerNight(),
                }
            });
        } catch (error: any) {
            return res.status(400)
                .json({ message: error.message || "An unexpected error occurred" });
        }
    }

}