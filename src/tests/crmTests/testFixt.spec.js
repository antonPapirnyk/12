import {testik} from "../../crm/fixtures/prepareClientsData"
import {expect} from "@playwright/test"

//import { AppCRM } from "../../crm/pages/applicationCRM"


testik.describe("desc", ()=>{
    testik("1 mazafaka", async({page, test})=>{
    
        console.log(1)
     })
     testik("2 mazafaka", async({page, test})=>{
         
         console.log(2)
      })
})

