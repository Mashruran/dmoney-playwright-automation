import fs from 'fs'
import { json } from 'stream/consumers';
import { UserModel } from '../models/user.model';
import { User } from '../page/User';

export function generateRandomNumber(min:number,max:number):number{
    const randomNumber= Math.random()*(max-min)+min;
    return Math.floor(randomNumber)
}

export function saveJsonData(jsonObject:object,fileUrl:string):void{
    let dataArray:object[]=[]
    if(fs.existsSync(fileUrl)){
        const fileContent=fs.readFileSync(fileUrl,"utf-8") //read JSON  
        dataArray=JSON.parse(fileContent);
    }
    dataArray.push(jsonObject)
    fs.writeFileSync(fileUrl,JSON.stringify(dataArray,null,2))

}
export function getLastUser(fileUrl:string):UserModel{
    const fileContent=fs.readFileSync(fileUrl,"utf-8")
    let dataArray=JSON.parse(fileContent)
    return dataArray[dataArray.length-1]
}