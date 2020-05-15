import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoEditComponent } from './aluno-edit.component';

describe('AlunoEditComponent', () => {
  let component: AlunoEditComponent;
  let fixture: ComponentFixture<AlunoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
