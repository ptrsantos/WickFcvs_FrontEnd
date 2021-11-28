import { Component, Inject, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { DexieService } from 'src/app/utils/dexieService/dexieService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { TemaDto } from '../../../model/dtos/temaDto';
import { ArtigoExibicaoDto } from '../../../model/dtos/artigoExibicaoDto';
import { VinculoTituloViewModel } from '../../../model/view-models/vinculoTituloViewModel';
import { DashboardService } from 'src/app/pages/dashboard/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from 'src/app/pages/layout/layout.component';

@Component({
  selector: 'app-edicao-vinculo',
  templateUrl: './edicao-vinculo.component.html',
  styleUrls: ['./edicao-vinculo.component.scss'],
})
export class EdicaoVinculoComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  temaInicial: TemaDto;
  temaSecundario: TemaDto;
  listaTemasPrimarios: TemaDto[] = [];
  listaTemasSecundarios: TemaDto[] = [];
  listaArtigosPrimarios: ArtigoExibicaoDto[];
  listaArtigosSecundarios: ArtigoExibicaoDto[];
  tituloTemaIncial: string = '';
  tituloTemaSecundario = 'Nenhum Tema Selecionado';
  tituloArtigoSecundario = 'Nenhum Tema Selecionado';
  arrayTituloArtigosPrimarios: string[] = [];
  arrayTituloArtigosSecundarios: string[] = [];
  erros: any[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private dexieService: DexieService,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private dashboardService: DashboardService,
    private toastrService: ToastrService,
    @Inject(LayoutComponent) private appLayoutComponent: LayoutComponent
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.dexieService.tabelaTemasDto
      .toArray()
      .then((temas) => {
        let listaTemasAux = temas;
        let temaAux = listaTemasAux.filter((tema) => tema.id == id);
        this.temaInicial = temaAux[0];
        this.tituloTemaIncial = this.temaInicial.titulo;
        this.listaArtigosPrimarios = this.temaInicial.artigos;
        this.listaTemasSecundarios = listaTemasAux.filter(
          (tema) => tema.id != id
        );
        this.arrayTituloArtigosPrimarios = this.listaArtigosPrimarios.map(
          (artigo) => artigo.titulo
        );
      })
      .catch((error) => (error));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.listaArtigosSecundarios != undefined) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }

      this.mapearArrayParaLista(
        this.arrayTituloArtigosPrimarios,
        this.arrayTituloArtigosSecundarios
      );

    } else {
      this.openSnackBar();
    }
  }

  mapearArrayParaLista(arrayInicial: string[], arraySecundario: string[]) {
    let listaPrimaria: ArtigoExibicaoDto[] = [];
    let listaSecundaria: ArtigoExibicaoDto[] = [];
    let listaArtigosTotais: ArtigoExibicaoDto[] =
    this.listaArtigosPrimarios.concat(this.listaArtigosSecundarios);

    if (arrayInicial.length > 0) {
      listaArtigosTotais.forEach((artigo) => {
        arrayInicial.forEach((titulo) => {
          if (artigo.titulo == titulo) {
            listaPrimaria.push(artigo);
          }
        });
      });
    }

    this.temaInicial.artigos = [];
    this.temaInicial.artigos = listaPrimaria;

    if (arraySecundario.length > 0) {
      listaArtigosTotais.forEach((artigo) => {
        arraySecundario.forEach((titulo) => {
          if (artigo.titulo == titulo) {
            listaSecundaria.push(artigo);
          }
        });
      });
    }

    this.temaSecundario.artigos = [];
    this.temaSecundario.artigos = listaSecundaria;
  }

  onChangeSelect(item) {
    let temaAux = this.listaTemasSecundarios.filter(
      (tema) => tema.id == item.value
    );
    this.temaSecundario = temaAux[0];
    this.tituloTemaSecundario = this.temaSecundario.titulo;
    this.listaArtigosSecundarios = [];
    this.listaArtigosSecundarios = this.temaSecundario.artigos;
    this.arrayTituloArtigosSecundarios = this.listaArtigosSecundarios.map(
      (artigo) => artigo.titulo
    );
  }

  openSnackBar() {
    let message = 'Selecione um tema na caixa de seleção';
    let action = 'Atenção!';
    this.snackBar.open(message, action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 4 * 1000,
    });
  }

  cancelar() {
    this.spinnerService.show();
    this.router.navigate([`/wiki/administrar-conteudo`]);
  }

  salvarEdicaoVinculo() {
    if (this.listaArtigosSecundarios != undefined) {

      this.spinnerService.show();
      let vinculoModel: VinculoTituloViewModel = {
        temaInicial: this.temaInicial,
        temaSecundario: this.temaSecundario
      };

      this.salvarEdicaoVinculoBackEnd(vinculoModel)

    } else {
      this.openSnackBar();
    }
  }

  salvarEdicaoVinculoBackEnd(vinculoModel: VinculoTituloViewModel) {
    this.dashboardService.salvarEdicaoVinculo(vinculoModel).subscribe(
      sucesso => {this.processarSucesso(sucesso)},
      falha => {this.processarFalha(falha)}
    );
  }

  processarSucesso(response) {

    this.erros = [];
    let toastr = this.toastrService.success("Operação realizado com sucesso.", "Parabéns: ")
    if (toastr) {
      let listaTemasAux = response.data.listaTemas.map(item =>  Object.assign({}, new TemaDto(), item));
      let listaTemas = listaTemasAux.sort((a, b) => a.titulo.localeCompare(b.titulo))
      this.dexieService.salvarTemasDto(listaTemas).then(() => {
        this.appLayoutComponent.listaTemas = null;
        this.appLayoutComponent.listaTemas = listaTemas;
        this.appLayoutComponent.preencherNavTemas();
        this.router.navigate([`/wiki/administrar-conteudo`]).then();
      })

    }
  }

  processarFalha(fails: any) {
    if(fails.status){
      this.toastrService.error(fails.message.toString(), "Ocorreu um erro:")
    }else{
      this.erros = fails.error.errors;
      this.toastrService.error(this.erros.toString(), "Ocorreu um erro:")
    }
  }

}
