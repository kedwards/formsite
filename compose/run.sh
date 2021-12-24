#!/usr/bin/env bash

opts=':chim:n:'

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
  echo "  -c | clean up resources"
  echo "  -h | print this help menu"
  echo "  -i | initialize resources"
  echo "  -m | mongo_container name"
  echo "  -n | network name"
  echo ""
  exit 1
}

while getopts ${opts} opt
do
  case "$opt" in
    c)  action=clean
        ;;
    h)  usage
        ;;
    i)  action=init
        ;;
    m)  mongo_container=${OPTARG}
        ;;
    n)  network_name=${OPTARG}
        ;;
    \?)
        usage
        ;;
  esac
done
shift $(($OPTIND - 1))

if [ ${action} == "init" ] ; then
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
elif [ ${action} == "clean" ] ; then
  function deleteNetwork {
    docker network rm ${1} >/dev/null 2>&1  
  }

  deleteNetwork ${network}
  sudo rm -r ${script_dir}/data/
fi