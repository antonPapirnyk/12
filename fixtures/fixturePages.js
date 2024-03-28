import { HomePage } from "../pages/candidate/home/HomePage"
import {test as base } from '@playwright/test'
import { SignUpPage } from "../pages/candidate/auth/SignUpPage"
import { LoginPage } from "../pages/candidate/auth/LoginPage"

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