import { Component, OnInit, ViewChild, inject, effect, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Envoi } from '../models/envoi.model';
import { EnvoiStore } from '../data/envoi.store';

@Component({
  selector: 'app-envoi-page',
  templateUrl: './envoi.page.html',
  styleUrl: './envoi.page.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class EnvoiPage implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private store = inject(EnvoiStore);

  dataSource = new MatTableDataSource<Envoi>();
  displayedColumns = ['id', 'dateEnvoi', 'observation', 'destinataire'];

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
  }
}
