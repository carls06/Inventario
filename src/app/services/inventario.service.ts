import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';




@Injectable({
  providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class InventarioService {

  private dbProducto ='/productos';
  productList: AngularFireList<any> ;
 


  constructor(private firebase: AngularFireDatabase) { 
    this.productList=firebase.list(this.dbProducto);
  }

  getAll(){
    return this.productList;
  }
  
  create(producto:any){
    return this.productList.push(producto);
  }

  delete(id:any){
    return this.productList.remove(id);
  }
  updateProdu(id:string,producto:any){
    return this.productList.update(id,producto);
  }
}

