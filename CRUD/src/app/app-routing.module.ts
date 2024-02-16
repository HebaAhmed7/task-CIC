import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
  },

  {
    path: 'user-form',
    component: UserFormComponent,
  },
  {
    path: 'user-form/:id',
    component: UserFormComponent,
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
