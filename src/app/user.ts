export interface User{
    id: number;
    username: string;
    password: string;
    email: string;
    avatar: string;
    roles: Role[];
}

export interface Role{
    id: number;
    name: string;
}

export enum ERole {
    ROLE_USER = "ROLE_USER",
    ROLE_MODERATOR = "ROLE_MODERATOR",
    ROLE_ADMIN = "ROLE_ADMIN"
}
    

