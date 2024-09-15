//const fs = require('fs');
import fs from 'fs'

class ProductManager
{
    /**@type {Array<producto>} */
    #productos;
    #path;
       
    constructor(path)
    {
        this.#path=path;
    }

    leerArchivo = async () => {
        try {
            const dataJson = await fs.promises.readFile(this.#path, 'utf-8')
            return JSON.parse(dataJson)            
        } catch (error) {
            return []
        }
    } 

    /**
     * @param {string} title 
     * @param {string} description 
     * @param {number} price 
     * @param {string} thumbnail 
     * @param {string} code 
     * @param {number} stock 
     * @param {boolean} status
     * @param {string} category 
     */
    addProduct = async (title, description,price, thumbnail,code,stock,status, category) =>
    {
        try
        {
         this.#productos = await this.leerArchivo()
        /** @type {producto} */
       const producto= {
        id: this.#getNextId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock, 
        status,
        category
       } ;
     this.#productos.push(producto);
     await fs.promises.writeFile(this.#path, JSON.stringify(this.#productos, null, '\t'), 'utf-8')
     console.log (`El producto Id ${producto.id} fue ingresado corectamente`)
    } catch (error)
    {
        console.log(error.message)
    }

    }

    deleteProduct = async (id) =>
    { 
        try
        {
            this.#productos = await this.leerArchivo()
            const indice = this.#productos.findIndex(prod => prod.id === id);
            if (indice === -1) {
               throw new Error(`No se puede eliminar el producto con id ${id} ya que no existe` );
            }
           const deletedProduct = this.#productos.splice(indice, 1);
           await fs.promises.writeFile(this.#path, JSON.stringify(this.#productos, null, '\t'), 'utf-8')
          // console.log (`El producto Id ${id} fue eliminado corectamente`)
        }catch (error)
        {
            console.log(error.message)
        }
    }

      /**
     * @param {string} title 
     * @param {string} description 
     * @param {number} price 
     * @param {string} thumbnail 
     * @param {string} code 
     * @param {number} stock 
     */
      updateProduct = async(prodUpdate) =>
      {
          this.#productos = await this.leerArchivo()
          const indice = this.#productos.findIndex(prod => prod.id === prodUpdate.id);
          if (indice === -1) {
             throw new Error(`No se puede actualizar el producto con id ${id} ya que no existe` );
          }
         console.log (prodUpdate)
         this.#updateFileFunction (prodUpdate, indice);
      }

      #updateFileFunction = async (obj, indice) => { 
        try {

            this.#productos[indice].title= obj.title;
            this.#productos[indice].description= obj.description;
            this.#productos[indice].price= obj.price;
            this.#productos[indice].thumbnail= obj.thumbnail;
            this.#productos[indice].code= obj.code;
            this.#productos[indice].stock= obj.stock;
                      
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#productos, null, '\t'), 'utf-8')
            console.log (`El producto Id ${obj.id} fue modificado corectamente`)
        } catch (error) {
            console.log(error.message)
        }
    }

    getProducts = async ()=>{
        try
        {
            this.#productos= this.leerArchivo();
            return (this.#productos);
        }catch (error)
        {
           console.log(error.message)
        }
    }

    getProductById = async (idProducto) => { 
     try {
            const result = await fs.promises.readFile(this.#path, 'utf-8')
            this.#productos=  JSON.parse(result);
           
            const producto = this.#productos.find((producto) => producto.id === idProducto);
            
            //  if (!producto)
            //  {
            //    throw new Error(`No existe el producto con ID ${idProducto} `)
            //  }
            return producto;    
        } catch (error) {
            console.log(error.message)
        }
    }

    /** @returns {number} */
    #getNextId() {
        if (this.#productos.length === 0) {
        return 1;
        }
        return this.#productos.at(-1).id + 1;
    }
}

export default ProductManager;
// Pruebas **************************************
// 1- Se creará una instancia de la clase “ProductManager”
// const productManager= new ProductManager("./productos.json");

// 2- Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// const LeerProductos = async() =>{
//     try{
//         const productos= await (productManager.getProducts());
        
//         console.log (productos);
//     }catch(error){
//         console.log(error);
//     }
// }
//  LeerProductos();
// 3- Se llamará al método “addProduct” con los campos:
// const CrearProducto = async() =>{
//     try{
//         let resultado= await productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123-2",25);
//         console.log (resultado);
//     }catch(error){
//         console.log(error);
//     }
// }
// CrearProducto();

// 4- Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// LeerProductos();

// 5- Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado
// const BuscarId = async(Id) =>{
//     try{
//         let resultado= await productManager.getProductById(Id);
//         console.log (resultado);
//     }catch(error){
//         console.log(error);
//     }
// }
//  BuscarId(1);


// 6- Se llamará al método “updateProduct” 
// const ActualizarProdcuto = async(id) =>{
//     try{
//         let resultado= await productManager.updateProduct(id,"producto update","Este es un producto update",300,"Sin imagen","abc123",20);
//     }catch(error){
//         console.log(error);
//     }
// }
// ActualizarProdcuto(1);

// 7- Se llamará al método “deleteProduct”, se evaluará que realmente se elimine 
//  const DeleteProducto = async(id) =>{
//      try{
//          let resultado= await productManager.deleteProduct(id);
        
//      }catch(error){
//          console.log(error);
//      }
//  }
// DeleteProducto(1);

