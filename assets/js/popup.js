function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
function choice(array) {
    return array[Math.floor(array.length * Math.random())]
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const question_list = [
    ["Is haptic technology based on realistic visual touching?", false],
    ["Contextual awareness cannot collect information based on the user's environment?", false],
    ["Voice and tone recognition does not identify individuals through speech and tone", false],
    ["Does intelligent routing to devices collect information on a specific location?", true],
    ["Does eye tracking technology measure eye activity?", true],
    ["Are internet glasses wearable computer glasses?", true],
    ["MOOC (Massive Open Online Course) is not an interactive model for delivering content online.", false],
    ["Can many people join MOOCs (Massive Open Online Course)?", true],
    ["Can anyone join MOOCs (Massive Open Online Course) regardless of their background?", true],
    ["Is a strong internet connection required to access a MOOC? (Massive Open Online Course)", false],
    ["Is there a wide array of courses in a MOOC? (Massive Open Online Course)", true],
    ["Did universities such as Stanford, Harvard, and Princeton tie up with non-profit and commercial providers for MOOCs? (Massive Open Online Course)", true],
    ["Is scalability an advantage of MOOC? (Massive Open Online Course)", true],
    ["Is optimal resource utilization an advantage of MOOC? (Massive Open Online Course)", true],
    ["Are self-paced courses available in MOOCs? (Massive Open Online Course)", true],
    ["Does the removal of constraints make MOOCs (Massive Open Online Course) accessible globally?", true],
    ["Is a patent an exclusive right granted to an inventor?", true],
    ["Is a prototype a physical representation of an idea?", true],
    ["Can you build a physical prototype after developing a virtual prototype?", true]
]



async function showFloatingPrompt(question, boolean_answer) {
    return new Promise((resolve, reject) => {
        const promptContainer = document.createElement('div')
        promptContainer.id = 'floatingPrompt'
        promptContainer.style.display = 'none'

        const questionElement = document.createElement('div')
        questionElement.classList.add('question')
        questionElement.textContent = question
        promptContainer.appendChild(questionElement)

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('button-container')

        const yesButton = document.createElement('button')
        yesButton.id = 'yesBtn'
        yesButton.setAttribute("class", "true")
        yesButton.textContent = 'Yes'
        yesButton.addEventListener('click', () => handleButtonClick(true))
        buttonContainer.appendChild(yesButton)

        const noButton = document.createElement('button')
        noButton.id = 'noBtn'
        noButton.setAttribute("class", "false")
        noButton.textContent = 'No'
        noButton.addEventListener('click', () => handleButtonClick(false))
        buttonContainer.appendChild(noButton)

        promptContainer.appendChild(buttonContainer)

        document.body.appendChild(promptContainer)

        promptContainer.style.display = 'block'

        function handleButtonClick(answer) {
            promptContainer.style.display = 'none'
            resolve(answer === boolean_answer)
        }
    })
}
