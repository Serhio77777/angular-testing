import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  public model: any = {
    name: '',
    email: '',
    password: ''
  }

  public submitted: boolean = false;

  public testForm: FormGroup;

  private testProp: number = 324234;
  private submit24(): number {
    return 1234;
  }

  @Input('element') element: string = 'test';

  constructor() { 
    this.testForm = new FormGroup({
      name: new FormControl(this.model.name, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.model.name, [Validators.email]),
      password: new FormControl(this.model.name, [Validators.required, Validators.minLength(6)])
    })
  }

  public submit(): void {
    this.submitted = true;
  }

  public ngOnInit(): void {
  }

}
