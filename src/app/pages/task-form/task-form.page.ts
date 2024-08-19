import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NequiTaskService } from '../../services/nequi-task/nequi-task.service';
import { Task, Category } from '../../interfaces/nequi-task';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit, OnDestroy {
  taskForm: FormGroup;
  title: string = "Nueva tarea";
  categories: Category[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private taskService: NequiTaskService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      categoryId: ['', Validators.required],
      completed: [false],
      description: ['', [Validators.maxLength(1000),Validators.required]],
    });
  }

  ngOnInit() {
    this.taskService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }


  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: '',
        ...this.taskForm.value,
      };

      this.taskService.addTask(newTask).then(() => {
        this.alertService.presentAlert("¡Tarea creada con exito!");
        this.router.navigate(['/task-list']);
        this.taskForm.reset();
      });
    }
  }

  ngOnDestroy() {
    // Cancelar todas las suscripciones activas
    this.destroy$.next();
    this.destroy$.complete();
  }
}
