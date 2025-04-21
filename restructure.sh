#!/bin/bash

# Exit on error
set -e

echo "🔄 Restructuring project file organization..."

# Move all files from vite-project to root, overwriting if necessary
echo "📦 Moving files from vite-project to root..."
cp -r vite-project/* .
cp -r vite-project/.* . 2>/dev/null || true  # Copy hidden files, ignore errors

# Check if we need to merge package.json files
if [ -f "package.json" ] && [ -f "vite-project/package.json" ]; then
  echo "🔄 Merging package.json files..."
  # Create a backup
  cp package.json package.json.bak
  
  # Use jq if available to merge package.json files properly, otherwise just use the vite-project one
  if command -v jq >/dev/null 2>&1; then
    jq -s '.[0] * .[1]' package.json vite-project/package.json > package.json.new
    mv package.json.new package.json
    echo "✅ package.json files merged with jq"
  else
    # If jq is not available, just keep vite-project's package.json but preserve dependencies
    DEPS=$(grep -A 100 "dependencies" package.json | grep -B 100 -m 1 "}" | grep -v "}")
    sed -i "/\"dependencies\": {/a\\$DEPS" vite-project/package.json
    cp vite-project/package.json .
    echo "✅ package.json from vite-project used, with root dependencies added"
  fi
fi

# Ask if user wants to remove the vite-project directory
read -p "Do you want to remove the vite-project directory? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🗑️ Removing vite-project directory..."
  rm -rf vite-project
  echo "✅ vite-project directory removed"
else
  echo "ℹ️ vite-project directory kept for reference"
fi

# Update scripts to reflect new structure
echo "🔄 Updating any references to paths..."
find . -type f -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.html" | xargs grep -l "vite-project" | while read file; do
  sed -i 's|vite-project/||g' "$file"
done

echo "🎉 Project structure reorganized!"
echo "📝 Next steps:"
echo "1. Run 'npm install' to ensure all dependencies are installed"
echo "2. Run 'npm run dev' to start the development server"
echo "3. When ready, use 'npm run build' to create a production build" 