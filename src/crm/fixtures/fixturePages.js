import {test as base } from '@playwright/test'
import { CrmLoginPage } from "../pages/crmLoginPage"

export const test = base.extend({
    crmLoginPage: async({page}, use)=>{
        const crmLoginPage  = new CrmLoginPage(page)
        await use(crmLoginPage)
    }
})