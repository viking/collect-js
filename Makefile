TEMPLATES=$(shell find src/templates -name "*.html")
COMPILED=$(subst src,src/js,$(patsubst %.html,%.js,$(TEMPLATES)))
SRCS=$(filter-out $(COMPILED) src/js/collect.js,$(shell find src/js -name "*.js"))

test: deps $(COMPILED)
	node_modules/.bin/phantomjs scripts/test.js

build: src/js/collect.js

src/js/collect.js: $(SRCS) $(COMPILED)
	node scripts/build.js

src/js/templates/%.js: src/templates/%.html
	node scripts/compile.js $< > $@

deps: node_modules/.bin/phantomjs

node_modules/.bin/phantomjs:
	npm install phantomjs

.PHONY: test build deps
