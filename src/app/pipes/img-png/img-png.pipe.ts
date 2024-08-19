import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgPng',
})
export class ImgPngPipe implements PipeTransform {

  transform(img: string, folder?: string): string {
    const URL = "../../../../assets"
    return `${URL}/${folder}/${img}.png`;
  }

}
