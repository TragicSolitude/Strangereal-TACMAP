#!/usr/bin/env bash

target=$1

if [[ ! -d $1 ]]
then
    echo "Target is not a directory or doesn't exist"
    exit 1
fi

cd "$target"

for file in ./*
do
    newfilename=`basename "$file" | tr -d '[:space:]' | tr '[:upper:]_' '[:lower:]-'`
    mv "$file" $newfilename
done
