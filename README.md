# white-bird-clinic-by-h4ckb4b3s
White Bird project by h4ckb4b3s

## Contributing
git clone the repo

cd into the newly cloned directory 

	$ make install
	$ make start

Navigate to your web browser and type in localhost:3001

## Environment Variables
### Process
- PORT
	- Port to use for the server. Default is 3001

- DB_CONNECTION
	- Connection string for connecting to the mongodb

## Utilities
Utilites live in the [utils](utils) directory. They are helper processes that are generally designed for development purposes

### Render Scss
This utility will automatically find `.scss` files in the [public/stylesheets](public/stylesheets) directory and convert those files into `.css`. This utility is automatically run when using `make start`, but it can be run seperatly by running `make scss`

### Seed
This utility will "seed" a local mongo database with data from a hard-coded csv file. This can be run with `make seed`, and should only need to be run when there are updates to the data csv

## Windows Development
Good luck!

Make seems to be unhappy with Windows environments. If Make commands aren't working, try running the commands (or Windows equivalent commands) that are in the [Makefile](Makefile) itself
