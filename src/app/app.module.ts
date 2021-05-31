
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { CompetencesComponent } from './competences/competences.component';
import { CondidatsComponent } from './condidats/condidats.component';
import { EntretiensComponent } from './entretiens/entretiens.component';
import { OffresComponent } from './offres/offres.component';

import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { OffreModalComponent } from './offres/offre-modal/offre-modal.component';
import { AjouteOffreComponent } from './offres/ajoute-offre/ajoute-offre.component';
import { TabOffreComponent } from './offres/tab-offre/tab-offre.component';
import { DialogComponent } from './dialog/dialog.component';
import { AjouteCondidatsComponent } from './condidats/ajoute-condidats/ajoute-condidats.component';
import { TabCondidatsComponent } from './condidats/tab-condidats/tab-condidats.component';
import { MaterialComponentsModule } from './material-component/material.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { AcheterComponent } from './acheter/acheter.component';
import { AjouteEntertienComponent } from './entretiens/ajoute-entertien/ajoute-entertien.component';
import { TabEntertienComponent } from './entretiens/tab-entertien/tab-entertien.component';
import { TabCompetanceComponent } from './competences/tab-competance/tab-competance.component';
import { AjoutCompetanceComponent } from './competences/ajout-competance/ajout-competance.component';
import { DetailsComponent } from './competences/details/details.component';
import { PostulerComponent } from './postuler/postuler.component';
import { TabPostulerComponent } from './postuler/tab-postuler/tab-postuler.component';
import { AjoutPostulerComponent } from './postuler/ajout-postuler/ajout-postuler.component';
import { InfoPostComponent } from './postuler/info-post/info-post.component';

// import { FileSaverModule } from 'ngx-filesaver';


import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DeatiluserOffreComponent } from './offres/deatiluser-offre/deatiluser-offre.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    CompetencesComponent,
    CondidatsComponent,
    EntretiensComponent,
    OffresComponent,
   
    OffreModalComponent,
    AjouteOffreComponent,
    TabOffreComponent,
    DialogComponent,
    AjouteCondidatsComponent,
    TabCondidatsComponent,
    AcheterComponent,
   
    AjouteEntertienComponent,
    TabEntertienComponent,
    TabCompetanceComponent,
    AjoutCompetanceComponent,
    DetailsComponent,
    PostulerComponent,
    TabPostulerComponent,
    AjoutPostulerComponent,
    InfoPostComponent,
  
    LoginComponent,  
    RegisterComponent, DeatiluserOffreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    // FileSaverModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MaterialComponentsModule,
    NgxPayPalModule,
    
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
      
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AjouteOffreComponent,
    DialogComponent,
    AjouteCondidatsComponent,
    AcheterComponent,
   
    AjouteEntertienComponent,
    AjoutCompetanceComponent,
    DetailsComponent,
    PostulerComponent,
    InfoPostComponent,
    DeatiluserOffreComponent
  ],
})
export class AppModule {}
