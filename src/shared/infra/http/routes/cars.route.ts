import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
    "/",
    ensureAdmin,
    ensureAuthenticated,
    createCarController.handle
);

export { carsRoutes };