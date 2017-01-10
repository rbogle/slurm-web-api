## Slurm Web UI
This is a project to provide a web interface to the Slurm cluster manager via
the slurm_rest_api.

This project uses bootstrap and angularjs to provide a single-page dashboard app

### Deploying
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
