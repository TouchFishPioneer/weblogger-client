rm dist.tar.gz
rm -rf dist
npm run build
tar -zcvf dist.tar.gz dist
scp dist.tar.gz alinode:/var/www/weblogger/
rm dist.tar.gz
