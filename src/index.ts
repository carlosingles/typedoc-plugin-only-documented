import {
  Application,
  Context,
  Converter,
  Reflection,
} from "typedoc";

let hasLoaded = false;

export function load(app: Application) {
  if (hasLoaded) {
    throw new Error(
      "typedoc-plugin-only-documented has been loaded more than once",
    );
  }
  hasLoaded = true;

  app.converter.on(Converter.EVENT_BEGIN, function (ctx: Context) {
    ctx.converter.config.modifierTags.add('@documented');
  })

  app.converter.on(
    Converter.EVENT_RESOLVE_BEGIN,
    function onResolveBegin(context: Context) {
      const project = context.project;
      const reflections = Object.values(project.reflections);
      const reflectionsToRemove = new Set<Reflection>(reflections);
      const reflectionsToKeep = new Set<Reflection>();
      for (const ref of reflections) {
        if (ref.hasComment() && ref.comment?.hasModifier('@documented')) {
          reflectionsToRemove.delete(ref);
          reflectionsToKeep.add(ref);
          let parentRef = ref.parent;
          while (parentRef) {
            reflectionsToRemove.delete(parentRef);
            parentRef = parentRef.parent;
          }
        }
        if (ref.parent && reflectionsToKeep.has(ref.parent)) {
          reflectionsToKeep.add(ref);
          reflectionsToRemove.delete(ref);
        }
      }
      reflectionsToKeep.forEach((reflection) => reflection.comment?.removeModifier('@documented'));
      reflectionsToRemove.forEach((reflection) => project.removeReflection(reflection));
    }
  );
}