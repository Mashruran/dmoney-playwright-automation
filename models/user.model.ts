export enum Role{
    Admin="Admin",
    Agent="Agent",
    Customer="Customer",
    Merchant="Merchant"
}

export interface UserModel{ //object time declare through interface
    fullName:string,
    email:string,
    password:string,
    phoneNumber:string,
    nid:string,
    role:Role 
}