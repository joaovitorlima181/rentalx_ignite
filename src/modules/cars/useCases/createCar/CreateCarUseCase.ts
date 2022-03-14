import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    category_id: string;
}

injectable();
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        brand,
        category_id,
    }): Promise<Car> {
        const carAlreadyExist = await this.carsRepository.findByLicensePlate(
            licensePlate
        );

        if (carAlreadyExist) {
            throw new AppError("Car already exist");
        }

        const car = await this.carsRepository.create({
            name,
            description,
            dailyRate,
            licensePlate,
            fineAmount,
            brand,
            category_id,
        });

        return car;
    }
}

export { CreateCarUseCase };
