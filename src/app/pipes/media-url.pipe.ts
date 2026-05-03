import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'mediaUrl', standalone: true, pure: true })
export class MediaUrlPipe implements PipeTransform {
  transform(url: string | null | undefined, fallback = 'assets/icons/avatar.svg'): string {
    if (!url) return fallback;
    return url;
  }
}
