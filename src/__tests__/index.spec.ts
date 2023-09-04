import * as ts from "typescript";
import { join } from "path";
import {
  Application,
  DocumentationEntryPoint,
  LogLevel,
  TSConfigReader,
} from "typedoc";
import { load } from "..";

let app: Application;
let program: ts.Program;

beforeAll(async () => {
  app = await Application.bootstrap(
    {
      tsconfig: join(__dirname, "sample", "tsconfig.json"),
      logLevel: LogLevel.Warn,
      entryPoints: [join(__dirname, "sample")],
      entryPointStrategy: "expand",
    },
    [new TSConfigReader()],
  );
  load(app);

  program = ts.createProgram(
    app.options.getFileNames(),
    app.options.getCompilerOptions(),
  );
});

test("Documented function", () => {
  const entry: DocumentationEntryPoint = {
    displayName: "single",
    program,
    sourceFile: program.getSourceFile(
      join(__dirname, "sample/documentedFunction.ts"),
    )!,
  };

  const project = app.converter.convert([entry]);
  expect(project.children?.map((c) => c.name)).toEqual(['FooType', 'foo']);
});

test("Discover", () => {
  const entries = app.getEntryPoints()!;

  const project = app.converter.convert(entries);
  const reflectionNames = Object.values(project.reflections).map((c) => c.name);
  expect(reflectionNames).toContain('foo');
  expect(reflectionNames).toContain('FooType');
  expect(reflectionNames).toContain('someMap');
  expect(reflectionNames).not.toContain('usesFoo');
  expect(reflectionNames).not.toContain('PrivateType');
});