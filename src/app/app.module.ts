import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzService } from './quizz.service';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: '', component: QuizzComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuizzComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [QuizzService],
  bootstrap: [AppComponent]
})
export class AppModule { }
