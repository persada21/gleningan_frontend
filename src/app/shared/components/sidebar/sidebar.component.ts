/**
 * Sidebar Component
 * Handles side navigation and active state highlighting.
 */
class SidebarController {
    static $inject = ['$location'];
    constructor(private $location: angular.ILocationService) {}

    isActive(viewLocation: string) {
        return viewLocation === this.$location.path();
    }
}

angular.module('gleniganApp').component('sidebarNav', {
    templateUrl: 'app/shared/components/sidebar/sidebar.component.html',
    controller: SidebarController
});
