import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attraction } from '../../../../core/models/attraction.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit, OnChanges {
  @Input() attraction: Attraction | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Attraction>();

  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      tel: ['', [Validators.pattern('^[^\u4e00-\u9fa5]*$')]] // 排除中文的正則表達式
    });
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attraction'] && this.attraction) {
      this.updateForm();
    }
  }

  updateForm(): void {
    if (this.attraction) {
      this.editForm.patchValue({
        name: this.attraction.name,
        tel: this.attraction.tel
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.attraction) {
      const updatedAttraction = {
        ...this.attraction,
        ...this.editForm.value
      };
      this.save.emit(updatedAttraction);
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
