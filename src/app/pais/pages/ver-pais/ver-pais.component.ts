import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor( 
    private activedRoute: ActivatedRoute,
    private paisService: PaisService
    ) { } //El constructor es incluso antes de que se inicialice el componente

  //Es un buen sitio para el observable, en el ciclo de vida, onInit, es cuando el componente esta inicializado
  ngOnInit(): void { 

    /* Antes de mejora usabamos dos observables, uno dependiente, 
    this.activedRoute.params.subscribe( ({ id }) => {
      console.log(id);

      //Necesito otro observable para la informacion del pais por codigo
      this.PaisService.getPaisPorAlpha( id ).subscribe( pais => {
        console.log(pais);
      })
    });
    */

      this.activedRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.getPaisPorAlpha( id )),
        tap( console.log )
      )
      .subscribe( paises => this.pais = paises[0]);
    
   

  }

}
