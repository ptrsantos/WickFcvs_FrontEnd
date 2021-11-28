import { MatTableDataSource } from "@angular/material/table";
import { ArtigoDataTable } from "./artigoDataTable";

export interface TemaDataTable {
  id: string;
  titulo: string;
  dataUltimaEdicao: string
  autorUltimaEdicao: string
  artigos?: ArtigoDataTable[] | MatTableDataSource<ArtigoDataTable>;
}
