import {Duration} from 'moment';

/**
 * Modal configuration skeleton
 */
export interface ModalConfig {
  id: string;
  title: string;
  description: string;
  showCloseButton?: boolean;
  cancelButtonLabel?: string;
  showCancelButton?: boolean;
  okButtonLabel?: string;
  showOkButton?: boolean;
  okButtonClick?: (duration: Duration) => void;
  cancelButtonClick?: (duration: Duration) => void;
  closeButtonClick?: (duration: Duration) => void;
}
