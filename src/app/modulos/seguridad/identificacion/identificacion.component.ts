import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador:FormGroup=this.fb.group({
    'usuario':['',[Validators.required,Validators.email]],
    'clave':['',[Validators.required]],
    'recaptcha':["",[Validators.required]]
  });

  siteKey:string="";

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) {
      this.siteKey="6Lcvr3YdAAAAAKfn2aR-jujT_PqfDWHPuTmdouur";
     }

  ngOnInit(): void {

  }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario,claveCifrada).subscribe((datos:any)=>{
      //OK
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
    }, (error:any)=>{
      //KO
      alert ("Usuario o contraseña incorrecta!!")
    })
  }
  

}
