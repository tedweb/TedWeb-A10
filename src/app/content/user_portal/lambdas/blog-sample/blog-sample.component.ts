import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';

import { BlogModel } from '../../models/blog.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'twx-blog-sample',
  templateUrl: './blog-sample.component.html',
  styleUrls: [
    './blog-sample.component.css',
    '../../user-portal.scss'
  ]
})
export class BlogSampleComponent implements OnInit {

  @ViewChild('name', { static: true }) name: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  urlPath: string = 'https://niejiuhwe6.execute-api.us-east-1.amazonaws.com/prod/';
  urlResource = '/blogs';
  languages: string[] = ['C# .Net', 'Python', 'Node JS'];
  language: string;
  errorMessage = '';
  stopWatchCaption: string = '00:00:0000';
  time: Date = null;
  loading: boolean = false;
  displayedColumns: string[] = ['select', 'Name', 'Email', 'Content', 'Language', 'Duration', 'CreatedTimestamp'];
  blogData: any;
  showForm: boolean = false;
  selection = new SelectionModel<BlogModel>(true, []);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  messageFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.language = this.languages[0];
    this.getBlogs();
    this.sort.active = "CreatedTimestamp";
    this.sort.direction = 'desc';
  }

  onSelectItem(row) {
    this.selection.toggle(row);
  }

  onCancelSave(): void {
    this.clear();
    this.showForm = false;
  }

  onRefresh(): void {
    this.getBlogs();
  }

  onGetNew():void {
    this.showForm = true;
    this.name.nativeElement.focus();
  }

  onSaveNew():void {
    this.saveBlog();
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      this.saveBlog();
    }
  }

  onDelete():void {
    this.deleteBlogs();
  }

  toggleStopWatch():void {
    this.loading = !this.loading;

    if (this.loading) {
      this.time = new Date();
      this.incrementStopWatch();
    }
  }

  disableForm(): void {
    this.nameFormControl.disable();
    this.emailFormControl.disable();
    this.messageFormControl.disable();
  }

  enableForm():void {
    this.nameFormControl.enable();
    this.emailFormControl.enable();
    this.messageFormControl.enable();
  }

  incrementStopWatch(): void {
    if (this.loading) {
      setTimeout(() => {
        var currentTime = new Date();
        var timeDiff = currentTime.getTime() - this.time.getTime();
        var secs = Math.floor(timeDiff / 1000);
        var tenths = Math.floor(timeDiff % 1000);
        this.stopWatchCaption = this.pad(secs, 2) + ":" + this.pad(tenths, 3);
        this.time = secs >= 60 ? currentTime : this.time; 
        this.incrementStopWatch();
      }, 10);
    } 
  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  clear(): void {
    this.nameFormControl.reset();
    this.emailFormControl.reset();
    this.messageFormControl.reset();
    this.nameFormControl.markAsUntouched();
    this.emailFormControl.markAsUntouched();
    this.messageFormControl.markAsUntouched();
    this.errorMessage = '';
  }

  saveBlog(): void {
    if (this.emailFormControl.invalid || this.nameFormControl.invalid || this.messageFormControl.invalid) {
      this.errorMessage = 'All fields must be properly defined!';
    } else {
      this.errorMessage = '';
      this.toggleStopWatch();
      this.disableForm();

      var url = this.getUrl();
      var blog = new BlogModel();
      blog.Email = this.emailFormControl.value;
      blog.Name = this.nameFormControl.value;
      blog.Content = this.messageFormControl.value;
      blog.Language = this.language;
      blog.Duration = "0";
      this.disableForm();


      // Create record...
      this.httpClient.post(url, blog)
        .subscribe(
          data => {
            blog.Id = data['Id'];
            blog.Duration = this.stopWatchCaption;
            blog.CreatedTimestamp = data['CreatedTimestamp'];

            this.httpClient.put(url, blog)
              .subscribe(
                data => {
                  this.toggleStopWatch();
                  this.showForm = false;
                  this.clear();
                  this.getBlogs();
                  this.enableForm();
                },
                error => {
                  this.toggleStopWatch();
                  this.showForm = false;
                  this.enableForm();
                  console.log("Error", error);
                }
              );

          },
          error => {
            this.toggleStopWatch();
            this.showForm = false;
            this.enableForm();
            console.log("Error", error);
          }
      );



    }
  }

  deleteBlogs(): void {
    var payload: string[] = [];
    for (let i = 0; i < this.selection.selected.length; i++) {
      payload.push(this.selection.selected[i]["Id"]);
    }

    if (payload.length > 0) {
      this.disableForm();
      this.toggleStopWatch();

      var url = this.getUrl();
      this.httpClient.request('delete', url, { body: payload })
        .subscribe(
          data => {
            this.toggleStopWatch();
            this.clear();
            this.getBlogs();
            this.enableForm();
            this.selection.clear();
            this.showForm = false;
          },
          error => {
            this.toggleStopWatch();
            this.clear();
            this.enableForm();
            this.selection.clear();
            this.showForm = false;
            console.log("Error", error);
          }
        );
    }
  }


  getBlogs():void {
    this.errorMessage = '';
    this.toggleStopWatch();
    this.disableForm();

    var url = this.getUrl();
    this.httpClient.get<BlogModel[]>(url)
      .subscribe(
        data => {
          this.toggleStopWatch();
          //this.blogData = new MatTableDataSource(data.Items);
          this.blogData.sort = this.sort;
          this.clear();
          this.enableForm();
          console.log("GET Request is successful ");
        },
        error => {
          this.toggleStopWatch();
          this.enableForm();
          console.log("Error", error);
        }
      );
  }

  getUrl(): string {
    var lang = 'cs';

    switch (this.language) {
      case this.languages[0]:
        lang = 'cs';
        break;

      case this.languages[1]:
        lang = 'py';
        break;

      case this.languages[2]:
        lang = 'njs';
        break;

      default:
        lang = 'cs';
        break;
    }

    
    return this.urlPath + lang + this.urlResource;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.blogData.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    return this.selection.selected.length > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.blogData.data.forEach(row => this.selection.select(row));
  }
}

