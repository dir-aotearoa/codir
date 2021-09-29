import { Liquid } from 'liquidjs';
import translateLiquid from './translateLiquid.js';

/**
 * LiquidJS plugins
 */
import unbind from './plugins/unbind.js';
import slug from './plugins/slug-plugin.js';

export class Engine {
    constructor(options) {
        options = {
            name: "Eleventy",
            files: {},
            ...options,
        };

        this.key = 'eleventy';
        this.name = options.name;
        this.files = options.files;
        this.plugins = options.plugins || [];
        this.plugins.push(unbind, slug);

        this.initializeLiquid();
        this.applyLiquidPlugins();
    }

    initializeLiquid() {
        const eleventyEngine = this;
        this.liquid = new Liquid({
            fs: {
                readFileSync (file) {
                    return "LiquidJS readFileSync unimplemented"
                },
                async readFile (file) {
                    return await eleventyEngine.retrieveInclude(file);
                },
                existsSync () {
                    return true
                },
                async exists () {
                    return true
                },
                resolve(root, file, ext) {
                    return file
                }
            }
        });
    }

    async retrieveInclude(file) {
        let content;
        if (/^_bookshop_include_/.test(file)) {
            content = this.getShared(file.replace(/^_bookshop_include_/, ""));
        } else if (/^_bookshop_/.test(file)) {
            content = this.getComponent(file.replace(/^_bookshop_/, ""));
        } else {
            content = this.files?.[file];
        }
        if (!content && content !== "") {
            console.warn(`[eleventy-engine] No file found for ${file}`);
            return "";
        }
        return translateLiquid(content);
    }

    applyLiquidPlugins() {
        this.plugins.forEach(plugin => {
            this.liquid.plugin(plugin);
        });
    }

    getShared(name) {
        const key = `shared/eleventy/${name}.eleventy.liquid`
        return this.files?.[key];
    }

    getComponentKey(name) {
        const base = name.split("/").reverse()[0];
        return `components/${name}/${base}.eleventy.liquid`;
    }

    getComponent(name) {
        const key = this.getComponentKey(name);
        return this.files?.[key];
    }

    hasComponent(name) {
        const key = this.getComponentKey(name);
        return !!this.files?.[key];
    }

    async render(target, name, props, globals) {
        let source = this.getComponent(name);
        if (!source) {
            console.warn(`[eleventy-engine] No component found for ${name}`);
            return "";
        }
        source = translateLiquid(source);
        if (!globals || typeof globals !== "object") globals = {};
        props = { ...globals, ...props };
        target.innerHTML = await this.liquid.parseAndRender(source || "", props);
    }

    loader() {
        // esbuild loader if required
    }
}