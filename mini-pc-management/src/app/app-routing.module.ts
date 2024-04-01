import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserComponent } from './user/user.component';
import { SongComponent } from './song/song.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'users', component: UserComponent },
  { path: 'songs', component: SongComponent },
  { path: 'movies', component: MovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
