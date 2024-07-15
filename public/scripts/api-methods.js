var bearerToken;
var apiKey;
var baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/';
var api = {
    getToken: function() {
        var url = baseUrl + 'auth/token';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            success: function(response) {
                apiKey = JSON.parse(response).token;
                bearerToken = 'Bearer ' + apiKey;
            }
        });
    },
    getMovies: function (page, limit, search, genre) {
        var movieData = [];
        if (!apiKey) {
            this.getToken();
        }
        var url = baseUrl + 'movies?';
        if (page) {
            url += '&page=' + page;
        }
        if (limit) {
            url += '&limit=' + limit;
        }
        if (search) {
            url += '&search=' + search;
        }
        if (genre) {
            url += '&genre=' + genre;
        }
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
                Authorization: bearerToken
            },
            success: function (response) {
                movieData = JSON.parse(response);
                console.log(JSON.parse(response));
            }
        });
        return movieData;
    },
    getFilteredCount: function (search, genre) {
        var movieData = [];
        if (!apiKey) {
            this.getToken();
        }
        var url = baseUrl + 'movies?';
        url += 'page=1&limit=500&search=' + search;
        if (genre) {
            url += '&genre=' + genre;
        }
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
                Authorization: bearerToken
            },
            success: function (response) {
                movieData = JSON.parse(response).data;
                console.log(JSON.parse(response));
            }
        });
        return movieData.length;
    },
    getTotalCount: function () {
        var movieData = [];
        if (!apiKey) {
            this.getToken();
        }
        var url = baseUrl + 'movies';
        url += '?page=1&limit=500';

        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
                Authorization: bearerToken
            },
            success: function (response) {
                movieData = JSON.parse(response).data;
                console.log(JSON.parse(response));
            }
        });
        return movieData.length;
    },
    getGenres: function () {
        var movieData = [];
        if (!apiKey) {
            this.getToken();
        }
        var url = baseUrl + 'genres/movies';
        url += '?page=1&limit=500';

        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
                Authorization: bearerToken
            },
            success: function (response) {
                movieData = JSON.parse(response).data;
                console.log(JSON.parse(response));
            }
        });
        return movieData;
    },
    getMovie: function (id) {
        var movieData = {};
        if (!apiKey) {
            this.getToken();
        }
        var url = baseUrl + 'movies/' + id;
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
                Authorization: bearerToken
            },
            success: function (response) {
                movieData = JSON.parse(response);
                console.log(JSON.parse(response));
            }
        });
        return movieData;
    },
    showToken: function() {
        this.getToken();
        alert(bearerToken);
    }
}