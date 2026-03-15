// src/services/ProjectService.ts

interface ProjectFilters {
    area?: string;
    keyword?: string;
    company_name?: string;
    page?: number;
    per_page?: number;
}

class ProjectService {
    static $inject = ['$http'];
    private baseUrl = 'http://127.0.0.1:8000/api/projects';

    constructor(private $http: ng.IHttpService) {}

    /**
     * Fetch projects from the backend with pagination and filters
     */
    getProjects(filters: ProjectFilters): ng.IPromise<any> {
        return this.$http.get(this.baseUrl, {
            params: filters
        }).then(response => response.data);
    }
}

// Register service
angular.module('gleniganApp').service('ProjectService', ProjectService);
