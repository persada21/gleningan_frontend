/**
 * Error Handler Service
 * Centralizes error logging and user notifications.
 */
class ErrorHandlerService {
    static $inject = ['$log'];
    constructor(private $log: angular.ILogService) {}

    handleError(error: any, message: string = 'An unexpected error occurred') {
        this.$log.error(message, error);
        // In a real app, this might show a toast or modal
        alert(message);
    }
}

angular.module('gleniganApp').service('ErrorHandlerService', ErrorHandlerService);
