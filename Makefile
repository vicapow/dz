
MOCHA=./node_modules/mocha/bin/mocha
MOCHA_OPTS=--growl
browserify:
	browserify src/index.js -s ind33d > ind33d.js

browserify-watch:
	watchify src/index.js -v -s ind33d -o ind33d.js

test:
	$(MOCHA) $(MOCHA_OPTS) tests/

test-w:
	$(MOCHA) $(MOCHA_OPTS) --watch tests/