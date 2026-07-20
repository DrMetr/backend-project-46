
.PHONY: install gendiff test

install:
	npm ci

publish:
	npm publish --dry-run

make lint:
	npx eslint .

gendiff:
	node bin/gendiffComand.js

test:
	npm test