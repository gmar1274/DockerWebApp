import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { finalize, share } from 'rxjs/operators';
import { NEVER, defer } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerOverlayService {
    private overlayRef: OverlayRef = undefined;

    constructor(private overlay: Overlay) { }
    public readonly spinner$ = defer(() => {
        this.show();
        return NEVER.pipe(
            finalize(() => {
                this.hide();
            })
        );
    }).pipe(share());
    public show(): void {
        //console.log('SpinnerOverlayService ~ show spinner');
        // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
        Promise.resolve(null).then(() => {
            this.overlayRef = this.overlay.create({
                positionStrategy: this.overlay
                    .position()
                    .global()
                    .centerHorizontally()
                    .centerVertically(),
                hasBackdrop: true,
            });
            this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
        });
    }

    public hide(): void {
        //console.log('SpinnerOverlayService ~ hide spinner');
        this.overlayRef.detach();
        this.overlayRef = undefined;
    }

}