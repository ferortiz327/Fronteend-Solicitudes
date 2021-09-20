

import { IconAlerts } from 'src/app/global/constants/GlobalEnums';
import { AlertsTitles } from 'src/app/global/constants/AlertsTitles';
import { Messages } from 'src/app/global/constants/Messages';
import { AlertSetting } from 'src/app/global/constants/AlertSetting';
import Swal from 'sweetalert2';

export class AlertUtilities {

  static showAlert(parameters: { title?: string, message?: string, icon?: IconAlerts, functionAfterConfirm?: () => any } = {}): void {
    Swal.fire({
      icon: parameters.icon || IconAlerts.success,
      title: parameters.title || AlertsTitles.DEFAULT_ALERT_TITLE,
      text: parameters.message || Messages.DEFAULT_ALERT_MESSAGE,
      allowOutsideClick: false
    }).then(result => {
      if (result.isConfirmed && parameters.functionAfterConfirm) {
        parameters.functionAfterConfirm();
      }
    });
  }

  static showAlertConfirm(parameters: {
    title?: string,
    message?: string,
    functionAfterConfirm?: () => any,
    functionAfterCancel?: () => any,
    textToConfirmButton?: string,
    textToCancelButton?: string
  } = {}): void {
    Swal.fire({
      icon: IconAlerts.question,
      title: parameters.title || AlertsTitles.DEFAULT_ALERT_TITLE,
      text: parameters.message || Messages.DEFAULT_ALERT_MESSAGE,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: parameters.textToConfirmButton || "Si",
      cancelButtonText: parameters.textToConfirmButton || "Cancelar",

    }).then(result => {
      if (result.isConfirmed && parameters.functionAfterConfirm) {
        parameters.functionAfterConfirm();
      }
      else if (result.isDismissed && parameters.functionAfterCancel) {
        parameters.functionAfterCancel();
      }
    });
  }

  static showQueueAlert(alertList: AlertSetting[]): void {
    alertList.forEach(alert => {
      alert.icon = alert.icon || IconAlerts.warning
      alert.allowOutsideClick = alert.allowOutsideClick || false;
    })
    //Swal.queue(alertList);

  }


}
