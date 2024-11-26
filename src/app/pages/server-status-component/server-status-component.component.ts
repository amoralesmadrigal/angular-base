import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Subscription } from 'rxjs/internal/Subscription';
import { ServerStatusServiceService } from 'src/app/services/server-status-service.service';

@Component({
  selector: 'app-server-status-component',
  templateUrl: './server-status-component.component.html',
  styleUrls: ['./server-status-component.component.css']
})
export class ServerStatusComponentComponent implements OnInit, OnDestroy{
  private statusSubscription!: Subscription;
  serverStatus: any;
  
  constructor(private serverStatusService: ServerStatusServiceService){}

  ngOnInit(): void {
    // Ejecutar cada 10 minutos
    this.statusSubscription = interval(600000) 
      .pipe(
        switchMap(() => this.serverStatusService.getStatus())
      )
      .subscribe(
        (status) => {
          this.serverStatus = status; 
          console.log('Estado del servidor:', this.serverStatus);
        },
        (error) => {
          console.error('Error al verificar el estado del servidor:', error);
        }
      );
  }

  ngOnDestroy(): void {
    
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

}
