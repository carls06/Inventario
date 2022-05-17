export class ProductoModel {
    id?: string;
    id_?:Number;
    codProd: string | undefined;
    nombreProducto: string | undefined; 
    categoria:string | undefined;
    precio: Number | undefined;
    Stock?: Number;
    Entradas?: Number;
    Salida?: Number;

    constructor(){
    }
}