declare module "node-require-transform" {
    function transform(sourceCode: string, transformer: (requests: Array<string>) => Array<string>): string;
    export = transform;
}