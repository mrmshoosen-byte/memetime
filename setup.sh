#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Memecoin Clock - Quick Setup${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed${NC}"
    echo "Download from: https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js ${NC}$(node -v)"
echo -e "${GREEN}✓ npm ${NC}$(npm -v)\n"

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Create env file
if [ ! -f .env.local ]; then
    echo -e "${BLUE}📝 Creating .env.local...${NC}"
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  Update .env.local with your API keys (optional)${NC}"
    echo -e "${YELLOW}    Get free key from: https://newsapi.org${NC}"
fi

echo -e "\n${GREEN}✓ Setup complete!${NC}\n"

echo -e "${BLUE}Available commands:${NC}"
echo "  npm run dev     - Start development server (localhost:3000)"
echo "  npm run build   - Build for production"
echo "  npm run start   - Start production server"
echo "  npm run lint    - Check code quality\n"

echo -e "${BLUE}Next steps:${NC}"
echo "  1. npm run dev"
echo "  2. Open http://localhost:3000"
echo "  3. Edit .env.local for your API keys\n"

echo -e "${GREEN}Happy coding! 🌙${NC}"
