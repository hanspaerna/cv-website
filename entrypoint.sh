#!/bin/sh

# Path to the runtime config.js file
CONFIG_FILE=/usr/share/nginx/html/config.js

# Replace placeholders in config.js with environment variables
echo "Generating runtime configuration in $CONFIG_FILE"
cat <<EOF > $CONFIG_FILE
window.config = {
    VITE_FIRST_NAME: "${VITE_FIRST_NAME:-undefined}",
    VITE_LAST_NAME: "${VITE_LAST_NAME:-undefined}",
    VITE_OCCUPATION: "${VITE_OCCUPATION:-undefined}",
    VITE_CITY: "${VITE_CITY:-undefined}",
    VITE_PHONE: "${VITE_PHONE:-undefined}",
    VITE_EMAIL: "${VITE_EMAIL:-undefined}",
    VITE_GITHUB: "${VITE_GITHUB:-undefined}",
    VITE_LINKEDIN: "${VITE_LINKEDIN:-undefined}"
};
EOF

# Start Nginx
nginx -g "daemon off;"