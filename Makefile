.PHONY: test

start: build
	node app.js

build:
	node ./utils/renderscss.js

test_unit:
	./node_modules/mocha/bin/mocha test/unit

test: test_unit

install:
	npm install
