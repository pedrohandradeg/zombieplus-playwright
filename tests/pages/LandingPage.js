const { expect } = require('@playwright/test');

export class LandingPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        //Acessa a página do portal com o método goto
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        //Localiza o botão através do getByRole e pela substring e clica no botão pelo método click()
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        //Faz um checkpoint validando se o modal que vai ser exibido é o que se espera 
        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        //Localiza o input pelo locator e preeche com o método fill()
        await this.page.locator('#name').fill(name)
        await this.page.locator('#email').fill(email)
        //Localiza o botão pelo texto, mas fazendo uma verificação antes
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click();

        //Caso não tenha ID, busque pelo:
          // Seletor CSS 'ELEMENTO[PROP=VALUE]
          //await page.locator('input[name=name]').fill('Fulano Beltrano');
          //await page.locator('input[name=emal]').fill('fulanobeltrano@email.com');
          // getByPlaceholder'
          //await page.getByPlaceholder("Seu nome completo").fill('Fulano Beltrano');
          //await page.getByPlaceholder("Seu email principal").fill('fulanobeltrano@email.com');
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}