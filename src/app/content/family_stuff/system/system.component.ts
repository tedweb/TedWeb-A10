import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'twx-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  sendToEmail: string;
  sendFromEmail: string;
  subjectEmail: string;
  messageEmail: string = '';
  matcher = new MyErrorStateMatcher();

  emailFromFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  emailToFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  textSubjectFormControl = new FormControl('', [
    Validators.required
  ]);

  textMessageFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSave() {
    console.log('saving...');
  }

  onSend() {
    console.log('sending email to: ' + this.sendToEmail);
    this.send();
  }

  onKeyEmailTo(event: any) {
    this.sendToEmail = event.target.value;
  }

  onKeyEmailFrom(event: any) {
    this.sendFromEmail = event.target.value;
  }

  onKeyEmailSubject(event: any) {
    this.subjectEmail = event.target.value;
  }

  onKeyEmailMessage(event: any) {
    this.messageEmail = event.target.value;
  }


  send() {
    // Needs to be implemented.
  }
}
