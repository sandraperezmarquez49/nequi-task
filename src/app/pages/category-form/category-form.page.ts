import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NequiTaskService } from 'src/app/services/nequi-task/nequi-task.service';
import { Category } from '../../interfaces/nequi-task';
import { AlertService} from '../../services/alert/alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
})
export class CategoryFormPage implements OnInit, OnDestroy {
  category: Category = { id: '', category: '' };
  isEditing = false;
  isLoading: boolean = true;
  isSaving: boolean = false;
  message : string = "";
  titleInput: string = "Nombre de la categoría";
  messageSelect : string = "Campo es requerido.";
  private destroy$ = new Subject<void>();

  constructor(
    private categoryService: NequiTaskService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditing = true;
      this.loadCategory(id);
    } else {
      this.isLoading = false;
    }
  }

  loadCategory(id: string) {
    this.categoryService.getCategoryById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        if (category) {
          this.category = category;
        } else {
          this.message='Categoría no encontrada';
          this.router.navigate(['/category-list']);
        }
        this.isLoading = false;
      });
  }

  saveCategory() {
    if (!this.category.category || this.category.category.trim() === '') {
      this.message = 'El nombre de la categoría no puede estar vacío';
      return;
    }

    this.isSaving = true;
    if (this.isEditing) {
      this.categoryService.updateCategory(this.category).then(() => {
        this.alertService.presentAlert("¡Categoría editada con exito!");
        this.router.navigate(['/category-list']);
      }).finally(() => {
        this.isSaving = false;
      });
    } else {
      this.categoryService.addCategory(this.category).then(() => {
        this.alertService.presentAlert("¡Categoría Creada con exito!");       
        this.router.navigate(['/category-list']);
      }).finally(() => {
        this.isSaving = false;
        this.category.category = "";
      });
    }
  }

  ngOnDestroy() {
    // Cancelar todas las suscripciones activas
    this.destroy$.next();
    this.destroy$.complete();
  }
}
