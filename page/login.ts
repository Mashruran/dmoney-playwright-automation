import { Page } from "@playwright/test";

export class LoginPage{
    constructor(private page:Page){}
    async userLogin(email:string, password:string){
        await this.page.getByRole("textbox",{name:"Email or Phone Number"}).fill(email);
        await this.page.getByRole("textbox",{name:"Password"}).fill(password);
        await this.page.getByRole("button",{name:"Login →"}).click();
    }
}
