// function to act as a class
export function SelectValueRenderer() {
}

// gets called once before the renderer is used
SelectValueRenderer.prototype.init = function(props) {
  this.props = props

  const div = document.createElement("div")
  div.className = "SelectValueCell"
  div.innerHTML = this.renderValue() + this.buttonHtml()

  const button = div.querySelector("button")

  this.onClickEvent = function(){
    const {
      node: { rowIndex },
      colDef: { field },
    } = props
    props.api.startEditingCell({ rowIndex, colKey: field })
  }
  button.addEventListener("click", this.onClickEvent)

  this.eGui = div
}

SelectValueRenderer.prototype.renderValue = function() {
  const fullOption =
    this.props.colDef.cellEditorParams &&
    this.props.colDef.cellEditorParams.values &&
    this.props.colDef.cellEditorParams.values.find((option) => option.value === this.props.value)

  return (fullOption ? fullOption.label : this.props.value) || " "
}

SelectValueRenderer.prototype.svg = function() {
  return "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"chevron-down\" class=\"svg-inline--fa fa-chevron-down fa-w-14 fa-1x sc-iwsKbI clbLNE\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\" color=\"black\" shade=\"main\" theme=\"[object Object]\">" +
    "<path fill=\"currentColor\" d=\"M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z\"></path>" +
    "</svg>"
}

SelectValueRenderer.prototype.buttonHtml = function() {
  // eslint-disable-next-line prefer-template
  return "<button>" + this.svg() + "</button>"
}

// gets called once (assuming destroy hasn't been called first) when grid ready to insert the element
SelectValueRenderer.prototype.getGui = function() {
  return this.eGui
}

export default SelectValueRenderer
