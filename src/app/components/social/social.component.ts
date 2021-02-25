import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Mensaje } from 'src/app/models/mensaje';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  mensaje: string = '';
  mensajeEnviado: Mensaje = new Mensaje();
  temporizador: any = null;

  constructor(private userService: UserService, private servicioMensaje: MensajesService) { }

  userSelected: User = null;
  users: User[] = [];
  friendsUser: User[] = [];
  busqueda: string = '';
  infoUser: boolean = false;

  ngOnInit(): void {
  }

  info(): void {
    this.infoUser = !this.infoUser;
  }

  listarUsuario(): void {
    this.userService.listarUsuario(this.busqueda).subscribe(
      respuesta => {
        console.log(respuesta);
        this.users = respuesta;
      },
      error => {console.log(error),
      this.mensaje = error.error.error
      }
    );
  }

  buscarConRetraso(): void {
    if(this.temporizador==null){
      this.temporizador = setTimeout(()=>{this.listarUsuario();this.temporizador=null},1000)
    }
  }


  escribirMensaje(): void {
    this.mensajeEnviado.idDestinatario = this.userSelected.id;
    this.servicioMensaje.enviarMensaje(this.mensajeEnviado).subscribe(
      respuesta => {
        console.log(respuesta)
        this.mensajeEnviado = new Mensaje();
      },
      error => {console.log(error),
      this.mensaje = error.error.error
      }
    )
  }

  addFriend(user): void {
    console.log("user: " + user.id);
    this.userService.addFriend(user).subscribe(
      respuesta => {
        console.log(respuesta);
      },
      error => {console.log(error),
      this.mensaje = error.error.error}
    )
  }

}
