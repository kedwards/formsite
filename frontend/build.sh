#!/usr/bin/env bash
opts=':p:t:h'

# cli overrides
TAG=
BUILD_PATH=.

# sys
title='Docker Image build'
script_name=$(basename $(readlink -nf $0) ".sh")
pushd `dirname ${0}` > /dev/null && script_dir=`pwd` && popd > /dev/null

# console colours
green=\\e[92m
normal=\\e[0m
red=\\e[91m
cyan=\\e[96m

show_help()
{
    cat << EOF
${title}
Error: $1
Usage: ${script_name}.sh [-p|-t|-h]
options:
    -p  path to source files
    -t  docker image tag, symantec version number
    -h  prints this help message
EOF
exit 1
}

while getopts ${opts} opt
do
    case "$opt" in
      p)  BUILD_PATH="${2}"
          shift 2
          ;;
      t)  TAG="${2}"
          shift 2
          ;;
      h)  show_help
          exit 1
          ;;
      \?)
      	  show_help "Invalid Option"
	  	  exit 1
          ;;
    esac
done
shift $(($OPTIND - 1))

if [ -z "${TAG}" ]
then
    show_help "build tag cannot be empty"
fi

docker image build \
    --no-cache \
    --build-arg GIT_COMMIT=$(git log -1 --format=%h) \
    --build-arg BUILD_DATE=$(date +%FT%T%Z) \
    --build-arg VERSION=${TAG} \
    -t kevinedwards/formsite-web:${TAG} \
    . && \
    docker push kevinedwards/formsite-web:${TAG}
