import { remote } from 'webdriverio'
import dotenv from 'dotenv'

dotenv.config()

let browser

;

async function login() {
    const header = await browser.$('#header')
    await header.click()

    const userInput = await browser.$('#ctl00_ContentPlaceHolder1_Login1_UserName')
    await userInput.setValue(process.env.BRILLCMS_USER)

    const passwordInput = await browser.$('#ctl00_ContentPlaceHolder1_Login1_Password')
    await passwordInput.setValue(process.env.BRILLCMS_PASSWORD)

    const loginBtn = await browser.$('#ctl00_ContentPlaceHolder1_Login1_LoginButton')
    await loginBtn.click()

    await browser.navigateTo('http://brillcms.com/lb')
    browser.switchToFrame(2)
}

async function searchAndClickFirst(searchString) {
    const searchLink = await browser.$('#ctl00_lnkSearch')
    await searchLink.click()

    const sInput = await browser.$('#ctl00_ContentPlaceHolder1_GeneralSearch_FieldSelectionGridView_ctl05_TextBoxFieldSelection')
    await sInput.setValue(searchString)

    const sb = await browser.$('#ctl00_ContentPlaceHolder1_ButtonSearchAll')
    await sb.click()

    const r = await browser.$('#ctl00_ContentPlaceHolder1_gvRecords_ctl03_lnkDocManagement')
    await r.click()
}

async function prepareCopy(pause) {
    await browser.pause(pause)

    await browser.switchToFrame(null)
    // console.log(browser.getPageSource())

    await browser.switchToFrame(1)
    // console.log(browser.getPageSource())
}

async function copy() {
    const c = await browser.$('#copyFicheCommandButton')
    await c.click()
}

async function prepareEdit() {
    const b = await browser.$('body')
    await b.click()
}

async function clickMenuItem(item) {
    let el = await browser.$('#InsertMenuButton')
    await el.click()
    el = await browser.$('.menu')
    let el1 = await el.$('strong=' + item)
    await el1.click()
}

(async () => {
    browser = await remote({
        capabilities: {
            browserName: 'chrome'
        }
    })

    await browser.navigateTo('http://brillcms.com/lb/security/login.aspx?ReturnUrl=%2flb%2f')

    await login();
    await searchAndClickFirst('Acta linguistica petropolitana Trudy Instituta lingvisticeskich issledovanij (ALP)');

    await prepareCopy(3000);
    await copy();

    await prepareEdit();
    await clickMenuItem('ABSTRACT');
    await clickMenuItem('KW');
    await clickMenuItem('ORIGNAME');

    // await browser.deleteSession()
})().catch((err) => {
    console.error(err)
    // return browser.deleteSession()
})
