import './styles/styles.scss'

class Calculator {
  constructor() {
    this.display = ""
    this.lastValue = 0
    this.lastKnownAction = ""
    this.render()
  }

  prepareForAction () {
    this.lastValue = Number(this.display)
    this.display = ""
  }

  applyNumber (value) {
    this.display += value
  }
  clear () {
    this.display = ''
  }
  backspace () {
    if(this.display.length !== 0) {
      this.display = this.display.slice(0, -1)
    }
  }
  percent () {
    const value = Number(this.display)
    this.display = value / 100
  }
  divide () {
    this.prepareForAction()
    this.lastKnownAction = "/"
  }
  multiply () {
    this.prepareForAction()
    this.lastKnownAction = "*"
  }
  subtract () {
    this.prepareForAction()
    this.lastKnownAction = "-"
  }
  add () {
    this.prepareForAction()
    this.lastKnownAction = "+"
  }
  floatPoint () {
    if (this.display.indexOf('.') === -1 && this.display !== '') {
      this.display += '.'
    }
  }
  equal() {
    switch (this.lastKnownAction) {
      case "+":
        this.display = this.lastValue + Number(this.display)
        this.lastValue = Number(this.display)
        return
      case "-":
        this.display = this.lastValue - Number(this.display)
        this.lastValue = Number(this.display)
        return
      case "*":
        this.display = this.lastValue * Number(this.display)
        this.lastValue = Number(this.display)
        return
      case "/":
        this.display = this.lastValue / Number(this.display)
        this.lastValue = Number(this.display)
        return
      default:
        console.log("Unknown button")
        return
    }
  }
  render() {
    const display = document.getElementById("text-indicator")
    display.textContent = this.display
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const calcDetails = new Calculator()

  const controllerClickHandler = (e) => {
    if (calcDetails[e.target.dataset.action]) {
      calcDetails[e.target.dataset.action](e.target.dataset.value)
      calcDetails.render()
    }
  }

  const buttons = document.querySelector('.controller')
  buttons.addEventListener('click', controllerClickHandler)

})
