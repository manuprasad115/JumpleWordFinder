import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {BoardComponent} from './board.component';
import {HttpModule} from '@angular/http';
@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule ],
  declarations: [ AppComponent,BoardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
