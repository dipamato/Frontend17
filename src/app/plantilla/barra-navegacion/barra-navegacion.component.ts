import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  datos?:ModeloDatos = new ModeloDatos();
  sesionIniciada?: boolean=false;
  subs: Subscription = new Subscription();
  nombre?:string="diana";

  constructor(private servicioSeguridad: SeguridadService) {
    
    this.subs= this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      this.datos=datos.datos;
      this.nombre=this.datos?.nombre;
    })
 

   }

  ngOnInit(): void {
    this.subs= this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      this.sesionIniciada = datos.estaIdentificado;
    })
  }


}
