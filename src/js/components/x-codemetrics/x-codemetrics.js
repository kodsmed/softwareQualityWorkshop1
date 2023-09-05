const template = document.createElement('template')
template.innerHTML = `
<div class="codemetrics">
  <style>
    .codemetrics {
      width: 80%;
      margin: auto;
      background-color: #fff;
      border-radius: 25px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
      padding: 20px;
      margin-bottom: 20px;
    }
    .codemetrics form {
      margin-top: 1rem;
      margin-bottom: 1rem;
      margin-left: 3rem;
      margin-right: 3rem;
      display: flex;
      flex-direction: column;
    }
    .codemetrics label {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .codemetrics input {
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.2rem;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    .codemetrics button {
      background-color: #000;
      border: 0;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.5rem;
    }
    .codemetrics button:hover {
      background-color: #333;
    }
    .codemetrics .name {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
    .codemetrics .codeoutput {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
    .codemetrics .error {
      color: red;
      font-size: 1.2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  </style>
  <form>
              <label for="code"></label>
              <textarea type="text" id="code" name="code" placeholder="input code..." required></textarea>
              <button>Get info</button>
            </form>
            <div class="codeoutput"></div>
            <div class="error"></div>
</div>
`

customElements.define('x-codemetrics',
/**
 * Class representing a behindthename.
 * It gets the name from an input field and then fetches the data from the API.
 * After that it displays the the meaning of the name.
 *
 */
  class extends HTMLElement {
    /**
     * Creates an instance of codemetrics.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('button').addEventListener('click', this.handleInput.bind(this))
    }

    /**
     * Check if there is a value for the attribute.
     *
     * @returns {boolean} - True if there is a value for the attribute, false otherwise.
     */
    static get observedAttributes () {
      return []
    }

    /**
     * Called when an attribute is changed, appended, removed, or replaced on the element.
     */
    attributeChangedCallback () {
    }

    /**
     * Handles the button being pressed and presents results by generating new p-elements.
     *
     * @param {event} event - the button being clicked.
     */
    handleInput (event) {
      event.preventDefault()
      const codeToAnalyze = this.shadowRoot.querySelector('#code').value
      console.log('submit')
      const outputDiv = this.shadowRoot.querySelector('.codeoutput')

      const rowsPElement = document.createElement('p')
      rowsPElement.textContent = `Rows : ${this.rowCounter(codeToAnalyze)}`
      outputDiv.appendChild(rowsPElement)

      const emptyRowsPElement = document.createElement('p')
      emptyRowsPElement.textContent = `Empty rows : ${this.emptyRowsCounter(codeToAnalyze)}`
      outputDiv.appendChild(emptyRowsPElement)

      const commentRowsPElement = document.createElement('p')
      emptyRowsPElement.textContent = `Rows with comments : ${this.emptyRowsCounter(codeToAnalyze)}`
      outputDiv.appendChild(emptyRowsPElement)
    }

    /**
     * Counts the rows in the input code.
     *
     * @param {string} codeToAnalyze - the input.
     * @returns {number} the number of rows.
     */
    rowCounter (codeToAnalyze) {
      console.log(codeToAnalyze)
      return codeToAnalyze.split('\n').length
    }

    /**
     * Counts empty rows in the input code.
     *
     * @param {string} codeToAnalyze - the input.
     * @returns {number} the number of empty rows.
     */
    emptyRowsCounter (codeToAnalyze) {
      const rows = codeToAnalyze.split('\n')
      let numberOfRows = 0
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].length === 0) {
          numberOfRows++
        }
      }
      return numberOfRows - 1
    }

    /**
     * Calculate the number of rows with comments.
     *
     * @param {string} codeToAnalyze - the input
     * @returns {number} the number of rows containing comments.
     */
    commentRowsCounter (codeToAnalyze) {
      const rows = codeToAnalyze.split('\n')
      let numberOfRows = 0
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].contains('//')) {
          numberOfRows++
        } else if (rows[i].contains('/**')) {
          do {
            numberOfRows++
            i++
          } while (!rows[i].contains('/*'))
        }
      }
      return numberOfRows
    }
  })
