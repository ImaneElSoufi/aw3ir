// debut du fichier
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail.component';

const appRoutes: Routes = [
  {
    path: '', // la page principale utilisera le component suivant
    component: MeteoComponent,
  },
  {
    path: 'meteo/:name', // la page affichant la météo prendra comme paramètre 'name'
    component: MeteoDetailComponent, // Ce component fera l'appel AJAX et afficher les données reçues par openWeatherMap
  },
  {
    path: '**', // un chemin vers une page inexistante redirigera vers '/'
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    MeteoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers:
    [DatePipe]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
