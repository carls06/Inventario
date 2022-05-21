import { Injectable } from '@angular/core';
// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private dbCatCategoria = '/cat-categoria';
  catCategoria: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { 
    this.catCategoria=firebase.list(this.dbCatCategoria);
  }

  getAll() {
    return this.catCategoria;
  }

  create(producto: any) {
    return this.catCategoria.push(producto);
  }

  borrar(id:any){
    return this.catCategoria.remove(id);
  }
}
