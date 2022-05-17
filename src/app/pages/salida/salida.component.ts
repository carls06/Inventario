import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventarioModel } from 'src/app/models/inventario.model';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  invent: InventarioModel = new InventarioModel();

  inventario: InventarioModel[] =[];
  
  constructor() { }

  ngOnInit(): void {
  }

  agregarProducto(forma: NgForm) {
    if(forma.valid){
      console.log(forma.value);
      console.log(this.inventario.length);
      
      
      
    }
  }
  
}
