import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

/**
 * Modal component
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  /**
   * Modal id
   */
  @Input() id: string = 'aq-modal';

  /**
   * Modal inputs
   */
  @Input() title: string = '';
  @Input() description: string = '';

  /**
   * Modal buttons
   */
  @Input() showCloseButton: boolean = true;
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() showCancelButton: boolean = false;
  @Input() okButtonLabel: string = 'Ok';
  @Input() showOkButton: boolean = true;

  /**
   * Modal backdrop. Default static.
   */
  @Input() backdrop: boolean | 'static' = 'static';

  /**
   * Modal emit outputs
   */
  @Output() okButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeButtonClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('aqModal', {static: false}) private aqModal: TemplateRef<any>;

  modalReference: NgbModalRef;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  /**
   * Emit click for modal success button
   */
  onOk(): void {
    this.modalReference.close();
    this.okButtonClick.emit();
  }

  /**
   * Cancel the modal
   */
  onCancel(): void {
    this.modalReference.close();
    this.cancelButtonClick.emit();
  }

  /**
   * Clode the modal
   */
  onClose(): void {
    this.modalReference.close();
    this.closeButtonClick.emit();
  }

  /**
   * Open the modal
   */
  public open(): void {
    this.modalReference = this.modalService.open(
      this.aqModal,
      {
        backdrop: this.backdrop,
        keyboard: false,
        ariaLabelledBy: 'modal-title'
      });
  }

}
