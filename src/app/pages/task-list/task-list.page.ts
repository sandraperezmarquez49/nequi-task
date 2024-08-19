import { Component, OnInit, OnDestroy } from '@angular/core';
import { NequiTaskService } from '../../services/nequi-task/nequi-task.service';
import { Task, Category } from '../../interfaces/nequi-task';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RemoteConfigService } from 'src/app/services/remote-config/remote-config.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit, OnDestroy {
  tasks$: Observable<Task[]> | undefined;
  filteredTasks: TaskWithCategoryName[] = [];
  categories: Category[] = [];
  selectedCategory: string | null = null;
  title: string = "Tareas";
  titleCategories: string = "Todas";
  message: string = "No existe lista de tareas";
  isLoading: boolean = true;
  tasksLoaded: boolean = false;
  categoriesLoaded: boolean = false;
  showTaskToggle: boolean = false;  // Nueva propiedad para controlar la visibilidad del toggle
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: NequiTaskService,
    private storage: StorageService,
    private alertService: AlertService,
    private remoteConfigService: RemoteConfigService  // Inyectar el RemoteConfigService
  ) {}

  ngOnInit() {
    this.checkTaskToggleEnabled();
    this.loadCategories().then(() => {
      this.loadTasks();
    });
  }

  private async checkTaskToggleEnabled(): Promise<void> {
    this.remoteConfigService.getTaskCompletedEnabled().then((disabled) =>{
      this.showTaskToggle = !disabled;
    });
  }
  

  private async loadCategories(): Promise<void> {
    return new Promise((resolve) => {
      this.taskService.getCategories()
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.categories = res;
          this.categoriesLoaded = true;
          this.checkLoadingState();
          resolve();
        });
    });
  }

  private loadTasks() {
    this.tasks$ = this.taskService.getTasks();
    this.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.filteredTasks = tasks.map(task => ({
          ...task,
          expanded: false,
          categoryName: this.getCategoryName(task.categoryId)
        }));
        this.tasksLoaded = true;
        this.checkLoadingState();
      });
  }

  private checkLoadingState() {
    if (this.tasksLoaded && this.categoriesLoaded) {
      this.isLoading = false;
    }
  }

  toggleTaskCompletion(task: TaskWithCategoryName) {
    if (task.id) {
      const originalCompleted = task.completed;
      task.completed = !task.completed;

      this.taskService.updateTask(task)
        .then(() => {
          this.storage.saveTaskLocally(task);
        })
        .catch(error => {
          this.alertService.presentAlert("Upss... Error al cambiar el estado");
          console.error('Error updating task: ', error);
          task.completed = originalCompleted; // Revertir el cambio si falla
        });
    } else {
      this.alertService.presentAlert("Upss... Error al cambiar el estado");
      console.error('Task ID is missing, unable to update task');
    }
  }

  filterTasksByCategory(categoryId: string | null) {
    this.selectedCategory = categoryId;

    if (this.tasks$) {
      this.tasks$
        .pipe(takeUntil(this.destroy$))
        .subscribe(tasks => {
          if (tasks) {
            const filtered = categoryId === 'null' || !categoryId
              ? tasks // Mostrar todas las tareas
              : tasks.filter(task => task.categoryId === categoryId);

            this.filteredTasks = filtered.map(task => ({
              ...task,
              expanded: false,
              categoryName: this.getCategoryName(task.categoryId)
            }));
          }
        });
    } else {
      this.filteredTasks = [];
    }
  }

  deleteTask(task: TaskWithCategoryName) {
    this.taskService.deleteTask(task.id).then(() => {
      this.storage.removeTaskLocally(task.id);
    });
  }

  private getCategoryName(categoryId: string | undefined): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.category : 'Sin categoría';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

interface TaskWithCategoryName extends Task {
  categoryName?: string;
  expanded?: boolean;
}
