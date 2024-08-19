import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task, Category } from '../../interfaces/nequi-task';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveTaskLocally(task: Task) {
    await this._storage?.set(task.id, task);
  }

  async getTaskLocally(id: string): Promise<Task | null> {
    return await this._storage?.get(id);
  }

  async removeTaskLocally(id: string) {
    await this._storage?.remove(id);
  }

  async getAllLocalTasks(): Promise<Task[]> {
    const tasks: Task[] = [];
    await this._storage?.forEach((value: Task) => {
      tasks.push(value);
    });
    return tasks;
  }
}