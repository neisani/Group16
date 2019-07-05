import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportdataComponent } from './import-data.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Import data'
    },
    children: [
      {
        path: '',
        redirectTo: 'import-data'
      },
      {
        path: 'import-data',
        component: ImportdataComponent,
        data: {
          title: 'Import data'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportdataRoutingModule {}
