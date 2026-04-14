const fs = require('fs');
const path = require('path');

const actionsDir = path.join(process.cwd(), 'src/app/actions');
const files = fs.readdirSync(actionsDir);

const newImports = "import { getUserId } from '@/lib/auth';";
const oldGetUserIdRegex = /const getUserId = async \(\) => \{[\s\S]*?\};/g;
const oldImportsToRemove = [
    "import { cookies } from 'next/headers';",
    "import * as jose from 'jose';",
    "import { cookies } from \"next/headers\";",
    "import * as jose from \"jose\";"
];

files.forEach(file => {
    if (file.endsWith('.ts') && file !== 'authActions.ts' && file !== 'habitActions.ts' && file !== 'calendarActions.ts') {
        const filePath = path.join(actionsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove old imports
        oldImportsToRemove.forEach(imp => {
            content = content.replace(imp, "");
        });
        
        // Add new import if not present
        if (!content.includes(newImports)) {
            content = content.replace("'use server';", "'use server';\n\n" + newImports);
        }
        
        // Replace getUserId function
        content = content.replace(oldGetUserIdRegex, "");
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});
