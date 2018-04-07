.PHONY: test

start: build
	node app.js

build:
	node renderscss.js

test_unit:
	./node_modules/mocha/bin/mocha test/unit

test: test_unit
