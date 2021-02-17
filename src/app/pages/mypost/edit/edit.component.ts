import { Mypost } from './../../../shared/models/myPost.interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MypostService } from '../../mypost.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  value: Mypost;
  formEdit: FormGroup;
  constructor(
    private router: Router,
    private mypostService: MypostService,
    private fb: FormBuilder) {

    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state?.value;
    this.initForm();

  }

  ngOnInit(): void {
    if (typeof this.value === 'undefined') {
      this.router.navigate(['new'])

    } else {
      this.formEdit.patchValue(this.value);
    }

  }
  onSave() {
    if (this.formEdit.valid) {
      const post = this.formEdit.value;
      const id = this.value?.id || null;
      this.mypostService.save(post, id);
      this.formEdit.reset();
      this.router.navigate(['mypost']);

    }

  }

  private initForm(): void {
    this.formEdit = this.fb.group({
      titlePost: ['', [Validators.required]],
      contentPost: ['', [Validators.required]]
    });
  }
}
