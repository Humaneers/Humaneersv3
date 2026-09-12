// The primitives share the app's cn. Its tailwind-merge knows the Relume type
// ramp (text-h1, text-medium...), so a ramp class passed to a primitive through
// className replaces the primitive's own font size instead of losing to it.
export { cn } from "../../lib/utils";
