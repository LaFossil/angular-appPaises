import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [ `
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent  {

  //v3
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  /* v2
EU (European Union)
EFTA (European Free Trade Association)
CARICOM (Caribbean Community)
PA (Pacific Alliance)
AU (African Union)
USAN (Union of South American Nations)
EEU (Eurasian Economic Union)
AL (Arab League)
ASEAN (Association of Southeast Asian Nations)
CAIS (Central American Integration System)
CEFTA (Central European Free Trade Agreement)
NAFTA (North American Free Trade Agreement)
SAARC (South Asian Association for Regional Cooperation) 

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC']; */
  regionActiva: string = '';
  paises: Country[] = [];
  

  constructor( private paisService: PaisService) { }

  getClaseCSS( region: string ): string {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activarRegion ( region: string ){
    if (region === this.regionActiva){
      return;
    }
    this.regionActiva = region;
    this.paises = [];

    this.paisService.buscarRegion( region )
     .subscribe( paises => this.paises = paises);
    
  }

}
