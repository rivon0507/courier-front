import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { EnvoiDataSource, EnvoiItem } from './envoi-datasource';

@Component({
  selector: 'app-envoi',
  templateUrl: './envoi.component.html',
  styleUrl: './envoi.component.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class EnvoiComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EnvoiItem>;
  dataSource = new EnvoiDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'dateEnvoi', 'observation', 'destinataire',];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
