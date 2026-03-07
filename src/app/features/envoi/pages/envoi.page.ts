import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Envoi } from '@domains/envoi/envoi.model';
import { EnvoiStore } from '@domains/envoi/envoi.store';
import { EnvoiPanelComponent } from '@features/envoi/components/envoi-panel.component';
import { DatePipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-envoi-page',
  templateUrl: './envoi.page.html',
  styleUrl: './envoi.page.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDialogModule, DatePipe, MatIcon],
})
export class EnvoiPage implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private store = inject(EnvoiStore);
  displayedColumns = ['dateEnvoi', 'reference', 'destinataire', 'actions'];

  dataSource = new MatTableDataSource<Envoi>();
  private dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.envois();
    });
  }

  ngOnInit(): void {
    this.store.load();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property: string) => {
      if (property == "reference" || property == "destinataire") return item[property].toLowerCase();
      return item[property as keyof Envoi];
    };
  }

  protected trackById(_index: number, item: Envoi): number {
    return item.id;
  }

  protected openDetails(row: Envoi) {
    this.dialog.open(EnvoiPanelComponent, {
      minWidth: '40vw',
      data: {envoi: row, mode: "view"},
      panelClass: ['drawer-dialog', 'drawer-right'],
      position: {right: '0'},
    });
  }
}
