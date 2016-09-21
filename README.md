FB Messenger Bot Boilerplate

A simple and unopionated boilerplate messenger bot built with NodeJS and web requests + MongoDB support baked in.

Simply modify the API and app keys you can access at <a href="https://developers.facebook.com/products/messenger">Facebook's Messenger section of their dev site</a>.

If you want to access an external API, simply modify the URL variable and set it to send the correct data. You can use regex or simply cutting a substring to parse for data.
My example API use calls a fictitous web service to send location information for a given date and time to the user.

This is fully extensible, and you can even build a full website on top of this as ExpressJS is built in.
