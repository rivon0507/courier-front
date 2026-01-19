import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReceptionDataSource, ReceptionItem } from './reception-datasource';
import { ReceptionFormComponent } from '../reception-form/reception-form.component';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDialogModule]
})
export class ReceptionComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ReceptionItem>;
  dataSource = new ReceptionDataSource();

  private dialog = inject(MatDialog);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dateReception', 'expediteur', 'reference'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openReceptionForm(item?: ReceptionItem): void {
    const dialogRef = this.dialog.open(ReceptionFormComponent, {
      width: '500px',
      data: item || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item) {
          // Update existing item
          const index = this.dataSource.data.indexOf(item);
          if (index !== -1) {
            this.dataSource.data[index] = result;
          }
        } else {
          // Add new item
          this.dataSource.data.push(result);
        }
        this.table.renderRows();
      }
    });
  }
}
