export interface Register{
    email:any,
    firstName:string,
    lastName:string,
    username:string,
    password:string,
}

export interface Login{
    username:any,
    password:string,
}

export interface Reset{
    password:string,
    email:string
}

export interface Forget{
    email:any
}