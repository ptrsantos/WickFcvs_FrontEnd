import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { MesTotalDto } from '../../../model/dtos/mesTotalDto';
import { DataChartService } from '../../../../services/data-chart.service';

@Component({
  selector: 'app-grafico-linhas',
  templateUrl: './grafico-linhas.component.html',
  styleUrls: ['./grafico-linhas.component.scss']
})
export class GraficoLinhasComponent implements OnInit {

  chart: Chart;
  name = 'Angular 5 chartjs';
  @ViewChild('canvas') canvas: ElementRef;

  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];

  constructor(private dataChartService: DataChartService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }


  mapearDadosEstatisticos(listaEstatiscaUsuario: MesTotalDto[], listaEstatiscaArtigo: MesTotalDto[], listaEstatiscaEdicao: MesTotalDto[]) {

    let totalUsuarios = {
      data: listaEstatiscaUsuario.map((item) => item.total),
      label: 'usuarios',
      borderColor: "#008000",
      backgroundColor: "#d3f8d3",
    };
    this.lineChartData.push(totalUsuarios);

    let totalArtigos = {
      data: listaEstatiscaArtigo.map((item) => item.total),
      label: 'artigos',
      borderColor: "#0000ff",
      backgroundColor: "#d8ecf3",
    };
    this.lineChartData.push(totalArtigos);

    let totalEdicoes = {
      data: listaEstatiscaEdicao.map((item) => item.total),
      label: 'edições',
      borderColor: "#FF0000",
      backgroundColor: "#ffd4cc",

    };

    this.lineChartData.push(totalEdicoes);

    let arraylabel = listaEstatiscaUsuario.map((item) => item.mesLiteral);

    this.lineChartLabels = arraylabel;

    (this.canvas)
    let ctx = this.canvas.nativeElement

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData
      },
      options: {
        title: {
          display: false,
          text: 'Color test'
        },
        legend: {
          position: 'top',
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 11
          }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        },

      }
    });


  }



}
