import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[firstToUpper]'
})
export class FirstToUpperDirective {
  @HostListener('input', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (input.value.charAt(0) === input.value.charAt(0).toLowerCase()) {
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    }
  }
}
