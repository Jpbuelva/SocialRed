export interface Mypost {
    titlePost: string;
    contentPost: string;
    imagePost?: any;
    id?: string;
    tagsPost: string;
    fileRef?: string;
    idUser:string;
    userName:string;
}

export interface Commentary {
    id?: string;
    idPost:string;
    commentary?: string;
    userid?: string;
    nameUse?: any;    
}