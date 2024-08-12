# Purpose: provide a set of commands to run the project during local development. 
#     The scripts in the `package.json` file are used in CI/CD pipelines.

.PHONY: report
report: 
	@pnpm typedoc \
		--tsconfig ./tsconfig.build.json \
		--options ./typedoc.json \
		./src/index.tsx
	@pnpm api-extractor run \
		--typescript-compiler-folder ./node_modules/typescript \
		--verbose \
		--local
