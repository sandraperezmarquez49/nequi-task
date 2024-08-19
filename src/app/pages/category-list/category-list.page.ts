import { Component, OnInit } from '@angular/core';
import { NequiTaskService } from 'src/app/services/nequi-task/nequi-task.service';
import { Category } from '../../interfaces/nequi-task';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories: Category[] = [];
  title: string = "Lista de categorías";
  message: string = "No hay información de categorías";
  isLoading : Boolean = true;
  constructor(
    private categoryService : NequiTaskService,
    private router: Router, 
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.isLoading = false;
    });
  }

  editCategory(id: string){
    this.router.navigateByUrl(`/category-form/${id}`)
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).then(() => {
      this.refreshCategories();
    });
  }
  

  private refreshCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.isLoading = false;
    });
  }

}
