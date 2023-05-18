import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DemoConfig} from "../shared/configs";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent {
    public form: FormGroup;
    demoConfigs = DemoConfig;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
        name: ["", [Validators.required]],
        description: ["", Validators.required],
        lastName: [""],
        email: ["", [Validators.required]]
    });
  }

  submit() {

  }
}
