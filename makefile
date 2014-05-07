
BIN = ./node_modules/.bin/

test: node_modules
	@$(BIN)mocha \
		--require should \
		--reporter spec \
		--harmony \
		--timeout 10000 \
		--bail

.PHONY: test