import { Page } from "@playwright/test";

export class User{
    constructor(private page:Page){}
    
    async searchUser(userId:string){
        await this.page.getByRole("link",{name:"User List"}).click();
        await this.page.getByRole('combobox').first().click();
        await this.page.getByRole('option', { name: 'All Users' }).press('ArrowDown');
        await this.page.getByRole('option', { name: 'Search by ID' }).press('Enter');
        await this.page.getByRole('textbox',{name:"Enter User ID"}).click();
        await this.page.getByRole('textbox',{name:"Enter User ID"}).fill(userId);
        await this.page.getByRole('button',{name:"SEARCH"}).click();
        await this.page.getByRole('button',{name:"View"}).click();
    }

    async createUser(name:string,email:string,password:string,phoneNumber:string,nid:string, role:string){
        await this.page.getByRole('link',{name:'Create User'}).click();
        await this.page.getByRole('textbox',{name:'Name'}).fill(name);
        await this.page.getByRole('textbox',{name:'Email'}).fill(email);
        await this.page.getByRole('textbox',{name:'Password'}).fill(password);
        await this.page.getByRole('textbox',{name:'Phone Number'}).fill(phoneNumber);
        await this.page.getByRole('textbox',{name:'NID'}).fill(nid);
        await this.page.getByRole("combobox",{exact:true}).click();
        await this.page.getByRole("option",{name:role}).click();
        await this.page.getByRole('button',{name:"Create User"}).click();
    }
}
