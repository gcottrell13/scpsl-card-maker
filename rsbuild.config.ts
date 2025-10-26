import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],

    output: {
        // Please replace <REPO_NAME> with the repository name.
        // For example, "/my-project/"
        assetPrefix: '/scpsl-card-maker/',
    },
    html: {
        title: 'SCPSL Card Maker',
        favicon: './favicon.ico',
    },
    source: {
        define: {
            BUILD_NUM: JSON.stringify(process.env.BUILD_NUM),
            BUILD_LINK: JSON.stringify(process.env.BUILD_LINK),
        },
    },
});
