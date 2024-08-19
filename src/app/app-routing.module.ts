import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: TabsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
          },
          {
            path: 'task-list',
            loadChildren: () => import('./pages/task-list/task-list.module').then( m => m.TaskListPageModule)
          },
          {
            path: 'category-list',
            loadChildren: () => import('./pages/category-list/category-list.module').then( m => m.CategoryListPageModule)
            // },
          },
          {
            path: 'task-form',
            loadChildren: () => import('./pages/task-form/task-form.module').then( m => m.TaskFormPageModule)
          },
          {
            path: 'category-form/:id',
            loadChildren: () => import('./pages/category-form/category-form.module').then( m => m.CategoryFormPageModule)
          },
        ],
      },
  
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
