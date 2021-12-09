import { Component, OnInit } from '@angular/core';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  ListadoRegistros:ModeloProducto[]= [];

  constructor(private servicioProducto: ProductoService,
    private servicioSeguridad:SeguridadService) { }

  ngOnInit(): void {
    this.ObtenerListadoProductos();
  }

  ObtenerListadoProductos(){
    this.servicioProducto.ObtenerRegistros().subscribe((datos:ModeloProducto[])=>{
      this.ListadoRegistros = datos;
    })
  }



}
