import { RandomNumberHelper } from "../../../app/utils";
import "../../../config/logger";
import "../../mock/mockLogger";

describe.only("Test random number generator class", () => {
    test.only("Should generate same random number: getConsistentRandomNumber", async () => {
        const randomNumber = new RandomNumberHelper();
        expect(randomNumber.getConsistentRandomNumber)
            .toEqual(randomNumber.getConsistentRandomNumber);
    });
    test.only("Should generate different random numbers: getConsistentRandomNumber", async () => {
        const randomNumber = RandomNumberHelper.generateRandomNumber();
        const randomNumber2 = RandomNumberHelper.generateRandomNumber();
        expect(randomNumber).not.toBeNull();
        expect(randomNumber2).not.toBeNull();
        expect(randomNumber).not.toEqual(randomNumber2);
    });
});
