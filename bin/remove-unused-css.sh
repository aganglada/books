#!/bin/bash

##
# Unused CSS
# @see: https://davidwalsh.name/uncss
# @see: https://github.com/giakki/uncss
##
echo "Starting remove-unused-css.sh";

# We should execute npm run deploy before this script
ASSETS_FOLDER="web/assets"
CLIENT_FOLDER="src/SpotBoxClient"
STYLE_CSS=$(find $ASSETS_FOLDER -name "style.*.css")
TMP_CSS=$ASSETS_FOLDER"/temp.css"
# List of classes to do not remove. Most of them have been used on JS files
DO_NOT_REMOVE=$(echo "
/::-ms-clear/,
/::-ms-expand/,
/[disabled]/
" | tr -d '\n')

echo "Removing unused CSS";
$CLIENT_FOLDER/node_modules/.bin/uncss -i $DO_NOT_REMOVE -s ../../../$STYLE_CSS $CLIENT_FOLDER/app/**/*.html > $TMP_CSS
echo "Removed unused CSS";

echo "Cleaning CSS";
$CLIENT_FOLDER/node_modules/.bin/cleancss $TMP_CSS --s0 -o $STYLE_CSS
echo "Cleaned CSS";

echo "Remove temp.css";
rm $TMP_CSS
echo "Removed temp.css";

exit 0
