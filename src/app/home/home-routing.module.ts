import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTemplateComponent } from './home-template/home-template.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTemplateComponent,
    children: [
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then((m) => m.NewsModule),
      },
      {path: '**', redirectTo: 'news'}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }