# inkinisis

This project follows the coding style guide defined by the [AirBnb Javascript Style Guide](https://github.com/airbnb/javascript).

# Client code notes

## Javascript

- The main script can be found at `/assets/main.jsx`
- The REACT component that defines all REACT routes is the *RouterComponent* defined at `/inkinisis/assets/js/IndexView.jsx`
- The REACT component that renders the main page of the app is the *IndexPage* defined at `/inkinisis/assets/js/IndexPage.jsx`
- Every component that mounts to a DOM element should be named using the keyword *View* as suffix, e.g *IndexView.jsx*
- Every component that represents a page should be named using the keyword *Page* as suffix, e.g *IndexPage.jsx*
- In case a file exports a single class/function, it should be named after the structure it exports

## SASS

The SASS code is structured following the [7-1 architecture pattern](http://sass-guidelin.es/#architecture). More info
can be found in the README file at `/assets/sass`

## HTML

- There are two main layout files:
    - *`/views/layout.hbs`* The layout file contains the DOM element that serves as the mount point of the main View 
    REACT component, that is the *IndexView*
    - *`/views/layout_landing.hbs`* The layout file is only used in the landing page of the app