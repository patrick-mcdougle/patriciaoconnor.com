#Deploying

1. Build Next JS

    ```$bash
    next build && next export && cd out
    ```

1. Remove HTML extension from files
    ```$bash
   for old in *.html; do mv $old `basename $old .html`; done
    ```

1. Restore HTML extension for index
    ```$bash
    mv index index.html
    ```

1. Copy Files to S3
    ```$bash
    aws s3 sync . s3://www.patriciaoconnor.com --metadata-directive COPY --exclude "*.DS_Store*" --exclude "imgs/*"
    ```

    *Note:* If you need to copy images too, just remove the exclude at the end of the above command.

1. All new html files need to have the Content-Type header set in S3.
