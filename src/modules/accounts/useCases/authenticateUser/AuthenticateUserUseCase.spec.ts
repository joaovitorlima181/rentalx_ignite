import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to athenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Teste",
            email: "teste@teste.com",
            driver_license: "123456789",
            password: "123456",
        };

        await createUserUseCase.execute(user);

        const userAuthenticated = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(userAuthenticated).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@false.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate an user with wrong password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Teste",
                email: "teste@teste.com",
                driver_license: "123456789",
                password: "123456",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "false",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
