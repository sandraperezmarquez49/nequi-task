export interface Task {
    id: string;
    title: string;
    completed: boolean;
    categoryId?: string;
    description: string;
    expanded?: boolean;
}
  
 export interface Category {
    id: string;
    category: string;
}

  