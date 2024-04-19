import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ApiService } from '../services/api.service';

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todos[];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.apiService.get<Todos[]>('todos').subscribe((todos: Todos[]) => {
      this.todos = todos;
    });
  }

  update(todo: Todos) {
    this.apiService
      .put<Todos>(
        `todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          // body: todo.body,   // does not exist on todo -> only returns undefined
          userId: todo.userId,
        }),
        {
          headers: new HttpHeaders().set(
            'Content-type',
            'application/json; charset=UTF-8',
          ),
        },
      )
      .subscribe((todoUpdated) => {
        this.todos = [
          ...this.todos.filter((t) => t.id === todoUpdated.id - 1),
          todoUpdated,
        ];
      });
  }

  delete(todo: Todos) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe(() => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      });
  }
}
