import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  ts=[""]

  add(e:Event,value:string){
    this.ts.push(value);
  }
}
