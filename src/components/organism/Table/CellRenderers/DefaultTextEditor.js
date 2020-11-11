/**
 * This may seem pointless but the very act of using a renderer adds a span to the cell
 * and applied the css to that span in table.js. Its the only way i could get it working.
 */
export function DefaultTextEditor (props) {
  return props.value;
}

export default DefaultTextEditor
