import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  
  producto = new ProductoModel();

 // inventario: InventarioModel[] =[];
  

  constructor(private InventS_:InventarioService) { }

  ngOnInit(): void {
  }

  agregarProducto(forma: NgForm) {
    if(forma.invalid){
        console.log('Formulario no valido');
        return;     
  }
   

}
}
