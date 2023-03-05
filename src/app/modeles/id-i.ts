export interface IdI {
    id:string;
    passe:string;
    //uid:string |number;
}

export interface UserI {
    uid:string | number;
    nom: string;
    prenom?:string;
    status: "user" | "admin";
}
