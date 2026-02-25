import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Reception } from '@domains/reception/reception.model';
import { ReceptionStore } from '@domains/reception/reception.store';
import { ReceptionFormDialogComponent } from '../components/reception-form-dialog.component';
import { DatePipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-reception-page',
  templateUrl: './reception.page.html',
  styleUrl: './reception.page.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDialogModule, DatePipe, MatIcon],
})
export class ReceptionPage implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private store = inject(ReceptionStore);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Reception>();
  displayedColumns = ['dateReception', 'reference', 'expediteur', 'actions'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.receptions();
    });
  }

  ngOnInit(): void {
    this.store.load();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property: string) => {
      if (property == "reference" || property == "expediteur") return item[property].toLowerCase();
      return item[property as keyof Reception];
    };
  }

  openReceptionForm(item?: Reception): void {
    const dialogRef = this.dialog.open(ReceptionFormDialogComponent, {
      width: '500px',
      data: item || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          this.store.update(item.id, result);
        } else {
          this.store.create(result);
        }
      }
    });
  }

  protected trackById(_index: number, item: Reception): number {
    return item.id;
  }
}
