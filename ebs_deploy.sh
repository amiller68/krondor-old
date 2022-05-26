#!/bin/bash

# Build a source bundle to deploy to AWS on Elastic Bean Stalk

# Where we build our source folder
SOURCE_BUNDLE_NAME="ebs_deployment"
# Where we place it when where done, relative to this dir
SOURCE_BUNDLE_PATH="krondor_${SOURCE_BUNDLE_NAME}.zip"

# Remove a previous deployment if it exists
rm -rf $SOURCE_BUNDLE_PATH
rm -rf $SOURCE_BUNDLE_NAME

# Build our `dist`
ng build

mkdir $SOURCE_BUNDLE_NAME

# Copy any app dependencies to our bundle
mkdir ${SOURCE_BUNDLE_NAME}/dist
mkdir ${SOURCE_BUNDLE_NAME}/dist/krondor/
# Copy our front-end distributables
cp -r ./dist/krondor/* ${SOURCE_BUNDLE_NAME}/dist/krondor/

# Copy our server
cp server.js ${SOURCE_BUNDLE_NAME}/

# Copy our package file
cp package.json ${SOURCE_BUNDLE_NAME}/

# Copy our mongoDB URI file, since this won't be public
cp mongodb.uri ${SOURCE_BUNDLE_NAME}/

# Copy our production environment
cp env.production ${SOURCE_BUNDLE_NAME}/

# Create our zipped source bundle
cd ${SOURCE_BUNDLE_NAME} || exit
zip ../${SOURCE_BUNDLE_PATH} -r * .[^.]*

# Remove our leftover bundle
cd ..
rm -rf $SOURCE_BUNDLE_NAME


