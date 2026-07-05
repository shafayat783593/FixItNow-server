
export interface RegisterUserPayload {
    name: string,
    email: string,
    password: string,
    phone?:string
}

export interface ILogin{
    email: string,
    password:string
}