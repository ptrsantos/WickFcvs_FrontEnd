import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesTotalDto } from '../../../model/dtos/mesTotalDto';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.scss']
})
export class GraficoBarrasComponent implements OnInit {

  chart: Chart;
  name = 'Angular 5 chartjs';
  @ViewChild('canvas') canvas: ElementRef;

  barChartData: Array<any> = [];
  barChartLabels: Array<any> = [];

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  mapearDadosEstatisticos(listaEstatiscaUsuario: MesTotalDto[], listaEstatiscaArtigo: MesTotalDto[], listaEstatiscaEdicao: MesTotalDto[]) {

    let listaEstatiscaUsuarioOrdenada = listaEstatiscaUsuario.sort((a, b) => a.dataRegistro < b.dataRegistro ? -1 : a.dataRegistro > b.dataRegistro ? 1: 0)

    let totalUsuarios = {
      data: listaEstatiscaUsuarioOrdenada.map((item) => item.total),
      label: 'usuarios',
      borderColor: "#008000",
      backgroundColor: "#008000",
    };
    this.barChartData.push(totalUsuarios);

    let listaEstatiscaArtigoOrdenada = listaEstatiscaArtigo.sort((a, b) => a.dataRegistro < b.dataRegistro ? -1 : a.dataRegistro > b.dataRegistro ? 1: 0)
    console.log(listaEstatiscaArtigoOrdenada)
    let totalArtigos = {
      data: listaEstatiscaArtigoOrdenada.map((item) => item.total),
      label: 'artigos',
      borderColor: "#0000ff",
      backgroundColor: "#0000ff",
    };
    this.barChartData.push(totalArtigos);

    let listaEstatiscaEdicaoOrdenada = listaEstatiscaEdicao.sort((a, b) => a.dataRegistro < b.dataRegistro ? -1 : a.dataRegistro > b.dataRegistro ? 1: 0)
    let totalEdicoes = {
      data: listaEstatiscaEdicaoOrdenada.map((item) => item.total),
      label: 'edições',
      borderColor: "#FF0000",
      backgroundColor: "#FF0000",
    };

    this.barChartData.push(totalEdicoes);

    let arraylabel = listaEstatiscaUsuarioOrdenada.map((item) => item.mesLiteral + "/" + item.dataRegistro.toString().substring(0, 4));

    this.barChartLabels = arraylabel;

    (this.canvas)
    let ctx = this.canvas.nativeElement

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
      },

    });

    this.spinnerService.hide();
  }

}
