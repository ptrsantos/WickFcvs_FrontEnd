import { Artigo } from "./artigo"

export class Tema {
    id: string
    titulo: string
    artigos: Array<Artigo>
    autorId: string
    
    // constructor(data: Partial<Tema>){
    //     Object.assign(this, data)
    // }
}