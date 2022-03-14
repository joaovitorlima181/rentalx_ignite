import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            brand,
            category_id,
            dailyRate,
            fineAmount,
            licensePlate,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);

        const car = await createCarUseCase.execute({
            name,
            description,
            brand,
            category_id,
            dailyRate,
            fineAmount,
            licensePlate,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarController };
