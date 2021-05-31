import { Routes } from '@angular/router';
import { CompetencesComponent } from './competences/competences.component';
import { CondidatsComponent } from './condidats/condidats.component';
import { EntretiensComponent } from './entretiens/entretiens.component';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';


import { OffresComponent } from './offres/offres.component';



export const AppRoutes: Routes = [

   { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'Registerr',component:RegisterComponent},
  

  {path: '',component: FullComponent,children: [
    {path: '',redirectTo: '/Offres',pathMatch: 'full'},
    {path:'Offres',component:OffresComponent},
    {path:'Competences',component:CompetencesComponent},
    {path:'Condidats',component:CondidatsComponent},
    {path:'Entretiens',component:EntretiensComponent},
    
   
   
    
  ]
  
},    
];
