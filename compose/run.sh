#!/usr/bin/env bash

opts=':hm:n:'

script_name=${0##*/}
script_dir="$( cd "$( dirname "$0" )" && pwd )"
script_path=${script_dir}/${script_name}

backend=${script_dir}/../backend
frontend=${script_dir}/../frontend
network=formsite
mongo_container=mongodb

usage() {
  echo ""
  echo "kedwards@kevinedwards.ca"
  echo "© LivITy"
  echo ""
  echo "Usage: ${script_name} options"
  echo ""
  echo "options:"
  echo "  -h | print this help menu"
  echo "  -m | mongo_container name"
  echo "  -n | network name"
  echo ""
  exit 1
}

while getopts ${opts} opt
do
  case "$opt" in
    h)  usage
        ;;
    \?)
        usage
        ;;
  esac
done
shift $(($OPTIND - 1))

function createNetwork {
  if [ -z $(docker network ls --filter name=^${1}$ --format="{{ .Name }}") ] ; then 
    docker network create ${1} >/dev/null 2>&1
  fi
}

createNetwork ${network}

for component in backend frontend ; do
  docker run -it \
    --rm \
    -v ${!component}:/home/node/${component} \
    -w /home/node/${component} \
    node:17 yarn install >/dev/null 2>&1
done

# docker container exec -it ${mongo_container} mongorestore --drop --gzip --archive=/data/seed/rtls.init.archive >/dev/null 2>&1

# if [ ! -d ${script_dir}/data/mongodb/data ] ; then
#   docker run -it \
#     --rm \
#     --net formsite \
#     -v $(pwd)/mongo:/dbstuff \
#     mongo mongorestore \
#       -h mongodb \
#       -u localAdmin \
#       -p localAdminPassword \
#       --authenticationDatabase admin \
#       --gzip \
#       --archive=/dbstuff/formsite.init.archive
# fi