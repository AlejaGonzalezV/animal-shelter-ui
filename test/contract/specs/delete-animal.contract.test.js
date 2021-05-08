import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

describe('Given An Animal service', () => {
    describe('When a request to create an animal is made', () => {
        var petname = "Lulo"
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'delete animal',
                uponReceiving: 'a request to delete an animal',
                withRequest: {
                    method: 'DELETE',
                    path: `/animals/${petname}`,
                },
                willRespondWith: {
                    status: 204
                }
            });
        });

        it("Then it should return the right data", async() =>{
            const response = await AnimalController.delete(petname);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        });
    });
});