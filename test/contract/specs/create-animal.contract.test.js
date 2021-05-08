import { provider } from "./init-pact";
import { AnimalController } from "../../../controllers";
import { Matchers } from "@pact-foundation/pact";

describe('Given An Animal service', () => {
    describe('When a request to create an animal is made', () => {
        var pet = {
            name:"Lulo",
            breed:"Pug",
            gender:"Male",
            vaccinated:true
        }
        beforeAll(async () => {
            await provider.setup();
            await provider.addInteraction({
                state: 'create animal',
                uponReceiving: 'a request to create an animal',
                withRequest: {
                    method: 'POST',
                    path: '/animals',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: pet
                },
                willRespondWith: {
                    status: 201,
                    body: Matchers.like(pet),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            });
        });

        it("Then it should return the right data", async() =>{
            const response = await AnimalController.register(pet);
            expect(response.data).toMatchSnapshot();
            await provider.verify();
        });

        afterAll(async () => {
            await provider.finalize();
        });
    });
});