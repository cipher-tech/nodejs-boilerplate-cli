import UserService from "../../../app/services/userService";

describe("UserService", () => {
    test("should fetch users", async () => {
        let data = {
            currentUrl: "localhost/api/v1/users/",
            message: "Registration successful",
            data: [
                {
                    id: 5,
                    name: "1234",
                    email: "mail1@mail.com",
                    phone_number: "09046363777",
                    age: 23,
                    date_of_birth: "1999-09-08",
                    created_at: "2022-06-05T22:47:59.470Z"
                },
                {
                    id: 6,
                    name: "1234",
                    email: "cipher@mail.com",
                    phone_number: "09046363777",
                    age: 23,
                    date_of_birth: "1999-09-08",
                    created_at: "2022-06-12T12:47:10.583Z"
                },
                {
                    id: 7,
                    name: "1234",
                    email: "cipher123@mail.com",
                    phone_number: "09046363777",
                    age: 23,
                    date_of_birth: "1999-09-08",
                    created_at: "2022-06-12T12:48:29.378Z"
                },
                {
                    id: 8,
                    name: "1234",
                    email: "cipher1233@mail.com",
                    phone_number: "09046363777",
                    age: 23,
                    date_of_birth: "1999-09-08",
                    created_at: "2022-06-12T13:29:12.972Z"
                },
                {
                    id: 9,
                    name: "cipher tech",
                    email: "newuser@mail.com",
                    phone_number: "06046363777",
                    age: 23,
                    date_of_birth: "1999-09-08",
                    created_at: "2022-07-09T16:55:11.936Z"
                }
            ],
            status: "success"
        };

        const users = new UserService();
        expect(users).not.toBeNull();
    });
});
