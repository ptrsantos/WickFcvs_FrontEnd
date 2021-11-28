import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataChartService } from '../../../services/data-chart.service';
import { MesTotalDto } from '../../model/dtos/mesTotalDto';
import { EstatisticaViewModel } from '../../model/view-models/estatisticaViewModel';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { GraficoLinhasComponent } from './grafico-linhas/grafico-linhas.component';


@Component({
  selector: 'app-administrar-estatistica',
  templateUrl: './administrar-estatistica.component.html',
  styleUrls: ['./administrar-estatistica.component.scss']
})
export class AdministrarEstatisticaComponent implements OnInit {

  @ViewChild('graficoLinha') graficoLinha: GraficoLinhasComponent
  @ViewChild('graficoBarra') graficoBarra: GraficoBarrasComponent
  dadosEstitsticos: EstatisticaViewModel
  estaticasArtigos: MesTotalDto[] = [];

  constructor(private dataChartService: DataChartService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show()
    this.listarDadosEstatisticos();
  }

  listarDadosEstatisticos(){
    this.dataChartService.lisatarDadosEstatisticos().subscribe(response => {
       this.graficoLinha.mapearDadosEstatisticos(response.data.listaEstatisticaUsuarios, response.data.listaEstatisticaArtigos, response.data.listaEstatisticaEdicoes)
      this.graficoBarra.mapearDadosEstatisticos(response.data.listaEstatisticaUsuarios, response.data.listaEstatisticaArtigos, response.data.listaEstatisticaEdicoes)

    })
  }



}
