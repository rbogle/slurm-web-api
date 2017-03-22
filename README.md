## Slurm Web UI
This is a project to provide a web interface to the Slurm cluster manager via
the slurm_rest_api project found here: [slurm_rest_api](https://github.com/rbogle/slurm-rest-api)

This project uses bootstrap and angularjs to provide a single-page dashboard app.

Warning: There are a few dirty dependencies on slurm and collectd to render this correctly.

### Install and Dependencies
This project uses npm and bower to help with package management
You need to have those installed first.

1. Install NPM, slurm-rest-api

   Exercise left to developer.

   See [slurm_rest_api](https://github.com/rbogle/slurm-rest-api)
  for that repo's instructions.

2. Clone Repo
    ```
    git clone https://github.com/rbogle/slurm-web-api.git
    ```

3. Run NPM, bower

   Run npm install to install the dev server and bower, then our package.json file should trigger bower to download javascript dependencies and place them in app/lib
   
    ```
      npm install

    ```

4. Testing and Development

    The project includes the spec for lite-server. You can start the server with

    ```
    npm start
    ```

    this will open the web app in your broswer on localhost:3000

### Deploy Notes
I deployed this to a subdirectory on an nginx server.

To get correct routing,urls,refresh I found the nginx config had to be like this:
```
location /<baseref>/ {
    alias <docrootpath>/;
    expires -1;
    add_header Pragma "no-cache";
    add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
    try_files $uri index.html =404;
}
```

I also needed to have `<base href=<baseref> /> `in the head of index above any links.

All resource urls in head need to have the baseref added.  
Urls in the html should be relative to ``<baseref>`` i.e.

```
<li><a href="queue">Queue</a></li>
```
results in a url of `http://server/baseref/queue`
