const queue = document.querySelector("[data-queue]")
const wrapper = document.querySelector("[data-wrapper]")
const who_turn = document.querySelector("[data-who_turn]")
let node_holder_sequence = -1

function getPascalsTriangleRow(rowIndex) {
  const row = [1];

  for (let i = 1; i <= rowIndex; i++) {
    for (let j = i - 1; j > 0; j--) {
      row[j] += row[j - 1]
    }
    row.push(1)
  }

  return row
}

function Collatz_Conjecture(number) {
  if (number % 2 !== 0) return (3 * number) + 2
  if (number % 2 !== 1) return number / 2
}

function AwakeNode() {
  const nodes_holder = document.createElement("div")
  nodes_holder.setAttribute("class", "nodes")
  nodes_holder.setAttribute("data-awake", "")

  wrapper.append(nodes_holder)

  const node = document.createElement("div")
  node.setAttribute("class", "node")
  // node.setAttribute("data-node_number", node_number)
  node.textContent = "1"
  node.style.color = `white`
  node.style.backgroundColor = `indianred`
  node.style.textShadow = `1px 1px 1px black`

  nodes_holder.append(node)
}


function EndNode(node_sequence) {
  const nodes_holder = document.createElement("div")
  nodes_holder.setAttribute("class", "nodes")
  nodes_holder.setAttribute("data-awake", "")

  wrapper.append(nodes_holder)

  const node = document.createElement("div")
  node.setAttribute("class", "node")
  node.setAttribute("data-node_number", 1)
  // node.setAttribute("data-node_number", node_sequence)
  node.textContent = "Ans"
  nodes_holder.append(node)

  node.addEventListener("click", () => {
    EachTurn(node_sequence, node)
  })
}


function nodes(number_of_node) {
  if (!number_of_node && !Array.isArray(number_of_node)) return

  node_holder_sequence += 1

  const nodes_holder = document.createElement("div")
  nodes_holder.setAttribute("class", "nodes")
  nodes_holder.setAttribute("data-node_sequence", node_holder_sequence)

  wrapper.append(nodes_holder)

  number_of_node.forEach(node_number => {
    const node = document.createElement("div")
    node.setAttribute("class", "node")
    node.setAttribute("data-node_number", node_number)
    node.textContent = ""
    // node.textContent = node_number
    nodes_holder.append(node)

    const node_sequence = node.parentElement.getAttribute("data-node_sequence")
    // console.log(node_sequence)

    node.addEventListener("click",async () => {
      EachTurn(node_sequence, node)
    })
  })
}

const score_a = document.querySelector("[data-score_a]")
const score_b = document.querySelector("[data-score_b]")

let team_turns = 0
let team_a_sequence = 0
let team_b_sequence = 0

let team_a_score = 1
let team_b_score = 1
async function EachTurn(node_sequence, node) {
  // 0 false Team_A 
  // 1 true Team_B

  const isTaken = node.getAttribute("data-taken")

  if (node_sequence == 9) {
    if (team_a_score > team_b_score) EndQueue(`Team A Win: ${team_a_score}`, "lightgreen")
    else if (team_b_score > team_a_score) EndQueue(`Team B Win: ${team_b_score}`, "lightgreen")
    
    return
  }

  if (!team_turns && (node_sequence == team_a_sequence) && !isTaken) {
    const question = choice(question_list)
    if(!await showFloatingPrompt(`${question[0]}`, question[1])) {
      Queue("Wrong", "red")
      team_turns = !team_turns
      who_turn.textContent = team_turns ? "Team B" : "Team A"
      return
    }

    Queue("Correct", "lightgreen")
    const setTaken = node.setAttribute("data-taken",true)
    team_a_sequence += 1
    team_a_score = Collatz_Conjecture(team_a_score * parseFloat(node.getAttribute("data-node_number")))
    node.textContent = `${node.getAttribute("data-node_number")}`
    score_a.textContent = team_a_score
    
    team_turns = !team_turns
    who_turn.textContent = team_turns ? "Team B" : "Team A"
    teamAColor(node)


    // console.log("team a")
  }
  else if (team_turns && (node_sequence == team_b_sequence) && !isTaken) {
    const question = choice(question_list)
    if(!await showFloatingPrompt(`${question[0]}`, question[1])) {
      Queue("Wrong", "red")
      team_turns = !team_turns
      who_turn.textContent = team_turns ? "Team B" : "Team A"
      return
    }

    Queue("Correct", "lightgreen")
    const setTaken = node.setAttribute("data-taken",true)
    team_b_sequence += 1
    team_b_score = Collatz_Conjecture(team_b_score * parseFloat(node.getAttribute("data-node_number")))
    node.textContent = `${node.getAttribute("data-node_number")}`
    score_b.textContent = team_b_score

    team_turns = !team_turns
    who_turn.textContent = team_turns ? "Team B" : "Team A"
    teamBColor(node)

    // console.log("team b")
  }
}

function teamAColor(node) {
  const style = node.style
  style.backgroundColor = `blue`
  style.color = `white`
  style.border = `solid 0px transparent`
}

function teamBColor(node) {
  const style = node.style
  style.backgroundColor = `red`
  style.color = `white`
  style.border = `solid 0px transparent`
}

async function Queue(text, color) {
  const style = queue.style

  queue.textContent = text
  style.display = "flex"
  style.backgroundColor = color

  await sleep(1000)

  queue.textContent = ""
  style.display = "none"
  style.backgroundColor = "black"
}

async function EndQueue(text, color) {
  const style = queue.style

  queue.textContent = text
  style.display = "flex"
  style.backgroundColor = color
}

AwakeNode()

nodes(getPascalsTriangleRow(1))
nodes(getPascalsTriangleRow(2))
nodes(getPascalsTriangleRow(3))
nodes(getPascalsTriangleRow(4))
nodes(getPascalsTriangleRow(5))
nodes(getPascalsTriangleRow(4))
nodes(getPascalsTriangleRow(3))
nodes(getPascalsTriangleRow(2))
nodes(getPascalsTriangleRow(1))

EndNode(9)

