#Deploying

1. Build Next JS

    ```$bash
    next build && next export && cd out
    ```

2. Remove HTML extension from files
    ```$bash
   for old in *.html; do mv $old `basename $old .html`; done
    ```

3. Restore HTML extension for index
    ```$bash
    mv index index.html
    ```

4. Copy Files to S3
    ```$bash
    aws s3 sync ./imgs/{FOLDER} s3://www.patriciaoconnor.com/imgs/{FOLDER}
    aws s3 sync ./_next s3://www.patriciaoconnor.com/_next
    aws s3 sync . s3://www.patriciaoconnor.com --exclude "*.DS_Store*" --exclude "imgs/*" --exclude "_next/*" --content-type "text/html"
    ```

    *Note:* If you need to copy images too, just remove the exclude at the end of the above command.

5. All new html files need to have the Content-Type header set in S3.
