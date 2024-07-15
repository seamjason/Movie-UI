# Movie-UI

## Overview

This project is a sample coding exercise, meant to serve as a web-based user interface to the open source `movies-api` repository.  The listing contains several helpful features to make searching, filtering, and navigating fairly seamless.

## Project Technology

The project uses the [ExpressJS](https://expressjs.com/) framework, scaffolded using the Visual Studio Node.js/Express template.  It implements the third-party list component from [Datatables.net](https://datatables.net).  It also includes the latest Javascript libraries from [JQuery](https://jquery.com) and [JQuery UI](https://jqueryui.com) for styling.

## Features

The listing has the option to filter by genre, using the drop-down box at the top.  It defaults to "All" genres.

The list uses the built-in paging capabilities provided by the datatable component.  By default, the page size is 25 records (to correspond with the default page size in the API.), however options of 10, 50, and 100 are also available.  Additional columns listed include Rating and a link to the poster graphic.

<em>I would have preferred to include additional columns -- namely the genre, but it likely would have required additional API calls, which may have adversely affected performance.</em>

The footer includes information about the current place in the list, total entries, and navigation buttons.

Clicking the marlett to the left of each row opens detail information about the corresponding movie.  I considered putting this information into a modal box, but chose to use a child row of the datatable for a couple of reasons: given the time constraint, this method saved a little time, and details for multiple movies can be opened simultaneously.  There were other data elements for each movie that were available to include in the details, such as duration, but I chose not to include because of time constraints and styling considerations.  These elements can easily be added if desired, of course.  I'm particularly happy with the layout of the detail pane.

The search box capability mirrors the API search capability, in that it searches based on the title only.

The sorting capabilities of the list are disabled, because as far as I can tell, the API search does not include a sort option.

## Notes

One alternative way this project could be structured would be to pull down all titles on startup/page load, and build the list features on a local, cached dataset.  This would solve the problem of not being able to sort, and would make list navigation and search faster and more full-featured.  In the end, I chose to use a lazy loading method, and only pull data from the server as needed, so that the results can be more real-time, scalable, and initial load would be faster.

I chose to use the REST API features rather than GraphQL, simply because of time constraints.  GraphQL likely would have made performance a little better, and have better search/sort capabilities.

Given more time, I would have improved the overall styling/theme of the page, and would have engineered it to be much more full-featured, solving for some of the limitations noted above.







