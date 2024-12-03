import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStatusComponentComponent } from './server-status-component.component';

describe('ServerStatusComponentComponent', () => {
  let component: ServerStatusComponentComponent;
  let fixture: ComponentFixture<ServerStatusComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ServerStatusComponentComponent]
});
    fixture = TestBed.createComponent(ServerStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
