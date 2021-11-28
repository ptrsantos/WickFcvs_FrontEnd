import { Edicao } from './edicao';

export class Artigo {
    id: string;
    titulo: string;
    conteudo: string;
    edicoes: Edicao[];
    // constructor(data: Partial<Artigo>){
    //     Object.assign(this, data)
    // }
}