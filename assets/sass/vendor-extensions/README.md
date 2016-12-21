# Vendor Extensions

Contain Overrides of vendor specific sections can be found under an 8th folder named `vendors-extensions/`. By 
convention, the overrides are saved in a file named after the vendor the overwrite.
 
For instance, `vendors-extensions/_bootstrap.scss` is a file containing all CSS rules intended to re-declare some of 
Bootstrap’s default CSS. This is to avoid editing the vendor files themselves, which is generally not a good idea.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Vendors folder](http://sass-guidelin.es/#vendors-folder)
