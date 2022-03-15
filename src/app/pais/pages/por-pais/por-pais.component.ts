import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent  {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ){} //inyectamos nuestro servicio

  buscar( termino: string ){
    this.hayError = false;
    console.log(this.termino);
    this.termino = termino;
    //Para que el observable se dispare necesitamos al menos un subscribe,
    this.paisService.buscarPais(termino)
      .subscribe( (paises) => {
        console.log(paises);
        //Al haber definido el observable de tipo Country[], ya nos salen las ayudas de arreglos.y cambiamos de resp a paises, 
        //tenemos que definirlo!!!
        this.paises = paises;

      }, (err) => {
        //console.info('Error:', err);
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        (err) => this.paisesSugeridos = []
      );
  }

  buscarSugerido( termino: string ){
    this.buscar( termino );
  }


}