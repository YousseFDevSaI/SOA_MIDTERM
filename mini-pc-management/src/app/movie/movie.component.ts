import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: any[] = [];
  newMovie: any = {};
  baseUrl = 'http://localhost:8000'; // Update with your backend URL
  showEditForm = false;
  editMovieId: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.http.get<any[]>(`${this.baseUrl}/movie/movies`).subscribe(movies => {
      this.movies = movies;
    });
  }

  createMovie() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(`${this.baseUrl}/movie/createMovie`, this.newMovie, { headers }).subscribe(movie => {
      this.movies.push(movie);
      this.newMovie = {};
    });
  }

  editMovie(movie: any) {
    this.showEditForm = true;
    this.newMovie = { ...movie };
    this.editMovieId = movie._id;
  }

  updateMovie() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let obj = {
      id: this.newMovie._id,
      name: this.newMovie.name,
      genre: this.newMovie.genre,
      year: this.newMovie.year,
      actors: this.newMovie.actors,
    };

    this.http.put<any>(`${this.baseUrl}/movie/updateMovie`, obj, { headers }).subscribe(updatedMovie => {
      const index = this.movies.findIndex(m => m._id === updatedMovie._id);
      if (index !== -1) {
        this.movies[index] = updatedMovie;
      }
      this.resetEditForm();
    });
  }

  cancelEdit() {
    this.resetEditForm();
  }

  resetEditForm() {
    this.showEditForm = false;
    this.editMovieId = null;
    this.newMovie = {};
  }

  deleteMovie(id: string) {
    this.http.delete<any>(`${this.baseUrl}/movie/deleteMovie`, { body: { id } }).subscribe(deletedMovie => {
      this.movies = this.movies.filter(m => m._id !== deletedMovie._id);
    });
  }
}
