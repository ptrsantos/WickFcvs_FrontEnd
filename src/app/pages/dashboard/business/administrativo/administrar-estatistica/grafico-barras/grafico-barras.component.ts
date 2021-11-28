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

    let totalUsuarios = {
      data: listaEstatiscaUsuario.map((item) => item.total),
      label: 'usuarios',
      borderColor: "#FF0000",
      backgroundColor: "#FF0000",
    };
    this.barChartData.push(totalUsuarios);

    let totalArtigos = {
      data: listaEstatiscaArtigo.map((item) => item.total),
      label: 'artigos',
      borderColor: "#0000ff",
      backgroundColor: "#0000ff",
    };
    this.barChartData.push(totalArtigos);

    let totalEdicoes = {
      data: listaEstatiscaEdicao.map((item) => item.total),
      label: 'edições',
      borderColor: "#008000",
      backgroundColor: "#008000",
    };

    this.barChartData.push(totalEdicoes);

    // this.lineChartData.shift()

    let arraylabel = listaEstatiscaUsuario.map((item) => item.mesLiteral);

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
