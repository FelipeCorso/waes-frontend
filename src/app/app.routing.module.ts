import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HighlighterComponent} from './highlighter/highlighter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/highlighter',
    pathMatch: 'full'
  },
  {
    path: 'highlighter',
    component: HighlighterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
