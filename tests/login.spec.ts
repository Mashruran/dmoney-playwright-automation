import { test, expect, Page} from '@playwright/test';

let page:Page;

test.beforeAll(async({browser})=>{
    page = await browser.newPage();
});
test.afterAll(async ()=>{
    await page.close();
})

test("Admin can login successfully", async()=>{
    await page.goto("https://dmoneyportal.roadtocareer.net/login");
    await page.getByRole("textbox",{name:"Email or Phone Number"}).fill("admin@dmoney.com");
    await page.getByRole("textbox",{name:"Password"}).fill("1234");
    await page.getByRole("button",{name:"Login →"}).click();
    await expect(page.getByRole('banner')).toContainText('Admin Dashboard');

    const headerText = await page.getByText("Admin Dashboard").textContent(); // String return
    expect (headerText).toContain("Admin Dashboard");

    await expect (page.getByText("Admin Dashboard")).toContainText("Admin Dashboard"); // Element return

})

test.skip("Search by user ID", async()=>{
    await page.getByRole("link",{name:"User List"}).click();
    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'All Users' }).press('ArrowDown');
    await page.getByRole('option', { name: 'Search by ID' }).press('Enter');
    await page.getByRole('textbox',{name:"Enter User ID"}).click();
    await page.getByRole('textbox',{name:"Enter User ID"}).fill("103378");
    // await page.waitForTimeout(1000)
    await page.getByRole('button',{name:"SEARCH"}).click();
    await page.getByRole('button',{name:"View"}).click();

    await expect(page).toHaveURL(/.*\/users\/103378\/?/);

    await page.pause();
})

test("Create new user",async()=>{
    await page.getByRole('link',{name:'Create User'}).click();
    await page.getByRole('textbox',{name:'Name'}).fill("Test customer 001");
    await page.getByRole('textbox',{name:'Email'}).fill("test.cus001@gmail.com");
    await page.getByRole('textbox',{name:'Password'}).fill("1234");
    await page.getByRole('textbox',{name:'Phone Number'}).fill("01234567890");
    await page.getByRole('textbox',{name:'NID'}).fill("123456789");
    await page.getByRole("combobox",{exact:true}).click();
    // await page.locator('.MuiOutlinedInput-notchedOutline').nth(0).press("ArrowDown");
    // await page.locator('.MuiOutlinedInput-notchedOutline').nth(0).press("ArrowDown");
    // await page.locator('.MuiOutlinedInput-notchedOutline').nth(0).press("Enter");
    // await page.locator("ul > li").nth(2).click();
    await page.getByRole("option").nth(2).click();
    await page.getByRole('button',{name:"Create User"}).click();
    await page.pause();

})