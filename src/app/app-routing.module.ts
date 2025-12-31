import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'drive',
    canActivate: mapToCanActivate([AuthGuard]),
    loadChildren: () =>
      import('./modules/my-drive/my-drive.module').then((m) => m.MyDriveModule),
  },
  {
    path: 'note',
    loadChildren: () =>
      import('./modules/note-board/note-board.module').then(
        (m) => m.NoteBoardModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
