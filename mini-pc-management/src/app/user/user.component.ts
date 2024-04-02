import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  newUser: any = {}; // Object to store data for new user or for updating existing user
  baseUrl = 'http://localhost:8000/user'; // Update with your backend URL
  showEditForm = false; // Flag to control the visibility of the edit form
  editUserId: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get<any[]>(`${this.baseUrl}/users`).subscribe(users => {
      this.users = users;
    });
  }

  createUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(this.newUser)
    this.http.post<any>(`${this.baseUrl}/createUser`, this.newUser, { headers }).subscribe(user => {
      this.users.push(user);
      this.newUser = {}; // Clear the new user object after successful creation
    });
  }

  getUserById(id: string) {
    const options = {
      headers: new HttpHeaders(),
      body: { id }
    };
    this.http.options<any>(`${this.baseUrl}/userById`, options).subscribe(user => {
      console.log(user); // Do something with the retrieved user data
    });
  }

   // Function to toggle visibility of the edit form and populate it with user data
   editUser(user: any) {
    this.showEditForm = true;
    this.newUser = { ...user }; // Copy user data to newUser object
    this.editUserId = user._id;
  }

  // Function to update user details
  updateUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(this.newUser)
    let obj =
      {
        id: this.newUser._id,
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        user_name: this.newUser.user_name,
        email: this.newUser.user_name.email,
        password: this.newUser.user_name.password,

      }

    this.http.put<any>(`${this.baseUrl}/updateUser`, obj, { headers }).subscribe(updatedUser => {
      console.log("called")
      const index = this.users.findIndex(u => u._id === updatedUser._id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.resetEditForm(); // Reset edit form after successful update
    });
  }

  // Function to cancel edit and reset form
  cancelEdit() {
    this.resetEditForm();
  }

  // Function to reset edit form and visibility flag
  resetEditForm() {
    this.showEditForm = false;
    this.editUserId = null;
    this.newUser = {}; // Clear the new user object
  }


  deleteUser(id: string) {
    this.http.delete<any>(`${this.baseUrl}/deleteUser`, { body: { id } }).subscribe(deletedUser => {
      // Remove the deleted user from the local array
      this.users = this.users.filter(u => u._id !== deletedUser._id);
    });
  }
}
