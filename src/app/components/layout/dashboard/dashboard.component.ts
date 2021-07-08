import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Instructor } from 'src/app/interfaces/instructor';
import { Usuario } from 'src/app/interfaces/usuario';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public usuario: Usuario;
  public instructor: Instructor;
  public cursos: Array<any>;

  public barChartOption: any;
  public lineChartOption: any;

  public bigTotal: number = 0;

  constructor(
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private datePipe: DatePipe
  ) {
    this.cursos = new Array<any>();
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.instructor = this.usuario.instructor

    this.inscripcionesService.getAllInscripciones().subscribe(
      response => {
        const xAxisData = []
        const data = []
        response.forEach(curso => {
          xAxisData.push(curso.nombre.toUpperCase())
          data.push(curso.inscriptos)
        });

        this.barChartOption = {
          legend: {
            data: ['bar'],
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            data: xAxisData,
            width: '30%'
          },
          yAxis: {
            type: 'value',
          },
          series: {
            name: 'Inscripciones',
            type: 'bar',
            data: data,
            barWidth: '20%',
            animationDelay: (idx) => idx * 10,
          },
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx) => idx * 5,
        }
      }
      
    )


    this.inscripcionesService.getInscripcionesFechas().subscribe(
      response => {

        let xAxisData = []
        const series = []
        response.forEach(curso => {
          var datoSerie = {
            name: curso.nombre,
            type: 'line',
            data: [],
            animationDelay: (idx) => idx * 10,
          }
          curso.inscripciones.forEach(c => {
            xAxisData.push(this.datePipe.transform(c.fecha,"dd/MM/yyyy"))
          })
          xAxisData = this.unique(xAxisData);
        
          series.push(datoSerie)
        });
        
        var index = 0;
        response.forEach(curso => {

          let arr = []
          xAxisData.forEach(fecha=>{
            let band = false
            curso.inscripciones.some(e=>{
              if(this.datePipe.transform(e.fecha,"dd/MM/yyyy") === fecha){
                band = true
                arr.push(e.cantidad)
              }
            })
            if(!band){
              arr.push(0)
            }
          })
          series[index].data=arr
          index++
        })

        this.lineChartOption = {
          legend: {
            data: ['line'],
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            data: xAxisData,
            width: '30%'
          },
          yAxis: {
            type: 'value',
          },
          series: series,
          animationEasing: 'elasticOut',
          animationDelayUpdate: (idx) => idx * 5,
        }
        
      }
    )

    this.cursosService.getCursosPagos().subscribe(
      response => {
        this.cursos = response
        this.cursos.forEach(
          curso => {
            this.bigTotal += Number(curso.total)
          }
        )
      }
    )

  }

  unique(data):any{
    const dataArr = new Set(data);

    return [...dataArr];
  }

}
