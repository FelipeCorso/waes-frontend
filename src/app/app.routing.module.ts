import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StarshipsComponent} from './starships/starships.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/highlighter',
    pathMatch: 'full'
  },
  {
    path: 'highlighter',
    component: HighlComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
