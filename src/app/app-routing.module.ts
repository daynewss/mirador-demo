import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewerComponent} from './viewer/viewer.component';
import {ViewerMiradorComponent} from './viewer/viewer-mirador/viewer-mirador.component';


const routes: Routes = [
  {path: '', component: ViewerComponent},
  {path: 'mirador-viewer', component: ViewerMiradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
