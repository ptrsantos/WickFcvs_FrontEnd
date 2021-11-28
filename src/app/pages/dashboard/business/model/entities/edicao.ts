export class Edicao {
    id: string;
    titulo: string;
    conteudo: string;
    autorId: string;
    data: Date

    constructor(){}

    // constructor(data: Partial<Edicao>){
    //     Object.assign(this, data)
    // }
}