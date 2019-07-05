import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ObservationslipComponent } from './observationslip.component';
import { ViewobservationslipComponent } from './viewobservationslip/viewobservationslip.component';
import { AddobservationslipComponent } from './addobservationslip/addobservationslip.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EditobservationslipComponent } from './editobservationslip/editobservationslip.component';

// Buttons Routing
import { ObservationslipRoutingModule } from './observationslip-routing.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../services/allServices';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ObservationslipRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ObservationslipComponent,
    EditobservationslipComponent,
    ViewobservationslipComponent,
    AddobservationslipComponent
  ],
  providers: [
    FormBuilder,
    DataService
  ],
})
export class ObservationslipModule { }
