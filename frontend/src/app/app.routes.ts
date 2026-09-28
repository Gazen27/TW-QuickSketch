import { Routes      } from '@angular/router';
import { Homepage    } from './views/homepage/homepage';
import { Explore     } from './views/explore/explore';
import { Leaderboard } from './views/leaderboard/leaderboard';

export const routes: Routes = [
  {
    path: '',
    component: Homepage
  },
  {
    path: 'explore',
    component: Explore
  },
  {
    path: 'leaderboard',
    component: Leaderboard
  }
];
