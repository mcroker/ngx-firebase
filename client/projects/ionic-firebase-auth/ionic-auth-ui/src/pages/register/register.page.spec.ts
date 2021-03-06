import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MalIonicAuthUiModule } from '../../ionic-auth-ui.module';
import { AuthTestingModule } from '../../../../testing';
import { AuthRegisterPage } from './register.page';

describe('AuthRegisterPage', () => {
  let component: AuthRegisterPage;
  let fixture: ComponentFixture<AuthRegisterPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AuthRegisterPage],
      imports: [
        AuthTestingModule,
        MalIonicAuthUiModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
