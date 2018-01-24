import { Component } from '@angular/core';

import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'app';

  constructor(private service: SocketService) {

  }

  public send(): void {

    console.log('>>>>>>>');

    this.service.connect();

    // this.service.emit('channel', '>>>>>>>>').subscribe((next) => {
    //   console.log('response', next);
    // });
  }
}
