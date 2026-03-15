// src/services/CompanyService.ts

interface CompanyFilters {
    keyword?: string;
    page?: number;
    per_page?: number;
}

class CompanyService {
    static $inject = ['$http'];
    private baseUrl = 'http://127.0.0.1:8000/api/companies';

    constructor(private $http: ng.IHttpService) {}

    /**
     * Fetch companies from the backend with pagination and filters
     */
    getCompanies(filters?: CompanyFilters): ng.IPromise<any> {
        return this.$http.get(this.baseUrl, {
            params: filters || {}
        }).then(response => response.data);
    }

    /**
     * Fetch a single company
     */
    getCompany(id: string): ng.IPromise<any> {
        return this.$http.get(`${this.baseUrl}/${id}`).then(response => response.data);
    }
}

// Register service
angular.module('gleniganApp').service('CompanyService', CompanyService);
