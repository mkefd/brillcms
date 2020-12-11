import { remote } from 'webdriverio'
import dotenv from 'dotenv'

dotenv.config()

let browser

;(async () => {
    browser = await remote({
        capabilities: {
            browserName: 'chrome'
            // browserName: 'firefox',
            // // 'moz:firefoxOptions': {
            // //     binary: '/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox'
            // // }
        }
    })

    await browser.navigateTo('http://brillcms.com/lb/security/login.aspx?ReturnUrl=%2flb%2f')

    const header = await browser.$('#header')
    await header.click()

    const userInput = await browser.$('#ctl00_ContentPlaceHolder1_Login1_UserName')
    await userInput.setValue(process.env.BRILLCMS_USER)

    const passwordInput = await browser.$('#ctl00_ContentPlaceHolder1_Login1_Password')
    await passwordInput.setValue(process.env.BRILLCMS_PASSWORD)

    const loginBtn = await browser.$('#ctl00_ContentPlaceHolder1_Login1_LoginButton')
    await loginBtn.click()

    const searchLink = await browser.$('#ctl00_lnkSearch')
    await searchLink.click()

    const sInput = await browser.$('#ctl00_ContentPlaceHolder1_GeneralSearch_FieldSelectionGridView_ctl05_TextBoxFieldSelection')
    await sInput.setValue('Acta linguistica petropolitana Trudy Instituta lingvisticeskich issledovanij (ALP)')

    const sb = await browser.$('#ctl00_ContentPlaceHolder1_ButtonSearchAll')
    await sb.click()

    const r = await browser.$('#ctl00_ContentPlaceHolder1_gvRecords_ctl03_lnkDocManagement')
    await r.click()

    const c = await browser.$('#copyFicheCommandButton')
    await c.click()

    browser.switchToFrame(0)

    const b = await browser.$('body')
    await b.click()

    const i = await browser.$('#InsertMenuButton')
    await i.click()

    const a = await browser.$('strong=ABSTRACT')
    await a.click()

    // await browser.deleteSession()
})().catch((err) => {
    console.error(err)
    // return browser.deleteSession()
})
