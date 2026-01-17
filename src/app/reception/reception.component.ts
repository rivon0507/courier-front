import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ReceptionDataSource, ReceptionItem } from './reception-datasource';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class ReceptionComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ReceptionItem>;
  dataSource = new ReceptionDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dateReception', 'expediteur', 'reference'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
