import { Routes   } from '@angular/router';
import { Homepage } from './views/homepage/homepage';
import { Explore  } from './views/explore/explore';

export const routes: Routes = [
  {
    path: '',
    component: Homepage
  },
  {
    path: 'explore',
    component: Explore
  }
];
