import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  songs: any[] = [];
  newSong: any = {};
  baseUrl = 'http://localhost:8000'; // Update with your backend URL
  showEditForm = false;
  editSongId: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs() {
    this.http.get<any[]>(`${this.baseUrl}/song/songs`).subscribe(songs => {
      this.songs = songs;
    });
  }

  createSong() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>(`${this.baseUrl}/song/createSong`, this.newSong, { headers }).subscribe(song => {
      this.songs.push(song);
      this.newSong = {};
    });
  }

  editSong(song: any) {
    this.showEditForm = true;
    this.newSong = { ...song };
    this.editSongId = song._id;
  }

  updateSong() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let obj = {
      id: this.newSong._id,
      name: this.newSong.name,
      genre: this.newSong.genre,
    };

    this.http.put<any>(`${this.baseUrl}/song/updateSong`, obj, { headers }).subscribe(updatedSong => {
      const index = this.songs.findIndex(s => s._id === updatedSong._id);
      if (index !== -1) {
        this.songs[index] = updatedSong;
      }
      this.resetEditForm();
    });
  }

  cancelEdit() {
    this.resetEditForm();
  }

  resetEditForm() {
    this.showEditForm = false;
    this.editSongId = null;
    this.newSong = {};
  }

  deleteSong(id: string) {
    this.http.delete<any>(`${this.baseUrl}/song/deleteSong`, { body: { id } }).subscribe(deletedSong => {
      this.songs = this.songs.filter(s => s._id !== deletedSong._id);
    });
  }
}
