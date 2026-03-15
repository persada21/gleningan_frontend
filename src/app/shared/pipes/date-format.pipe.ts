/**
 * Date Format Pipe (Filter)
 * Converts ISO date strings to human-readable format.
 */
angular.module('gleniganApp').filter('dateFormat', function() {
    return function(input: any) {
        if (!input) return '';
        const date = new Date(input);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };
});
