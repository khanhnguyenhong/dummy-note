import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDriveComponent } from './my-drive.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: MyDriveComponent }];

@NgModule({
  declarations: [MyDriveComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
})
export class MyDriveModule {}
