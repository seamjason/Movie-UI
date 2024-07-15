
var dataTable;
$(document).ready(function () {
    //var pageData = api.getMovies().data;
    //var count = api.getTotalCount();
    var genres = api.getGenres();
    $('#genre')
        .append('<option value="">All</option>')
        .on("change", function () {
            dataTable.ajax.reload();
        });
    $.each(genres, function (index, element) {
        $('#genre').append('<option value="' + element.title + '">' + element.title + ' (' + element.movies.length + ')' + '</option>');
    });
    dataTable = $('#table').DataTable(
        {
            pageLength: 25,
            lengthMenu: [10, 25, 50, 100],
            ajax: function (data, callback, settings) {
                var currentPage = 1;
                var pageLength = 25;               
                var totalRecords = api.getTotalCount();
                var genre = $('#genre').val();
                var search = $('#table').dataTable().api().search();
                if (dataTable) {
                    currentPage = dataTable.page.info().page + 1;
                    pageLength = dataTable.page.info().length;
                };
                var json = {                    
                    recordsTotal: totalRecords,
                    recordsFiltered: (search.length > 0 || genre != "All" ? api.getFilteredCount(search, genre) : totalRecords),
                    data: api.getMovies(currentPage, pageLength, search, genre).data
                }
                //var movieData = api.getMovies()
                callback(json);
                },
            serverSide: true,
            columns: [
                {
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                },
                { "title": "ID", "data": "id", visible: false},
                { "title": "Title", "data": "title", class: "cell" },
                { "title": "Rating", "data": "rating", defaultContent: "", class: "cell" },
                {
                    "title": "Poster", "data": "posterUrl", defaultContent: "", class: "cell", render:
                        function (data, type, columns, meta) {
                            cellValue = "<a target='_blank' href='" + data + "'>Show &gt;</a>";
                            return cellValue;
                        }                        
                }
            ],
            order: [[1, 'asc']]
        }
    );

    dataTable.on('click', 'td.dt-control', function (e) {
        let tr = e.target.closest('tr');
        let row = dataTable.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
        }
    });
});

function format(d) {
    var movieData = api.getMovie(d.id);
    var actors = '';
    $.each(movieData.mainActors, function (index, element) {
        actors += element + ', ';
    });
    actors = actors.slice(0, -2);

    var directors = '';
    $.each(movieData.directors, function (index, element) {
            directors += element + ', ';
    });
    directors = directors.slice(0, -2);

    var genres = '';
    $.each(movieData.genres, function (index, element) {
        genres += element.title + ', ';
    });
    genres = genres.slice(0, -2);

    // `d` is the original data object for the row
    return (
        '<div class="movieDetail">' +
        '<table>' +
        '<tr>' +
        '<td rowspan="7" class="poster">' +
        '<img style="max-width: 60px;" src="' + movieData.posterUrl + '" alt="' + movieData.title + '" />' +
        '</td>' +
        '<td colspan="6" class="info title">' + movieData.title +
        ' (' + String(movieData.datePublished).substr(0, 4) + ')' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="6" class="info rating">' +
        movieData.ratingValue + ' out of 10' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="6" class="info">' + genres + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td class="label">Rated</td>' +
        '<td class="info">' + movieData.rating + '</td>' +
        '<td colspan="4"/>' +
        '</tr>' +
        '<tr>' +
        '<td class="label">Starring:</td>' +
        '<td class="info">' + actors + '</td>' +
        '<td colspan="4"/>' +
        '</tr>' +
        '<tr>' +
        '<td class="label">Directed by:</td>' +
        '<td class="info">' + directors + '</td>' +
        '<td colspan="4"/>' +
        '</tr>' +
        '<tr>' +
        '<td class="summary" colspan="6">' + movieData.summary + '</td>' +
        '</tr>' +
        '</table>' +
        '</div>'
    );
}