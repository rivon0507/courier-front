import { Component, OnInit, ViewChild, inject, effect, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Reception } from '../models/reception.model';
import { ReceptionStore } from '../data/reception.store';
import { ReceptionFormDialogComponent } from '../components/reception-form-dialog.component';
import { MatCard, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-reception-page',
  templateUrl: './reception.page.html',
  styleUrl: './reception.page.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDialogModule, MatCard, MatCardHeader],
})
export class ReceptionPage implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private store = inject(ReceptionStore);
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<Reception>();
  displayedColumns = ['dateReception', 'expediteur', 'reference'];

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
  }

  openReceptionForm(item?: Reception): void {
    const dialogRef = this.dialog.open(ReceptionFormDialogComponent, {
      width: '500px',
      data: item || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          this.store.update(item.reference, result);
        } else {
          this.store.create(result);
        }
      }
    });
  }
}
