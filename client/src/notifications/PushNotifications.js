import Push from "push.js";

class PushNotifications {

    pushAssembleNotification(orderId, isAssembled) {
        var isAssembledString = "";
        if (isAssembled) {
            isAssembledString = "Shutter has been assembled."
        } else {
            isAssembledString = "Shutter hasn't been assembled yet."
        }

        Push.create(isAssembledString, {
            body: "Order ID: " + orderId,
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

    pushInvoiceNotification(orderId, isInvoiced) {
        var isInvoicedString = "";
        if (isInvoiced) {
            isInvoicedString = "Invoice has been created."
        } else {
            isInvoicedString = "Invoice has been not created."
        }

        Push.create(isInvoicedString, {
            body: "Order ID: " + orderId,
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

    pushPayNotification(orderId, isPaid) {
        var isPaidString = "";
        if (isPaid) {
            isPaidString = "Payment has been completed successfully."
        } else {
            isPaidString = "Payment hasn't been completed successfully."
        }

        Push.create(isPaidString, {
            body: "Order ID: " + orderId,
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

}

export default new PushNotifications();