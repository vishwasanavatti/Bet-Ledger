import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixturePageRoutingModule } from './fixture-routing.module';

import { FixturePage } from './fixture.page';
import { ExpandableComponent } from './expandable/expandable.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FixturePageRoutingModule],
  declarations: [FixturePage, ExpandableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FixturePageModule {}
