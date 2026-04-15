import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollYSubject = new BehaviorSubject<number>(0);
  scrollY$ = this.scrollYSubject.asObservable();

  updateScroll(y: number) {
    this.scrollYSubject.next(y);
  }
}
