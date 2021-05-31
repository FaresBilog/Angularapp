import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  //  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
   { state: 'Offres', name: 'Offres', type: 'link', icon: 'view_list' },
   //{ state: 'Competences', type: 'link', name: 'Competences', icon: 'view_list' },
   { state: 'Condidats', type: 'link', name: 'Utilisateurs', icon: 'view_list' },
   { state: 'Entretiens', type: 'link', name: 'Entretiens', icon: 'view_list' },
  //{ state: 'Register', type: 'link', name: 'Register', icon: 'view_list' },
 
  
 
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
