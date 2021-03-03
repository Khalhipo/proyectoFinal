import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EjercicioEtto, EjercicioEttoMostrar, EjercicioLista } from 'src/app/interfaces/ejercicio';
import { Entrenamiento } from 'src/app/interfaces/entrenamiento';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})
export class WorkoutCreateComponent implements OnInit {

  @Input() fecha: {day:"",month:"",year:""};

  constructor(private entrenamientoService: EntrenamientoService, private irHacia: Router) { }

  listaEjercicios: EjercicioLista[] = [];
  listaEjerciciosMostrar: EjercicioLista[] = [];
  ejerciciosETTO: EjercicioEttoMostrar[] = [];

  categorias: string[] = [];
  categoria: string;

  ejercicio: string;
  id_ejercicio: EjercicioLista[] = [];
  series: number = null;
  repeticiones: number = null;
  peso: number = null;

  comentario: string;
  pesoCorporal: number;

  entrenamiento: Entrenamiento;

  mensaje: string = '';

  ngOnInit(): void {
    this.listarEjercicios();
  }

  listarEjercicios(): void {
    this.entrenamientoService.listarEjercicios().subscribe(
      respuesta => {
        console.log(respuesta);
        this.listaEjercicios = respuesta;
        this.categorias = this.listaEjercicios.map(el=>el.categoria);
        this.categorias = [...new Set(this.categorias)];
        this.listaEjerciciosMostrar = this.listaEjercicios.filter(el=> el.categoria == this.categorias[0]);

      },
      error => {
        console.log(error),
        this.mensaje = error.error.error
      }
    )
  }

  addEjercicio(): void {
  if(this.series != null && this.repeticiones != null){
    this.id_ejercicio = this.listaEjercicios.filter(el=>el.nombre == this.ejercicio);
    this.ejerciciosETTO.push({id_ejercicio: this.id_ejercicio[0].id,nombre: this.ejercicio, categoria: this.categoria, series: this.series,repeticiones: this.repeticiones, peso: this.peso});
    this.series = null;
    this.repeticiones = null;
    this.peso = null;
  }
  }

  borrarEjercicio(ej: EjercicioEttoMostrar): void {
    this.ejerciciosETTO = this.ejerciciosETTO.filter(el=> el != ej);
  }

  filtrarCategoria(e): void {
    this.listaEjerciciosMostrar = this.listaEjercicios.filter(el=> el.categoria == e.target.value);
  }

  crearEtto(): void {
    this.entrenamiento = {
      fecha: this.fecha.year + "-" + this.fecha.month + "-" + this.fecha.day,
      comentario: this.comentario?this.comentario:null,
      pesoCorporal: this.pesoCorporal?this.pesoCorporal:null,
      ejercicios: this.ejerciciosETTO
    }
    this.entrenamientoService.crearEtto(this.entrenamiento).subscribe(
      respuesta => {
        console.log(respuesta);
        this.irHacia.navigate(['/home']);
        
      }
    )

  }

}
