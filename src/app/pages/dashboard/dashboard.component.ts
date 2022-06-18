import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventarioModel } from 'src/app/models/inventario.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2'
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { SubSink } from 'subsink';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private subs = new SubSink();
  productos: any[] = [];
  categoria: any[] = [];

  selected?: any;

  flag = false;
  btn_edit: boolean = false;




  form: FormGroup = this.fb.group({
    nombreProducto: ['', Validators.required],
    CodProd: ['', Validators.required],
    Categoria: ['', Validators.required],
    Precio: ['', Validators.required],
    Cantidad: ['', Validators.required],
    iva: [false]
  });
  // inventario: InventarioModel[] =[];

  constructor(private InventS_: InventarioService,
    private fb: FormBuilder,
    private titulo: Title,
    private _catalogoService: CatalogosService) {
    this.titulo.setTitle('Tablero');


  }



  ngOnInit(): void {
    this.flag = true;
    this.recargarTabla();
    this.subs.add(
      this._catalogoService.getAll().snapshotChanges().pipe(
        map((resp: any) => resp.map((res: any) => ({
          id: res.payload.key, ...res.payload.val()
        })

        ))
      ).subscribe(data => {
        this.categoria = data;
      }));

  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  borrarpro(id: any) {

    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      text: "No podras deshacer la seleccion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.InventS_.delete(id).then(() => {

          Swal.fire(
            'Eliminado!',
            'Producto Eliminado.',
            'success'
          )
        })

      }
    })
  }

  addProducto() {
    this.btn_edit = false;
    this.form.reset();
  }

  recargarTabla() {

    this.subs.add(
      this.InventS_.getAll().snapshotChanges().pipe(
        map((resp: any) => resp.map((res: any) => ({
          id: res.payload.key, ...res.payload.val()
        })

        ))
      ).subscribe(data => {
        this.productos = data;

      }));
  }

  editProd(item: any) {
    this.btn_edit = true;
    this.selected = item;
    console.log(this.selected);

    this.form.patchValue({
      nombreProducto: item?.nombreProducto,
      CodProd: item?.CodProd,
      Categoria: item.categoria,
      Precio: item?.Precio,
      Cantidad: item?.Cantidad,
      iva: item?.iva
    })
  }

  actualizarProd() {
    this.InventS_.updateProdu(this.selected.id, this.form.value).then(() => {
      Swal.fire({
        title: this.form.value.nombreProducto,
        text: 'Se actualizo conrrectamente',
        icon: 'success'
      });
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
          text: 'Se guardo correctamente',
          icon: 'success'
        });

      })
      Swal.close();

    }
    this.form.reset();

  }

  get valid() {

    return this.form.dirty;
  }
}
