import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBetPageRoutingModule } from './update-bet-routing.module';

import { UpdateBetPage } from './update-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBetPageRoutingModule
  ],
  declarations: [UpdateBetPage]
})
export class UpdateBetPageModule {}
