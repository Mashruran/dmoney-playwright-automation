import { test, expect, Page} from '@playwright/test';
import { LoginPage } from '../page/login';
import { User } from '../page/User';

let page:Page;

test.beforeAll(async({browser})=>{
    page = await browser.newPage();
});
test.afterAll(async ()=>{
    await page.close();
})

test("Admin can login successfully", async()=>{
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
    user.searchUser("103384")
    // await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/.*\/users\/103384\/?/);
})

test("Create new user",async()=>{
    const user=new User(page);
    await user.createUser("Test customer 002","test.cus002@gmail.com", "1234", "01234567891", "123456789","Customer")
})