import { HomePage } from "../pages/HomePage"
import {test as base } from '@playwright/test'
import { SignUpPage } from "../pages/SignUpPage"
import { LoginPage } from "../pages/LoginPage"

export const test = base.extend({
    homePage: async({page}, use)=>{
        const homePage  = new HomePage(page)
        await use(homePage)
    },
    loginPage: async({page}, use)=>{
        const loginPage  = new LoginPage(page)
        await use(loginPage)
    },
    signUpPage: async({page}, use)=>{
        const signUpPage  = new SignUpPage(page)
        await use(signUpPage)
    }
})