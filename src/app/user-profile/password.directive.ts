/**
 * @author - Shahbaz Shaikh
 * @description - Create a PasswordDirective for show and hide password.
 */
import { Directive, ElementRef } from '@angular/core';
// ------------------------------------------- //

@Directive({
  selector: '[imsPassword]'
})
export class PasswordDirective {

  private shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  public setup() {
    const parent = this.el.nativeElement.parentNode;
    const i = document.createElement('i');
    i.className = 'fa fa-eye-slash';
    i.addEventListener('click', (event) => {
      this.toggle(i);
    });
    parent.appendChild(i);
  }

  public toggle(i: HTMLElement) {
    this.shown = !this.shown;
    if (this.shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      i.className = 'fa fa-eye';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      i.className = 'fa fa-eye-slash';
    }
  }

}
