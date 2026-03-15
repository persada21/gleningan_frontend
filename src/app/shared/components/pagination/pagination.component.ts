/**
 * Shared Pagination Component
 * Encapsulates pagination UI and logic to follow DRY principles.
 */
class PaginationController {
    total!: number;
    currentPage!: number;
    perPage!: number;
    onPageChange!: (params: { page: number }) => void;
    onPerPageChange!: (params: { perPage: number }) => void;

    // Options for the per-page selector
    perPageOptions = [
        { value: 10, label: '10 per page' },
        { value: 20, label: '20 per page' },
        { value: 50, label: '50 per page' }
    ];

    get totalPages(): number {
        return Math.ceil((this.total || 0) / (this.perPage || 10)) || 1;
    }

    triggerPerPageChange() {
        if (this.onPerPageChange) {
            this.onPerPageChange({ perPage: this.perPage });
        }
    }
}

angular.module('gleniganApp').component('appPagination', {
    templateUrl: 'app/shared/components/pagination/pagination.component.html',
    controller: PaginationController,
    bindings: {
        total: '<',
        currentPage: '<',
        perPage: '<',
        onPageChange: '&',
        onPerPageChange: '&'
    }
});
