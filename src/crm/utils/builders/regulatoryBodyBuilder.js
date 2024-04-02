export class RegulatoryBodyBuilder{
    regBody = {
        url: "https://example.com.ua"
    }
    setName(name){
        this.regBody.name = name
        return this
    }
    setStatus(status){
        this.regBody.status = status;
        return this
    }
    setValidationFormat(validationFormat){
        this.regBody.validationFormat = validationFormat;
        return this
    }
    build(){
        return this.regBody
    }
}