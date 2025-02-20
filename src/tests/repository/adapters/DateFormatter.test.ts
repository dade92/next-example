import {dateFormatter} from "../../../main/repository/adapters/DateFormatter";

describe("DateFormatter", () => {

    it("should format date properly", () => {
        const date = new Date(2025, 0, 5);
        const actual = dateFormatter(date);

        expect(actual).toBe("05 Jan 2025");
    });

});