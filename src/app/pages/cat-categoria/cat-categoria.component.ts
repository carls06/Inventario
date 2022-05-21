import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { CatalogosService } from 'src/app/services/catalogos.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cat-categoria',
  templateUrl: './cat-categoria.component.html',
  styleUrls: ['./cat-categoria.component.css']
})
export class CatCategoriaComponent implements OnInit {


  categoria: any[] = [];
  constructor(private titulo: Title,
    private fb: FormBuilder,
    private _catService:CatalogosService) {
    this.titulo.setTitle('Categoria');
  }

  form: FormGroup = this.fb.group({
    catName: ['', Validators.required]
  })
  ngOnInit(): void {
    this.recargarTabla();
  }
  agregarCat() {

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
      this._catService.create(this.form.value).then(() => {

        Swal.fire({
          title: this.form.value.catName,
          text: 'Se guardo conrrectamente',
          icon: 'success'
        });

      })
      Swal.close();

    }
    this.form.reset();
  }
  borrarCat(id:any){

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
        this._catService.borrar(id).then(()=>{

          Swal.fire(
            'Eliminado!',
            'Categoria Eliminada.',
            'success'
          )
        })
        
      }
    })
  }
  
  recargarTabla() {
    this._catService.getAll().snapshotChanges().pipe(
      map((resp:any)=>resp.map((res:any)=>({
        id: res.payload.key, ...res.payload.val()
      })

      ))
    ).subscribe(data=>{
      this.categoria=data;
      
    })
  }

}
