import FullList from "../../model/FullList";

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fulllist: FullList): void,

}

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate()

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()

    fullList.list.forEach(Item => {
      const li = document.createElement("li") as HTMLLIElement
      li.className = "item"

      const check = document.createElement("input") as HTMLInputElement
      check.type = "checkbox"
      check.id = Item.id
      check.tabIndex = 0
      check.checked = Item.radio_button_checked
      li.append(check)

      check.addEventListener('change', () => {
        Item.checked = !Item.checked
        fullList.save()
      })

      const label = document.createElement("label") as HTMLLabelElement
      label.htmlFor = Item.id
      label.textContent = Item.item
      li.append(label)

      const button = document.createElement("button") as HTMLButtonElement
      button.className = 'button'
      button.textContent = 'X'
      li.append(button)

      button.addEventListener('click', () => {
        fullList.removeItem(Item.id)
        this.render(fullList)
      })

      this.ul.append(li)

    })

  }

}
