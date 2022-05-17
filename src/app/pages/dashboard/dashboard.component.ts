import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2'
import { FormBuilder } from '@angular/forms';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  producto = new ProductoModel();
  productos: any[] = [];
  flag = false;



  form: FormGroup = this.fb.group({
    nombreProducto: ['', Validators.required],
    CodProd: ['', Validators.required],
    Categoria: ['', Validators.required],
    Precio: ['', Validators.required],
    iva: [false]
  });
  // inventario: InventarioModel[] =[];

  constructor(private InventS_: InventarioService,
    private fb: FormBuilder) {


  }



  ngOnInit(): void {
    this.flag = true;
    this.recargarTabla();
  }

  recargarTabla() {

    this.InventS_.getAll().snapshotChanges().pipe(
      map((resp:any)=>resp.map((res:any)=>({
        id: res.payload.key, ...res.payload.val()
      })

      ))
    ).subscribe(data=>{
      console.log(data);
      this.productos=data;
      
    })
  }


  agregarProducto() {
    if (this.form.invalid) {
      console.log('Formulario no valido');
      return;
    }
    Swal.fire({

      text: 'Guardando info',

      allowOutsideClick: false
    });

    Swal.showLoading();


    if (this.form.valid) {
      this.InventS_.create(this.form.value).then(() => {

        Swal.fire({
          title: this.form.value.nombreProducto,
          text: 'Se guardo conrrectamente',
          icon: 'success'
        });

      })
      Swal.close();

    }
    this.form.reset();

  }

  get valid(){

    return this.form.dirty;
  }
}
