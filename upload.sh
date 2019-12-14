#!/bin/bash

rootPath=$PWD

npm run build
echo '已打包'

sleep 1

# 上传 dist/* 到远程
scp -r ${rootPath}/dist/* root@39.106.53.163:/home/ran/www/base/
echo '已更新'