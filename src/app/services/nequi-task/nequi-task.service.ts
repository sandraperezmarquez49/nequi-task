import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task, Category } from '../../interfaces/nequi-task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NequiTaskService {
  private categoriesCollection = this.firestore.collection<Category>('categories');
  private taskCollection = this.firestore.collection<Task>('tasks');

  constructor( private firestore: AngularFirestore ) { }

  getTasks() {
    return this.firestore.collection<Task>('tasks').valueChanges({ idField: 'uid' });
  }

  addTask(task: Task) {
    const id = this.firestore.createId();
    return this.taskCollection.doc(id).set({ ...task, id });
  }

  updateTask(task: Task): Promise<void> {
    return this.firestore.collection('tasks').doc(task.id).update({
      completed: task.completed,
    });
  }

  deleteTask(taskId: string) {
    return this.firestore.doc(`tasks/${taskId}`).delete();
  }

  getCategories() {
    return this.firestore.collection<Category>('categories').valueChanges({ idField: 'id' });
  }

  addCategory(category: Category): Promise<void> {
    const id = this.firestore.createId();
    return this.categoriesCollection.doc(id).set({ ...category, id });
  }

  updateCategory(category: Category): Promise<void> {
    return this.categoriesCollection.doc(category.id).update(category);
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.categoriesCollection.doc<Category>(id).valueChanges();
  }


  deleteCategory(categoryId: string) {
    return this.firestore.doc(`categories/${categoryId}`).delete();
  }
}
