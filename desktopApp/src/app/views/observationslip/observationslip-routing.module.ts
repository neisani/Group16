import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservationslipComponent } from './observationslip.component';
import { EditobservationslipComponent } from './editobservationslip/editobservationslip.component';
import { ViewobservationslipComponent } from './viewobservationslip/viewobservationslip.component';
import { AddobservationslipComponent } from './addobservationslip/addobservationslip.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Observationslips'
    },
    children: [
      {
        path: '',
        redirectTo: 'observationslip'
      },
      {
        path: 'add-observationslip',
        component: AddobservationslipComponent,
        data: {
          title: 'Add Observationslip'
        }
      },
      {
        path: 'edit-observationslip',
        component: EditobservationslipComponent,
        data: {
          title: 'Edit Observationslip'
        }
      },
      {
        path: 'view-observationslip',
        component: ViewobservationslipComponent,
        data: {
          title: 'View Observationslip'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationslipRoutingModule {}
