import axios from "axios";

describe('/default', () => {

    const httpRequest = axios.create({
        baseURL: process.env.APP_URL,
        timeout: 1000
    });

    it('get login', async () => {
        const response = await httpRequest.get('/login', {
            headers: {
                accept: 'text/html'
            }
        });
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('text/html');
        expect(response.data).toContain('<title>Login</title>');
    });
});