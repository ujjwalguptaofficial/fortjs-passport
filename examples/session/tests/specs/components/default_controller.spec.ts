import { DefaultController } from "@/controllers/default_controller";
import { viewResult, Fort } from "fortjs";
import { createApp } from "@/index";

describe('DefaultController', () => {
    const controller: DefaultController = new DefaultController();

    beforeAll(async () => {
        await createApp();
    });

    it('get login ', async () => {
        controller.initialize();
        const expectedResult = await viewResult('../src/views/default/login.html');
        const result = await controller.getLoginForm();
        expect(result).toEqual(expectedResult);
    });

    afterAll(() => {
        return Fort.destroy();
    });
});