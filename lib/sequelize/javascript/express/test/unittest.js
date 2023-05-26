/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
import "../../../config/logger";
import "../../mock/mockLogger";

describe.only("Test Template", () => {
    test("should pass", () => {
        expect("users").toEqual("users");
    });
});
