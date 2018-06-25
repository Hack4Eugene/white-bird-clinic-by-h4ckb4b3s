.HONY: test

# Starts the spplication server
start: build
	node app.js

# Renders .scss files into .css
scss:
	node utils/renderscss.js

# builds application resources
build:
	node utils/renderscss.js

# Seeds data into the local database
seed:
	node ./utils/seed.js

# Runs only unit tests
test_unit:
	./node_modules/mocha/bin/mocha test/unit

# Runs all tests
test: test_unit

# Install dependencies
install:
	npm install
