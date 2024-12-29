import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [],
  templateUrl: './mis-reservas.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MisReservasComponent implements OnInit {

  ngOnInit(): void { }

}
