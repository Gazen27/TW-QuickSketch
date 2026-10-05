import { Routes      } from '@angular/router';
import { Homepage    } from './views/homepage/homepage';
import { Explore     } from './views/explore/explore';
import { Leaderboard } from './views/leaderboard/leaderboard';
import { Login       } from './views/login/login';
import { Signup      } from './views/signup/signup';
import { Profile } from './views/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Homepage
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'explore',
    component: Explore
  },
  {
    path: 'leaderboard',
    component: Leaderboard
  },
  {
    path: 'profile',
    component: Profile
  }
];
