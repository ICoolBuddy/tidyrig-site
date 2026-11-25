#!/bin/sh
# Usage: ./fill.sh "Legal Name" "Country" "yourdomain.com" "support@yourdomain.com"
# Replaces the placeholders on every page and writes CNAME for GitHub Pages.
set -eu
[ $# -eq 4 ] || { echo 'usage: ./fill.sh "Legal Name" "Country" "domain.com" "email@domain.com"'; exit 1; }
esc() { printf '%s' "$1" | sed 's/[&|\\]/\\&/g'; }
N=$(esc "$1"); C=$(esc "$2"); D=$(esc "$3"); E=$(esc "$4")
sed -i "s|\[LEGAL NAME\]|$N|g; s|\[COUNTRY\]|$C|g; s|\[DOMAIN\]|$D|g; s|\[EMAIL\]|$E|g" *.html checkout.js
printf '%s\n' "$3" > CNAME
grep -l '\[LEGAL NAME\]\|\[COUNTRY\]\|\[DOMAIN\]\|\[EMAIL\]' *.html checkout.js && echo "placeholders left above" || echo "all placeholders filled"
