import { Routes      } from '@angular/router';
import { authGuard   } from './guards/auth.guard';
import { Homepage    } from './views/homepage/homepage';
import { Draw        } from './views/draw/draw';
import { Explore     } from './views/explore/explore';
import { Leaderboard } from './views/leaderboard/leaderboard';
import { Login       } from './views/login/login';
import { Signup      } from './views/signup/signup';
import { Profile     } from './views/profile/profile';
import { Info        } from './views/info/info';

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
    path: 'draw',
    component: Draw,
    canActivate: [authGuard]
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
    component: Profile,
    canActivate: [authGuard]
  },
  {
    path: 'info',
    component: Info
  }
];
