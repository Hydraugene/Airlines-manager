export interface CompagnieI {

}

export interface AvionI {
    type:string;
    modele:string;
    capacite:number;
    autonomie?:number;
    code:string|number;
}

export interface PersonnelI{
    nom:string;
    prenom:string;
    habilitation:HabilitationsE;
}

export interface VolI{
    code:string;
    avion:AvionI;
    date:Date;
    personnel:Array<PersonnelI>;
    aeroportDepart:string;
    aeroportArrive:string;
    duree:number;
}

export interface CoordoneeI{
    lat:number;
    lng:number;
}



enum HabilitationsE{
    pilote = 'Pilote',
    copilote = 'Pilote',
    pnc = 'PNC' //personnel de cabine, aka stewart et hotesse
}

