import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Subscription } from 'rxjs';
import { BaseComponent } from '../../../base/base.component';
import { ConfigService } from '../../../services/config.service';
import { CultureService } from '../../../services/culture.service';
import { AuthenticationModel } from '../../../models/authentication.model';
import { ConfigModel } from '../../../models/config.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'twx-createaccount',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BaseComponent implements OnInit {
  authentication: AuthenticationModel = new AuthenticationModel();
  matcher = new MyErrorStateMatcher();
  errorMessage = '';
  hide_pw = true;
  sub: Subscription;
  @Output() authenticate = new EventEmitter<AuthenticationModel>();
  testMode = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(configService: ConfigService, cultureService: CultureService) {
    super(configService, cultureService);
  }

  ngOnInit() {
  }

  protected onConfigLoaded(value: ConfigModel) {
    if (value) {
      this.config = value;
      this.testMode = this.config.api === '';
    }
  }

  onSignIn() {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      this.errorMessage = 'All fields must be properly defined!';
    } else {
      this.errorMessage = '';
      console.log(this.authentication.username);
      //this.configService.loadProfile(this.authentication.username);
    }
  }

  onKeyEmail(value: string) {
    this.authentication.username = value;
  }

  onKeyPassword(value: string) {
    this.authentication.password = value;
  }
}
