import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDialogViewComponent } from './message-dialog-view.component';

describe('MessageDialogViewComponent', () => {
  let component: MessageDialogViewComponent;
  let fixture: ComponentFixture<MessageDialogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageDialogViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
