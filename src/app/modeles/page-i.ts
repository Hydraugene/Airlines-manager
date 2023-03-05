export interface PageI {
    titre:string
    contenu?:string
}

export interface ProfilI{
    titre:string;
    prenom:string;
    status:string;
    contenu?: string;
}

export interface ContenusI{
    mentions:PageI;
    profil:ProfilI;
}
