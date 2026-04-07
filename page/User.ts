import { Page } from "@playwright/test";
import { UserModel } from "../models/user.model";

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

    async createUser(userModel:UserModel){
        await this.page.getByRole('link',{name:'Create User'}).click();
        await this.page.getByRole('textbox',{name:'Name'}).fill(userModel.fullName);
        await this.page.getByRole('textbox',{name:'Email'}).fill(userModel.email);
        await this.page.getByRole('textbox',{name:'Password'}).fill(userModel.password);
        await this.page.getByRole('textbox',{name:'Phone Number'}).fill(userModel.phoneNumber);
        await this.page.getByRole('textbox',{name:'NID'}).fill(userModel.nid);
        await this.page.getByRole("combobox",{exact:true}).click();
        await this.page.getByRole("option",{name:userModel.role}).click();
        await this.page.getByRole('button',{name:"Create User"}).click();
    }
} 
