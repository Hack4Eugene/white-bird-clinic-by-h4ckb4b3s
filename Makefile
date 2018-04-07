ifdef SYSTEMROOT
  SEPERATOR = '\'
else
  SEPERATOR = '/'
endif

.PHONY: test

start: build
	node app.js

build:
	node .${SEPERATOR}utils${SEPERATOR}renderscss.js

seed:
	node .${SEPERATOR}utils${SEPERATOR}seed.js

test_unit:
	.${SEPERATOR}node_modules${SEPERATOR}mocha${SEPERATOR}bin${SEPERATOR}mocha test${SEPERATOR}unit

test: test_unit

install:
	npm install
