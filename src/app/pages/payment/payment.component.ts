
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { AddPaymentComponent } from './add-payment/add-payment.component';

declare var bootstrap: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];
  selectedPayment: any;
  isEditMode: boolean = false;

  @ViewChild(AddPaymentComponent) addEditPaymentModal!: AddPaymentComponent;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getPayments().subscribe((payments) => {
      this.payments = payments;
    });
  }

  openAddPaymentModal() {
    this.isEditMode = false;
    this.selectedPayment = null;
    const modalElement = document.getElementById('addEditPaymentModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  openEditPaymentModal(payment: any) {
    this.isEditMode = true;
    this.selectedPayment = payment;
    const modalElement = document.getElementById('addEditPaymentModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  deletePayment(payment_id: number) {
    this.paymentService.deletePayment(payment_id).subscribe(() => {
      this.loadPayments();
    });
  }

  onPaymentUpdated() {
    this.loadPayments();
  }
}
