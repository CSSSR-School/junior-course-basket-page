#start watch and server

node-sass -r --follow -w ./src/sass/ -o ./css &
babel ./src/js/ -w -d ./js &
browser-sync start -s ./ -f ./ --no-open
