import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgPngPipe } from './img-png/img-png.pipe';


@NgModule({
  declarations: [
    ImgPngPipe, 
  ],
  exports: [
    ImgPngPipe, 
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
