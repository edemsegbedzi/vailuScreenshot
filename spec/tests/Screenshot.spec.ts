import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';



describe('Users Routes', () => {

   
    const getScreenshotPath = "/screenshot";


    const { BAD_REQUEST, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"POST:${getScreenshotPath}"`, () => {

        const callApi = (reqBody: any) => {
            return agent.post(getScreenshotPath).type('applicaton/json').send(reqBody);
        };

        const body = {
            url : "https://www.valiu.com"
        }

        it(`should return a status code of "${OK}"if the request was successful.`, function () {
            // Call API
            agent.post(getScreenshotPath).type('form').send(body)
                .end((err: Error, res: any) => {
                    console.error(err)
                    expect(res.status).toBe(OK);
                });
        });

        it(`should return a JSON object with an error message of invalid url passed and a status
            code of "${BAD_REQUEST}" if the url is invalid`, function(){
            // Call API
            callApi({url : "www.valiu.com"})
                .end((err: Error, res: any) => {
                    expect(res.status).toBe(BAD_REQUEST);
                });
        });

       
    });

});
