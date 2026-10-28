import { authGuard } from './core/guards/auth-guard';
import { MainLayoutComponent } from './layouts/mainLayout/mainLayout.component';
import { AuthLayoutComponent } from './layouts/authLayout/authLayout.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { alreadyloggedGuard } from './core/guards/alreadylogged-guard';
import { MyPostComponent } from './features/feeds/components/my-post/my-post.component';
import { CenterSideComponent } from './features/feeds/components/center-side/center-side.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    canActivate: [alreadyloggedGuard],
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Route | Login' },
      { path: 'register', component: RegisterComponent, title: 'Route | Register' },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((c) => c.ProfileComponent),
        title: 'Profile',
      },
      {
        path: 'profile/:id',
        loadComponent: () =>
          import('./features/profile/profile.component').then((c) => c.ProfileComponent),
        title: 'User Profile',
      },
      { path: 'changepass', component: ChangePasswordComponent, title: 'Change Password' },
      {
        path: 'feeds',
        loadComponent: () =>
          import('./features/feeds/feeds.component').then((c) => c.FeedsComponent),
        children: [
          { path: '', redirectTo: 'feed', pathMatch: 'full' },

          {
            path: 'feed',
            loadComponent: () =>
              import('./features/feeds/components/center-side/center-side.component').then(
                (c) => c.CenterSideComponent,
              ),
          },
          { path: 'mypost', component: MyPostComponent, title: 'MyPost' },
          {
            path: 'saved',
            loadComponent: () =>
              import('./features/feeds/components/saved/saved.component').then(
                (c) => c.SavedComponent,
              ),
            title: 'Saved',
          },
          { path: '**', component: NotFoundComponent },
        ],
      },
      {
        path: 'postDetails/:id',
        loadComponent: () =>
          import('./features/post-details/post-details.component').then(
            (c) => c.PostDetailsComponent,
          ),
        title: 'Post Details',
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./features/notification/notification.component').then(
            (c) => c.NotificationComponent,
          ),
        title: 'Notification',
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
