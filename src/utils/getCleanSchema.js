const { Project } = require('ts-morph');

const project = new Project();
const openapi = project.addSourceFileAtPath('types/openapi-import.ts');
const components = openapi.getInterface('components');

components.getProperties().forEach((property) => {
  if (property.getName() !== 'schemas') {
    property.remove();
  }
});

awtText = components
  .getFullText()

  /* Remove comments */
  .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

  /* Remove empty lines */
  .replace(/\n\s*\n/g, '\n')

  /* Add empty lines between properties */
  .replace(/(;)\n(\s*[A-Z])/g, '$1\n\n$2')

  /* Extract components.schemas */
  .replace(/components \{\s*schemas:/g, 'awt')

  /* Remove closing bracket after extraction */
  .replace(/^\}$/gm, '')

  /* Replace components.schemas with awt */
  .replace(/components\["schemas"\]/g, 'awt');

const awt = project.addSourceFileAtPath('types/awt.ts');
awt.replaceWithText(awtText);
awt.saveSync();

openapi.replaceWithText(components.getText());
openapi.saveSync();
