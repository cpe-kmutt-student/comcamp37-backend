#!/bin/bash

set -e;

OPTION="$1";
COMMAND="$2";
SCALE=3;

PROD_COMPOSE="docker-compose.prod.yml";
DEV_COMPOSE="docker-compose.yml";



function prodCompleteStart() {
    git pull
    docker compose -f $PROD_COMPOSE down -v
    docker compose -f $PROD_COMPOSE pull
    docker compose -f $PROD_COMPOSE build --no-cache
    docker compose -f $PROD_COMPOSE up -d --scale client=3
    docker compose -f $PROD_COMPOSE logs -f   
}

function devCompleteStart(){
    git pull
    docker compose -f $DEV_COMPOSE down -v
    docker compose -f $DEV_COMPOSE build --no-cache
    docker compose -f $DEV_COMPOSE up -d
    docker compose -f $DEV_COMPOSE logs -f
}

function prodTempStop(){
    docker compose -f $PROD_COMPOSE stop
}

function prodStart(){
    docker compose -f $PROD_COMPOSE start
}

function prodDown(){
    docker compose -f $PROD_COMPOSE down -v
}

function prodBuild(){
    docker compose -f $PROD_COMPOSE build --no-cache
}

function prodUp(){
    docker compose -f $PROD_COMPOSE up -d --scale client=$SCALE
}



if [ "$OPTION" = "prod" ]; then

    if [ "$COMMAND" = "complete" ]; then
        prodCompleteStart
    elif [ "$COMMAND" = "stop" ]; then
        prodTempStop
    elif [ "$COMMAND" = "start" ]; then
        prodStart
    elif [ "$COMMAND" = "down" ]; then
        prodDown
    elif [ "$COMMAND" = "build" ]; then
        prodBuild
    elif [ "$COMMAND" = "up" ]; then
        prodUp
    fi

elif [ "$OPTION" = "dev" ]; then

    if [ "$COMMAND" = "complete" ]; then
        devCompleteStart
    fi

fi
