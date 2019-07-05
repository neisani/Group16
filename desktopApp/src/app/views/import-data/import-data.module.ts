import { NgModule } from '@angular/core';

import { ImportdataComponent } from './import-data.component';

import { ImportdataRoutingModule } from './import-data-routing.module';

@NgModule({
  imports: [ ImportdataRoutingModule ],
  declarations: [
    ImportdataComponent
  ]
})
export class ImportdataModule { }
