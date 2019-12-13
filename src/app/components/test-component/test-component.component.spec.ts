import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TestComponentComponent } from './test-component.component';

describe('TestComponentComponent', () => {
  let component: TestComponentComponent;
  let fixture: ComponentFixture<TestComponentComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponentComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentComponent);
    component = fixture.componentInstance;
    component.element = 'test element'; // => For @input
    // For @output => spyOn(component.onchange, 'emit');
    
    de = fixture.debugElement.query(By.css('form'))
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component['submit24']()).toEqual(1234);
  });

  it('should submit', () => {
    component.submit();
    expect(component.submitted).toBeTruthy();
    expect(component.element).toEqual('test element');
  });

  it('should call submit method', () => {
    fixture.detectChanges();
    spyOn<any>(component, 'submit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submit).toHaveBeenCalledTimes(0);
  });

  it('form invalid', () => {
    component.testForm.controls['email'].setValue('');
    component.testForm.controls['name'].setValue('');
    component.testForm.controls['password'].setValue('');
    expect(component.testForm.valid).toBeFalsy();
  });

  it('form valid', () => {
    component.testForm.controls['email'].setValue('test@test.com');
    component.testForm.controls['name'].setValue('name');
    component.testForm.controls['password'].setValue('password');
    expect(component.testForm.valid).toBeTruthy();
  });

});
