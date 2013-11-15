
MOCHA=./node_modules/mocha/bin/mocha
MOCHA_OPTS=--growl
browserify:
	browserify src/index.js -s dz > dz.js

browserify-watch:
	watchify src/index.js -v -s dz -o dz.js

test:
	$(MOCHA) $(MOCHA_OPTS) tests/

test-watch:
	$(MOCHA) $(MOCHA_OPTS) --watch tests/