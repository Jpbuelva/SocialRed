import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mypost } from 'src/app/shared/models/myPost.interface';
import { MypostService } from '../../mypost.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  private image: any;
  value: Mypost;
  formSave: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private mypostService: MypostService) {

    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state?.value;
    this.initForm();

  }

  ngOnInit(): void {
    if (typeof this.value === 'undefined') {
      this.router.navigate(['new']);

    } else {
      this.formSave.patchValue(this.value);
    }

  }
  onSave() {
    if (this.formSave.valid) {
 
      const post = this.formSave.value;
      const id = this.value?.id || null;
      this.mypostService.prePost(post, this.image );
      this.formSave.reset();
      this.router.navigate(['mypost']);


    }

  }
  isValidField(field: string): string {
    const valid = this.formSave.get(field);
    return (!valid.valid && valid.touched)
      ? 'is-invalid' : valid.touched ? 'is-valid' : '';
  }
  private initForm(): void {
    this.formSave = this.fb.group({
      titlePost: ['', [Validators.required]],
      contentPost: ['', [Validators.required]],
      imagePost: ['', [Validators.required]]
    });
  }

  handleImagen(event: any): void {
    this.image = event.target.files[0];
    console.log('Imagen', this.image);
  }

}
