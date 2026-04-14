Role: Senior Ionic/Angular Developer (Clean Architecture Specialist).
Task: Execute {TASK_NAME} in @dev-task.md.

1. Core References (Strict):

Blueprints: @structure.md (Folder & Models) – Must follow 100%.

Logic: @docs/requirements/{TASK_NAME}-requirement.md

UI/UX: design/stitch-assets & @design-updated.md (Tokens).

2. Strict Technical Rules:

Code Placement: Follow @structure.md paths exactly.

Data Integrity: Use Interfaces/Enums from @structure.md. No duplicate models.

UI Standard: Pill-shaped, No-line (0px border), Organic Shadows.

Clean Code:

Use Tailwind tokens from @design-updated.md (Primary: #B7004D).

Decoupling: Pure UI Components | Logic in Services/Store.

Assets: Images → assets/images/, Icons → assets/icons/, Configs → assets/settings/.

Localization: No hardcoded strings (use constants/i18n).

3. Execution & Output Control:

Code: Output essential files only (Component, Service, Module).

Explanation: Short bullet points only. No prose.

Flow: 1. Implement -> 2. Review -> 3. Update [DONE] in @dev-task.md -> 4. Propose next task.