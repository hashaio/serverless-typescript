import { compile } from "json-schema-to-typescript";
import * as fs from "fs";
import type { JSONSchema4 } from "json-schema";
import { cloneDeep } from "lodash";

interface Service {
  provider: {
    name: string
  }
}

interface Serverless {
  configSchemaHandler: {
    schema: JSONSchema4;
  };
  service: Service,
}

class ConfigSchemaHandlerTypescriptDefinitionsPlugin {
  private serverless: Serverless;

  constructor(serverless: Serverless) {
    this.serverless = serverless;
  }

  commands = {
    schema: {
      usage: "Get JSON schema definition and generate TS definitions",
      lifecycleEvents: ["generate"],
    },
  };

  hooks = {
    "schema:generate": this.generateSchema.bind(this),
  };

  async generateSchema() {
    const providerName = this.serverless.service.provider.name;
    const className = providerName.charAt(0).toUpperCase() + providerName.slice(1)
    const schema = cloneDeep(this.serverless.configSchemaHandler.schema);
    /**
     * ignoreMinAndMaxItems: true -> maxItems: 100 in provider.s3.corsConfiguration definition is generating 100 tuples
     */
    const compiledDefinitions = await compile(schema, className, {
      ignoreMinAndMaxItems: true,
    });
    fs.writeFileSync("index.d.ts", compiledDefinitions);
  }
}

module.exports = ConfigSchemaHandlerTypescriptDefinitionsPlugin;
