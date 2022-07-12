import UserService from "../../../app/services/userService";
import "../../mock/mockUserModel";
import "../../mock/mockLogger";

describe("Test methods in UserService", () => {
    test("should fetch users :::getUsers", async () => {
        const users = [
            {
                id: 9,
                name: "cipher tech",
                email: "newuser@mail.com",
                phone_number: "06046363777",
                age: 28,
                date_of_birth: "1999-09-08",
                created_at: "2022-07-09T16:55:11.936Z"
            }
        ];
        const userService = new UserService();
        const { data } = await userService.getUsers();
        await expect(users).toEqual(data);
    });

    test("Should fail to fetch users :::getUsers", async () => {
        const userService = new UserService();
        const result = await userService.getUsers;
        await expect(result).rejects.toThrow("An error occurred. we're looking into it.");
    });

    test("should fetch user by email :::getUserByEmail", async () => {
        const user = {
            id: 9,
            name: "cipher tech",
            email: "newuser@mail.com",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08",
            created_at: "2022-07-09T16:55:11.936Z"
        };

        const userService = new UserService();
        const data = await userService.getUserByEmail("newuser@mail.com");
        await expect(user).toEqual(data);
    });

    test("Should fail to fetch user :::getUserByEmail", async () => {
        const userService = new UserService();
        const result = await userService.getUserByEmail;
        await expect(result).rejects.toThrowError("An error occurred. we're looking into it");
    });

    test("should fetch user by ID :::getUserById", async () => {
        const user = {
            id: 9,
            name: "cipher tech",
            email: "newuser@mail.com",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08",
            created_at: "2022-07-09T16:55:11.936Z"
        };

        const userService = new UserService();
        const data = await userService.getUserById("9");
        await expect(user).toEqual(data);
    });

    test("Should fail to fetch user by ID :::getUserById", async () => {
        const userService = new UserService();
        const result = await userService.getUserById;
        await expect(result).rejects.toThrowError("An error occurred. we're looking into it");
    });

    test("should create user :::storeUser", async () => {
        const user = {
            id: 9,
            name: "cipher tech",
            email: "newuser@mail.com",
            phone_number: "06046363777",
            age: 28,
            date_of_birth: "1999-09-08",
            created_at: "2022-07-09T16:55:11.936Z"
        };

        const userService = new UserService();
        const data = await userService.storeUser("9");
        await expect(user).toEqual(data);
    });

    test("Should fail to create user :::storeUser", async () => {
        const userService = new UserService();
        const result = await userService.storeUser;
        await expect(result).rejects.toThrowError("An error occurred. we're looking into it");
    });
});
