import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.scss']
})
export class ArtigoComponent implements OnInit {

  options: string[] = [];
  tituloArtigoFormControl = new FormControl();
  descricaoArtigoFormControl = new FormControl();
  tituloFilteredOptions: Observable<string[]>
  descricaoFilteredOptions: Observable<string[]>
  @Output() eventoExibirEditor  = new EventEmitter() 

  constructor() { }

  ngOnInit(): void {
    this.tituloFilteredOptions = this.tituloArtigoFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )

    // this.descricaoFilteredOptions = this.tituloArtigoFormControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // )
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

  exibirEditor(){
    
    this.eventoExibirEditor.emit();
  }

}
