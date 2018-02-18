#!/bin/bash
set -euo pipefail
IFS=$'\n\t'


FIREFOX_VERSION=$1

case $FIREFOX_VERSION in
  "nightly")
    FIREFOX_DOWNLOAD_URL="https://download.mozilla.org/?product=firefox-nightly-latest-ssl&os=linux64&lang=en-US"
    ;;
  "latest")
    # FIREFOX_DOWNLOAD_URL="https://download.mozilla.org/?product=firefox-latest&os=linux64&lang=en-US"
    echo "Already installed the latest version"
    exit 0
    ;;
  *)
    FIREFOX_DOWNLOAD_URL="https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2"
    ;;
esac

rm -rf /var/lib/apt/lists/* /var/cache/apt/*
wget --no-check-certificate --no-verbose -O /tmp/firefox.tar.bz2 $FIREFOX_DOWNLOAD_URL

echo "Cleaning installed official firefox version"
apt-get -y purge firefox

echo "Cleaning installed custom firefox version"
rm -rf /opt/firefox

echo "extracting $FIREFOX_VERSION firefox"
tar -C /opt -xjf /tmp/firefox.tar.bz2

echo "cleaning downloaded file"
rm /tmp/firefox.tar.bz2

echo "renaming custom dir"
mv /opt/firefox /opt/firefox-$FIREFOX_VERSION

echo "symbolic link to /usr/bin/firefox"
ln -fs /opt/firefox-$FIREFOX_VERSION/firefox /usr/bin/firefox

