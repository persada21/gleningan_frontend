/**
 * Companies List Component
 * Handles logic + state for the Companies directory.
 */
class CompaniesListController {
    static $inject = ['CompanyService', '$scope', 'ErrorHandlerService'];

    // State
    companies: any[] = [];
    total: number = 0;
    currentPage: number = 1;
    perPage: number = 10;
    totalPages: number = 0;
    loading: boolean = false;
    error: string | null = null;

    // Filters
    filters = {
        keyword: ''
    };

    activeFilters = {
        keyword: ''
    };

    constructor(
        private companyService: any, 
        private $scope: ng.IScope,
        private errorHandler: any
    ) {
        this.loadCompanies();
    }

    /**
     * Fetch companies using the current state
     */
    loadCompanies(): void {
        this.loading = true;
        this.error = null;

        const queryParams = {
            page: this.currentPage,
            per_page: this.perPage,
            ...(this.activeFilters.keyword && { keyword: this.activeFilters.keyword })
        };

        this.companyService.getCompanies(queryParams)
            .then((data: any) => {
                this.companies = data.items || data;
                this.total = data.total || this.companies.length;
                this.currentPage = data.page || 1;
                this.perPage = data.per_page || this.perPage || 10;
                this.totalPages = this.total ? Math.ceil(this.total / this.perPage) : 1;
            })
            .catch((err: any) => {
                this.errorHandler.handleError(err, "Failed to load companies. Please try again later.");
                this.companies = [];
                this.total = 0;
                this.totalPages = 0;
            })
            .finally(() => {
                this.loading = false;
            });
    }

    applyFilters(): void {
        this.activeFilters = angular.copy(this.filters);
        this.currentPage = 1;
        this.loadCompanies();
    }

    resetFilters(): void {
        this.filters = { keyword: '' };
        this.activeFilters = { keyword: '' };
        this.currentPage = 1;
        this.loadCompanies();
    }

    changePage(newPage: number): void {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.loadCompanies();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    onPerPageChange(newPerPage: number): void {
        this.perPage = parseInt(newPerPage as any, 10);
        this.currentPage = 1;
        this.loadCompanies();
    }
}

angular.module('gleniganApp').component('companiesList', {
    templateUrl: 'app/features/companies/companies.component.html',
    controller: CompaniesListController,
    controllerAs: 'ctrl'
});

