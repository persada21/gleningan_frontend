/**
 * Projects List Component
 * Handles logic + state for the Projects dashboard.
 */
class ProjectsListController {
    static $inject = ['ProjectService', '$scope', '$routeParams', 'ErrorHandlerService'];

    // State
    projects: any[] = [];
    total: number = 0;
    currentPage: number = 1;
    perPage: number = 10;
    totalPages: number = 0;
    loading: boolean = false;
    error: string | null = null;

    // Filters
    filters: any = {
        keyword: '',
        area: '',
        company_name: ''
    };

    // Keep track of the active filters applied after hitting "Search"
    activeFilters: any = {
        keyword: '',
        area: '',
        company_name: ''
    };

    constructor(
        private projectService: any, 
        private $scope: ng.IScope,
        private $routeParams: angular.route.IRouteParamsService,
        private errorHandler: any
    ) {
        // Pre-fill filter from URL query param if available
        if (this.$routeParams.company_name) {
            this.filters.company_name = this.$routeParams.company_name;
            this.activeFilters.company_name = this.$routeParams.company_name;
        }

        this.loadProjects();
    }

    /**
     * Fetch projects using the current state
     */
    loadProjects(): void {
        this.loading = true;
        this.error = null;

        const queryParams = {
            page: this.currentPage,
            per_page: this.perPage,
            ...(this.activeFilters.keyword && { keyword: this.activeFilters.keyword }),
            ...(this.activeFilters.area && { area: this.activeFilters.area }),
            ...(this.activeFilters.company_name && { company_name: this.activeFilters.company_name })
        };

        this.projectService.getProjects(queryParams)
            .then((data: any) => {
                this.projects = data.items;
                this.total = data.total;
                this.currentPage = data.page;
                this.perPage = data.per_page || this.perPage || 10;
                this.totalPages = Math.ceil(this.total / this.perPage);
            })
            .catch((err: any) => {
                this.errorHandler.handleError(err, "Failed to load projects. Please try again later.");
                this.projects = [];
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
        this.loadProjects();
    }

    resetFilters(): void {
        this.filters = { keyword: '', area: '', company_name: '' };
        this.activeFilters = { keyword: '', area: '', company_name: '' };
        this.currentPage = 1;
        this.loadProjects();
    }

    changePage(newPage: number): void {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.loadProjects();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    onPerPageChange(newPerPage: number): void {
        this.perPage = parseInt(newPerPage as any, 10);
        this.currentPage = 1;
        this.loadProjects();
    }
}

angular.module('gleniganApp').component('projectsList', {
    templateUrl: 'app/features/projects/projects.component.html',
    controller: ProjectsListController,
    controllerAs: 'ctrl'
});

