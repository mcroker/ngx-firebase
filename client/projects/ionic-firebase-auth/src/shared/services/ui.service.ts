import { forwardRef, Inject, Injectable } from '@angular/core';
import {
    ILegalityDialogUIProvider, AuthLegaliyDialogUIProiderToken,
    IAlertsUIProvider, ILoadingUIProvider, IToastUIProvider, AuthAlertsUIProviderToken,
    AuthLoadingUIProviderToken, AuthToastUIProviderToken, IUIProvider
} from '../interfaces';
import { FirebaseService } from './firebase.service';

function isError(x: any): x is Error {
    return x && x.code && x.message;
}

@Injectable({ providedIn: 'root' })
export class UiService implements IUIProvider {

    toast = this.toastService.toast.bind(this.toastService);
    createToast = this.toastService.createToast.bind(this.toastService);
    errorToast = this.toastService.errorToast.bind(this.toastService);

    okAlert = this.alertService.okAlert.bind(this.alertService);
    infoAlert = this.alertService.infoAlert.bind(this.alertService);
    errorAlert = this.alertService.errorAlert.bind(this.alertService);
    textboxInputAlert = this.alertService.textboxInputAlert.bind(this.alertService);
    yesNoAlert = this.alertService.yesNoAlert.bind(this.alertService);

    createLoading = this.loadingService.createLoading.bind(this.loadingService);
    watchLoading = this.loadingService.watchLoading.bind(this.loadingService);

    confirmTos = this.legalityDialog.confirmTos.bind(this.legalityDialog);

    constructor(
        @Inject(forwardRef(() => AuthToastUIProviderToken)) private toastService: IToastUIProvider,
        @Inject(forwardRef(() => AuthAlertsUIProviderToken)) private alertService: IAlertsUIProvider,
        @Inject(forwardRef(() => AuthLoadingUIProviderToken)) private loadingService: ILoadingUIProvider,
        @Inject(forwardRef(() => AuthLegaliyDialogUIProiderToken)) private legalityDialog: ILegalityDialogUIProvider,
        private fire: FirebaseService
    ) {
    }

    logError(error: Error | string, messagePrefix?: string | null) {
        const eObj = isError(error) ? error : new Error(error);
        console.log(error);
        this.fire.recordException(eObj);
        if (messagePrefix !== null) {
            this.toastService.errorToast(eObj, messagePrefix);
        }
    }

    async fnWithLoading(fn: Function, message?: string) {
        const loading = await this.loadingService.createLoading(message);
        await loading.present();
        try {
            await fn();
            await loading.dismiss();
        } catch (error) {
            await loading.dismiss();
            throw error;
        }
    }

}
