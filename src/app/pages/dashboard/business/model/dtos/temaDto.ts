import { MatTableDataSource } from "@angular/material/table"
import { ArtigoExibicaoDto } from "./artigoExibicaoDto"

export class TemaDto {
    id: string
    titulo: string
    dataUltimaEdicao: string
    autorUltimaEdicao: string
    artigos: Array<ArtigoExibicaoDto>;
    autorId: string
    artigosDataTable: Array<ArtigoExibicaoDto> | MatTableDataSource<ArtigoExibicaoDto>;

    // constructor(data: Partial<Tema>){
    //     Object.assign(this, data)
    // }
}
