#!/bin/bash
imagename=nginx-agent
container=nginx-agent
echo "执行docker ps"
docker ps
if [[ "$(docker inspect $container 2> /dev/null | grep $container)" != "" ]]
then
  echo $container "容器存在，停止并删除"
  echo "docker stop"
  docker stop $container
  docker rm $container
else
  echo $container "容器不存在"
fi
# 删除镜像
echo "执行docker images"
docker images ps
if [[ "$(docker images -q $imagename 2> /dev/null)" != "" ]]
then
  echo $imagename '镜像存在，删除它'
  docker rmi $imagename
else
  echo $imagename '不存在'
fi
docker build -t nginx-agent .
echo "执行docker images"
docker images
docker run --name nginx-agent -p 3457:80 -d $imagename
