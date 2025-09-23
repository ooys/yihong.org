
run:
	@echo "Switching to Node.js LTS..."
	@bash -c "source ~/.nvm/nvm.sh && nvm use --lts"
	@echo "Starting development server..."
	npm run dev