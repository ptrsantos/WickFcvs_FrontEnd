import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, toArray } from 'rxjs/operators';
import { DexieService } from 'src/app/utils/dexieService/dexieService';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.scss']
})
export class TemaComponent implements OnInit {

  // options: string[] = ['Recursos Humanos', 'Análise', 'Preparo', "Análise documental"]
  // objectOptions = [
  //   {name: 'Recursos Humanos'},
  //   {name: 'Análise documental'},
  //   {name: 'Jurídico'},
  //   {name: 'Preparo'},
  // ]
  options: string[] = [];
  temaFormControl = new FormControl();
  filteredOptions: Observable<string[]>

  constructor(private dexieService: DexieService) { }

  ngOnInit(): void {
    // this.dexieService.tabelaTemas.toArray().then( retorno => {
     //   retorno.forEach(element => {
    //     (element.titulo)
    //   });
    // })

    //this.dexieService.tabelaTemas.each( retorno => {
    this.dexieService.tabelaTemasDto.each( retorno => {
      this.options.push(retorno.titulo);
    })
    .catch(error => (error))
    .finally(() => this.inicializarFiltro());

  }


  private inicializarFiltro(){
    this.filteredOptions = this.temaFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
  }

  private _filter(value: string): any{
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue))
    // let retornoOptions: any = this.objectOptions.filter(option => option.name.toLowerCase().includes(value))
    // return retornoOptions;
  }

  displayName(subject){
    return subject ? subject.name : undefined
  }


}
