
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment/payment.service';


declare var bootstrap: any;

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  @Input() payment: any = {};
  @Input() isEditMode: boolean = false;
  @Output() paymentUpdated = new EventEmitter<void>();
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService
  ) {
    this.paymentForm = this.fb.group({
      booking_id: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      payment_date: ['', Validators.required],
      payment_method: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.payment) {
      this.paymentForm.patchValue(this.payment);
    }
  }

  submitForm() {
    if (this.paymentForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      const updatedPayment = { ...this.payment, ...this.paymentForm.value };
      this.paymentService.updatePayment(updatedPayment).subscribe(() => {
        this.paymentUpdated.emit();
        this.closeModal();
      });
    } else {
      this.paymentService.createPayment(this.paymentForm.value).subscribe(() => {
        this.paymentUpdated.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addEditPaymentModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
}
