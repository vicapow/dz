
MOCHA=./node_modules/mocha/bin/mocha
MOCHA_OPTS=--growl
browserify:
	browserify src/index.js -s d33d > d33d.js

browserify-watch:
	watchify src/index.js -v -s d33d -o d33d.js

test:
	$(MOCHA) $(MOCHA_OPTS) tests/

test-w:
	$(MOCHA) $(MOCHA_OPTS) --watch tests/