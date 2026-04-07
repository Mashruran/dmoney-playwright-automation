import { test, expect, Page} from '@playwright/test';
import { LoginPage } from '../page/login';
import { User } from '../page/User';
import { Role, UserModel } from '../models/user.model';
import {faker} from '@faker-js/faker'
import {generateRandomNumber,saveJsonData} from "../utils/utils"

let page:Page;

test.beforeAll(async({browser})=>{
    page = await browser.newPage();
});
test.afterAll(async ()=>{
    await page.close();
})
test.describe.serial(async()=>{
    test("Admin can login successfully",{tag:"@smoke"}, async()=>{
    await page.goto("https://dmoneyportal.roadtocareer.net/login");
    const login = new LoginPage(page)
    await login.userLogin("admin@dmoney.com","1234")

    await expect(page.getByRole('banner')).toContainText('Admin Dashboard');

    const headerText = await page.getByText("Admin Dashboard").textContent(); // String return
    expect (headerText).toContain("Admin Dashboard");

    await expect (page.getByText("Admin Dashboard")).toContainText("Admin Dashboard"); // Element return
    
})

test("Search by user ID", async()=>{
    const user=new User(page);
    user.searchUser("103383")
    // await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/.*\/users\/103383\/?/);
})

test("Create new user",{tag:"@smoke"},async()=>{
    const user=new User(page);
    const userData:UserModel={
        fullName:faker.person.fullName(),
        email:`matata.ext+${generateRandomNumber(1000,9999)}@gmail.com`,
        password:"1234",
        phoneNumber:`0120${generateRandomNumber(1000000,9999999)}`,
        nid:"123456789",
        role:Role.Customer
    }
    await user.createUser(userData)
    saveJsonData(userData,'resources/users.json')
})
})


