import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBetPage } from './update-bet.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBetPageRoutingModule {}
