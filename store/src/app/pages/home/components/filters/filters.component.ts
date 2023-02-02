import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [
  ]
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;
  
  constructor(private readonly _storeService: StoreService){}
  
  ngOnInit(): void {
    this.categoriesSubscription = this._storeService.getAllCategories()
    .subscribe((res)=>this.categories = res);
  }

  onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

}
