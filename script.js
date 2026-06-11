"use strict";

const VALUES = {
  ZERO: { key: "0", display: "0" },
  HALF: { key: "1/2", display: "1/2" },
  NEG_HALF: { key: "-1/2", display: "−1/2" },
  ROOT2: { key: "sqrt2/2", display: "√2/2" },
  NEG_ROOT2: { key: "-sqrt2/2", display: "−√2/2" },
  ROOT3: { key: "sqrt3/2", display: "√3/2" },
  NEG_ROOT3: { key: "-sqrt3/2", display: "−√3/2" },
  ONE: { key: "1", display: "1" },
  NEG_ONE: { key: "-1", display: "−1" },
  ROOT3_OVER3: { key: "sqrt3/3", display: "√3/3" },
  NEG_ROOT3_OVER3: { key: "-sqrt3/3", display: "−√3/3" },
  ROOT3_TAN: { key: "sqrt3", display: "√3" },
  NEG_ROOT3_TAN: { key: "-sqrt3", display: "−√3" },
  UNDEFINED: { key: "undefined", display: "undefined" }
};

const ANGLES = [
  angle("0", "0", 0, "axis", VALUES.ZERO, VALUES.ONE, VALUES.ZERO),
  angle("pi/6", "π/6", 1, "I", VALUES.HALF, VALUES.ROOT3, VALUES.ROOT3_OVER3),
  angle("pi/4", "π/4", 1, "I", VALUES.ROOT2, VALUES.ROOT2, VALUES.ONE),
  angle("pi/3", "π/3", 1, "I", VALUES.ROOT3, VALUES.HALF, VALUES.ROOT3_TAN),
  angle("pi/2", "π/2", 1, "axis", VALUES.ONE, VALUES.ZERO, VALUES.UNDEFINED),
  angle("2pi/3", "2π/3", 2, "II", VALUES.ROOT3, VALUES.NEG_HALF, VALUES.NEG_ROOT3_TAN),
  angle("3pi/4", "3π/4", 2, "II", VALUES.ROOT2, VALUES.NEG_ROOT2, VALUES.NEG_ONE),
  angle("5pi/6", "5π/6", 2, "II", VALUES.HALF, VALUES.NEG_ROOT3, VALUES.NEG_ROOT3_OVER3),
  angle("pi", "π", 2, "axis", VALUES.ZERO, VALUES.NEG_ONE, VALUES.ZERO),
  angle("7pi/6", "7π/6", 3, "III", VALUES.NEG_HALF, VALUES.NEG_ROOT3, VALUES.ROOT3_OVER3),
  angle("5pi/4", "5π/4", 3, "III", VALUES.NEG_ROOT2, VALUES.NEG_ROOT2, VALUES.ONE),
  angle("4pi/3", "4π/3", 3, "III", VALUES.NEG_ROOT3, VALUES.NEG_HALF, VALUES.ROOT3_TAN),
  angle("3pi/2", "3π/2", 3, "axis", VALUES.NEG_ONE, VALUES.ZERO, VALUES.UNDEFINED),
  angle("5pi/3", "5π/3", 4, "IV", VALUES.NEG_ROOT3, VALUES.HALF, VALUES.NEG_ROOT3_TAN),
  angle("7pi/4", "7π/4", 4, "IV", VALUES.NEG_ROOT2, VALUES.ROOT2, VALUES.NEG_ONE),
  angle("11pi/6", "11π/6", 4, "IV", VALUES.NEG_HALF, VALUES.ROOT3, VALUES.NEG_ROOT3_OVER3)
];

const NEGATIVE_ANGLES = [
  negativeAngle("-pi/6", "−π/6", "11pi/6"),
  negativeAngle("-pi/4", "−π/4", "7pi/4"),
  negativeAngle("-pi/3", "−π/3", "5pi/3"),
  negativeAngle("-pi/2", "−π/2", "3pi/2"),
  negativeAngle("-2pi/3", "−2π/3", "4pi/3"),
  negativeAngle("-3pi/4", "−3π/4", "5pi/4"),
  negativeAngle("-5pi/6", "−5π/6", "7pi/6")
];

const PRINCIPAL_ANGLES = {
  arcsin: [
    principal("-pi/2", "−π/2", VALUES.NEG_ONE),
    principal("-pi/3", "−π/3", VALUES.NEG_ROOT3),
    principal("-pi/4", "−π/4", VALUES.NEG_ROOT2),
    principal("-pi/6", "−π/6", VALUES.NEG_HALF),
    principal("0", "0", VALUES.ZERO),
    principal("pi/6", "π/6", VALUES.HALF),
    principal("pi/4", "π/4", VALUES.ROOT2),
    principal("pi/3", "π/3", VALUES.ROOT3),
    principal("pi/2", "π/2", VALUES.ONE)
  ],
  arccos: [
    principal("0", "0", VALUES.ONE),
    principal("pi/6", "π/6", VALUES.ROOT3),
    principal("pi/4", "π/4", VALUES.ROOT2),
    principal("pi/3", "π/3", VALUES.HALF),
    principal("pi/2", "π/2", VALUES.ZERO),
    principal("2pi/3", "2π/3", VALUES.NEG_HALF),
    principal("3pi/4", "3π/4", VALUES.NEG_ROOT2),
    principal("5pi/6", "5π/6", VALUES.NEG_ROOT3),
    principal("pi", "π", VALUES.NEG_ONE)
  ],
  arctan: [
    principal("-pi/3", "−π/3", VALUES.NEG_ROOT3_TAN),
    principal("-pi/4", "−π/4", VALUES.NEG_ONE),
    principal("-pi/6", "−π/6", VALUES.NEG_ROOT3_OVER3),
    principal("0", "0", VALUES.ZERO),
    principal("pi/6", "π/6", VALUES.ROOT3_OVER3),
    principal("pi/4", "π/4", VALUES.ONE),
    principal("pi/3", "π/3", VALUES.ROOT3_TAN)
  ]
};

const LEVELS = {
  1: {
    name: "First quadrant",
    description: "First-quadrant exact values for standard angles."
  },
  2: {
    name: "Semicircle",
    description: "Exact values from 0 to π, including quadrant II signs."
  },
  3: {
    name: "Full circle",
    description: "All four quadrants across 0 ≤ θ < 2π."
  },
  4: {
    name: "Negative angles",
    description: "Coterminal angles, odd/even identities, and negative rotation."
  },
  5: {
    name: "Inverse trig",
    description: "Principal values within the correct inverse-function ranges."
  },
  6: {
    name: "Trig equations",
    description: "Find every solution in 0 ≤ x < 2π."
  }
};

const CATEGORY_LABELS = {
  sin: "Sine values",
  cos: "Cosine values",
  tan: "Tangent values",
  negative: "Negative angles",
  quadrant: "Quadrant signs",
  inverse: "Inverse trig",
  equations: "Trig equations",
  undefined: "Undefined values"
};

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS);

const elements = {
  levelValue: document.getElementById("levelValue"),
  levelName: document.getElementById("levelName"),
  scoreValue: document.getElementById("scoreValue"),
  accuracyValue: document.getElementById("accuracyValue"),
  recentDots: document.getElementById("recentDots"),
  recentText: document.getElementById("recentText"),
  questionType: document.getElementById("questionType"),
  questionNumber: document.getElementById("questionNumber"),
  questionText: document.getElementById("questionText"),
  questionHint: document.getElementById("questionHint"),
  answerGrid: document.getElementById("answerGrid"),
  feedbackPanel: document.getElementById("feedbackPanel"),
  feedbackIcon: document.getElementById("feedbackIcon"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackAnswer: document.getElementById("feedbackAnswer"),
  explanationText: document.getElementById("explanationText"),
  nextButton: document.getElementById("nextButton"),
  weakAreas: document.getElementById("weakAreas"),
  guideTitle: document.getElementById("guideTitle"),
  guideDescription: document.getElementById("guideDescription"),
  levelTrack: document.querySelector(".level-track"),
  difficultySelect: document.getElementById("difficultySelect"),
  difficultyMode: document.getElementById("difficultyMode"),
  difficultyHelp: document.getElementById("difficultyHelp"),
  resetButton: document.getElementById("resetButton")
};

let state = createInitialState();

function angle(key, display, sector, quadrant, sin, cos, tan) {
  return { key, display, sector, quadrant, sin, cos, tan };
}

function negativeAngle(key, display, positiveKey) {
  const positive = ANGLES.find((entry) => entry.key === positiveKey);
  return { ...positive, key, display, negative: true };
}

function principal(key, display, input) {
  return { key, display, input };
}

function createInitialState() {
  return {
    level: 1,
    difficultyMode: "auto",
    correct: 0,
    total: 0,
    recent: [],
    lastLevelWindow: 0,
    answered: false,
    currentQuestion: null,
    previousQuestionIds: [],
    categoryStats: Object.fromEntries(
      CATEGORY_KEYS.map((key) => [key, { attempts: 0, mistakes: 0 }])
    )
  };
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function opposite(value) {
  const pairs = {
    "1": VALUES.NEG_ONE,
    "-1": VALUES.ONE,
    "1/2": VALUES.NEG_HALF,
    "-1/2": VALUES.HALF,
    "sqrt2/2": VALUES.NEG_ROOT2,
    "-sqrt2/2": VALUES.ROOT2,
    "sqrt3/2": VALUES.NEG_ROOT3,
    "-sqrt3/2": VALUES.ROOT3,
    "sqrt3/3": VALUES.NEG_ROOT3_OVER3,
    "-sqrt3/3": VALUES.ROOT3_OVER3,
    "sqrt3": VALUES.NEG_ROOT3_TAN,
    "-sqrt3": VALUES.ROOT3_TAN,
    "0": VALUES.ZERO,
    "undefined": VALUES.UNDEFINED
  };
  return pairs[value.key];
}

function functionName(fn) {
  return fn === "sin" ? "sine" : fn === "cos" ? "cosine" : "tangent";
}

function quadrantSignExplanation(fn, quadrant) {
  if (quadrant === "axis") {
    return "The unit-circle coordinates give the value directly on the axis.";
  }
  const positiveByQuadrant = {
    I: "all three functions",
    II: "sine only",
    III: "tangent only",
    IV: "cosine only"
  };
  return `By the ASTC rule, ${positiveByQuadrant[quadrant]} ${quadrant === "I" ? "are" : "is"} positive in quadrant ${quadrant}.`;
}

function directPool(level) {
  if (level === 1) {
    return ANGLES.filter((entry) => ["pi/6", "pi/4", "pi/3"].includes(entry.key));
  }
  if (level === 2) {
    return ANGLES.filter((entry) => entry.sector <= 2);
  }
  if (level === 3) {
    return ANGLES;
  }
  return NEGATIVE_ANGLES;
}

function activeCategories(level) {
  if (level === 1) return ["sin", "cos", "tan"];
  if (level === 2 || level === 3) return ["sin", "cos", "tan", "quadrant", "undefined"];
  if (level === 4) return ["sin", "cos", "tan", "negative", "quadrant", "undefined"];
  if (level === 5) return ["inverse", "sin", "cos", "tan"];
  return ["equations", "sin", "cos", "tan", "undefined"];
}

function chooseFocus(level) {
  const categories = activeCategories(level);
  const weighted = categories.map((key) => {
    const stat = state.categoryStats[key];
    const errorRate = stat.attempts ? stat.mistakes / stat.attempts : 0;
    const exploration = stat.attempts < 2 ? 0.45 : 0;
    return { key, weight: 1 + errorRate * 3 + exploration };
  });
  const totalWeight = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const entry of weighted) {
    roll -= entry.weight;
    if (roll <= 0) return entry.key;
  }
  return weighted[0].key;
}

function buildQuestion() {
  const focus = chooseFocus(state.level);
  let question;

  if (state.level <= 4) {
    question = buildDirectQuestion(focus);
  } else if (state.level === 5) {
    question = buildInverseQuestion(focus);
  } else {
    question = buildEquationQuestion(focus);
  }

  if (state.previousQuestionIds.includes(question.id)) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const replacement = state.level <= 4
        ? buildDirectQuestion(focus)
        : state.level === 5
          ? buildInverseQuestion(focus)
          : buildEquationQuestion(focus);
      if (!state.previousQuestionIds.includes(replacement.id)) {
        question = replacement;
        break;
      }
    }
  }

  state.previousQuestionIds = [...state.previousQuestionIds.slice(-4), question.id];
  return validateQuestion(question);
}

function buildDirectQuestion(focus) {
  const pool = directPool(state.level);
  let fn = ["sin", "cos", "tan"].includes(focus) ? focus : choice(["sin", "cos", "tan"]);
  let candidates = pool;

  if (focus === "undefined") {
    fn = "tan";
    candidates = pool.filter((entry) => entry.tan.key === "undefined");
  } else if (focus === "quadrant") {
    candidates = pool.filter((entry) => entry.quadrant !== "I" && entry.quadrant !== "axis");
  } else if (focus === "negative") {
    candidates = NEGATIVE_ANGLES;
  }

  if (!candidates.length) candidates = pool;
  const angleEntry = choice(candidates);
  const correct = angleEntry[fn];
  const reference = getReferenceAngle(angleEntry);
  const categories = [fn];
  if (angleEntry.negative) categories.push("negative");
  if (angleEntry.quadrant !== "I" && angleEntry.quadrant !== "axis") categories.push("quadrant");
  if (correct.key === "undefined") categories.push("undefined");

  const distractors = directDistractors(fn, angleEntry, correct);
  const explanation = correct.key === "undefined"
    ? `At ${angleEntry.display}, the unit-circle x-coordinate is 0. Since tan θ = sin θ / cos θ, division by zero makes tangent undefined.`
    : angleEntry.negative
      ? `${functionName(fn)[0].toUpperCase() + functionName(fn).slice(1)} is ${fn === "cos" ? "even" : "odd"}, so ${fn}(${angleEntry.display}) ${fn === "cos" ? "=" : "= −"}${fn}(${reference.display}). ${quadrantSignExplanation(fn, angleEntry.quadrant)} The exact value is ${correct.display}.`
    : `The reference angle is ${reference.display}. ${quadrantSignExplanation(fn, angleEntry.quadrant)} From the unit circle, ${fn}(${angleEntry.display}) = ${correct.display}.`;

  return {
    id: `direct-${fn}-${angleEntry.key}`,
    type: angleEntry.negative ? "Negative angle" : "Exact value",
    prompt: `Find ${fn}(${angleEntry.display}).`,
    hint: state.level === 1 ? "Use the exact-value triangle or unit circle." : "Identify the reference angle and quadrant sign.",
    correct: answer(correct.key, correct.display),
    options: makeOptions(answer(correct.key, correct.display), distractors),
    categories: [...new Set(categories)],
    explanation
  };
}

function getReferenceAngle(angleEntry) {
  const referenceKeyByDisplay = {
    "0": "0",
    "π/6": "pi/6",
    "π/4": "pi/4",
    "π/3": "pi/3",
    "π/2": "pi/2",
    "2π/3": "pi/3",
    "3π/4": "pi/4",
    "5π/6": "pi/6",
    "π": "0",
    "7π/6": "pi/6",
    "5π/4": "pi/4",
    "4π/3": "pi/3",
    "3π/2": "pi/2",
    "5π/3": "pi/3",
    "7π/4": "pi/4",
    "11π/6": "pi/6",
    "−π/6": "pi/6",
    "−π/4": "pi/4",
    "−π/3": "pi/3",
    "−π/2": "pi/2",
    "−2π/3": "pi/3",
    "−3π/4": "pi/4",
    "−5π/6": "pi/6"
  };
  return ANGLES.find((entry) => entry.key === referenceKeyByDisplay[angleEntry.display]);
}

function directDistractors(fn, angleEntry, correct) {
  const reference = getReferenceAngle(angleEntry);
  const alternateFunction = fn === "sin" ? "cos" : "sin";
  const common = [
    opposite(correct),
    reference[alternateFunction],
    opposite(reference[alternateFunction]),
    reference[fn],
    VALUES.ZERO,
    VALUES.ONE,
    VALUES.NEG_ONE,
    VALUES.UNDEFINED
  ];

  if (fn === "tan") {
    common.unshift(
      reference.key === "pi/6" ? VALUES.ROOT3_TAN : VALUES.ROOT3_OVER3,
      reference.key === "pi/3" ? VALUES.ROOT3_OVER3 : VALUES.ROOT3_TAN
    );
  } else {
    common.unshift(
      reference.key === "pi/6" ? VALUES.ROOT3 : VALUES.HALF,
      reference.key === "pi/3" ? VALUES.HALF : VALUES.ROOT3
    );
  }

  return uniqueAnswers(common.map((value) => answer(value.key, value.display)))
    .filter((option) => option.key !== correct.key);
}

function buildInverseQuestion(focus) {
  const inverseFn = focus === "sin"
    ? "arcsin"
    : focus === "cos"
      ? "arccos"
      : focus === "tan"
        ? "arctan"
        : choice(["arcsin", "arccos", "arctan"]);
  const entry = choice(PRINCIPAL_ANGLES[inverseFn]);
  const correct = answer(entry.key, entry.display);
  const baseFn = inverseFn.replace("arc", "");
  const wrongAngles = inverseDistractors(inverseFn, entry);
  const ranges = {
    arcsin: "[−π/2, π/2]",
    arccos: "[0, π]",
    arctan: "(−π/2, π/2)"
  };

  return {
    id: `inverse-${inverseFn}-${entry.input.key}`,
    type: "Inverse trig",
    prompt: `Find ${inverseFn}(${entry.input.display}).`,
    hint: `Return the principal value in ${ranges[inverseFn]}.`,
    correct,
    options: makeOptions(correct, wrongAngles),
    categories: ["inverse", baseFn],
    explanation: `Inverse ${functionName(baseFn)} asks for the angle in its principal range ${ranges[inverseFn]}. Since ${baseFn}(${entry.display}) = ${entry.input.display}, the principal value is ${entry.display}.`
  };
}

function inverseDistractors(inverseFn, entry) {
  const equivalent = {
    arcsin: {
      "pi/6": ["5pi/6", "pi/3", "-pi/6"],
      "-pi/6": ["7pi/6", "pi/6", "-pi/3"],
      "pi/4": ["3pi/4", "pi/6", "-pi/4"],
      "-pi/4": ["5pi/4", "pi/4", "-pi/6"],
      "pi/3": ["2pi/3", "pi/6", "-pi/3"],
      "-pi/3": ["4pi/3", "pi/3", "-pi/6"],
      "pi/2": ["3pi/2", "0", "pi"],
      "-pi/2": ["3pi/2", "pi/2", "pi"],
      "0": ["pi", "pi/2", "-pi/2"]
    },
    arccos: {
      "0": ["2pi", "pi", "pi/2"],
      "pi/6": ["11pi/6", "pi/3", "-pi/6"],
      "pi/4": ["7pi/4", "pi/6", "-pi/4"],
      "pi/3": ["5pi/3", "pi/6", "-pi/3"],
      "pi/2": ["3pi/2", "0", "pi"],
      "2pi/3": ["4pi/3", "pi/3", "-2pi/3"],
      "3pi/4": ["5pi/4", "pi/4", "-3pi/4"],
      "5pi/6": ["7pi/6", "pi/6", "-5pi/6"],
      "pi": ["-pi", "0", "pi/2"]
    },
    arctan: {
      "pi/6": ["7pi/6", "pi/3", "-pi/6"],
      "-pi/6": ["5pi/6", "pi/6", "-pi/3"],
      "pi/4": ["5pi/4", "pi/6", "-pi/4"],
      "-pi/4": ["3pi/4", "pi/4", "-pi/6"],
      "pi/3": ["4pi/3", "pi/6", "-pi/3"],
      "-pi/3": ["2pi/3", "pi/3", "-pi/6"],
      "0": ["pi", "pi/2", "-pi/2"]
    }
  };
  const displays = {
    "0": "0", "pi/6": "π/6", "-pi/6": "−π/6", "pi/4": "π/4",
    "-pi/4": "−π/4", "pi/3": "π/3", "-pi/3": "−π/3",
    "pi/2": "π/2", "-pi/2": "−π/2", "2pi/3": "2π/3",
    "-2pi/3": "−2π/3", "3pi/4": "3π/4", "-3pi/4": "−3π/4",
    "5pi/6": "5π/6", "-5pi/6": "−5π/6", "pi": "π",
    "-pi": "−π", "3pi/2": "3π/2", "2pi": "2π", "4pi/3": "4π/3",
    "5pi/4": "5π/4", "7pi/6": "7π/6", "5pi/3": "5π/3",
    "7pi/4": "7π/4", "11pi/6": "11π/6"
  };
  const keys = equivalent[inverseFn][entry.key] || ["0", "pi/2", "pi"];
  return keys.map((key) => answer(key, displays[key]));
}

function buildEquationQuestion(focus) {
  let fn = ["sin", "cos", "tan"].includes(focus) ? focus : choice(["sin", "cos", "tan"]);
  let possibleValues;

  if (focus === "undefined") {
    fn = "tan";
    possibleValues = [VALUES.UNDEFINED];
  } else {
    possibleValues = uniqueValues(
      ANGLES.map((entry) => entry[fn]).filter((value) => value.key !== "undefined")
    ).filter((value) => {
      const solutionCount = ANGLES.filter((entry) => entry[fn].key === value.key).length;
      return solutionCount >= 1 && solutionCount <= 2;
    });
  }

  const target = choice(possibleValues);
  const solutions = target.key === "undefined"
    ? []
    : ANGLES.filter((entry) => entry[fn].key === target.key);
  const correct = solutionAnswer(solutions);
  const categories = ["equations", fn];
  if (target.key === "undefined") categories.push("undefined");

  return {
    id: `equation-${fn}-${target.key}`,
    type: "Trig equation",
    prompt: `Solve ${fn} x = ${target.display} for 0 ≤ x < 2π.`,
    hint: "Give all solutions in the interval.",
    correct,
    options: makeOptions(correct, equationDistractors(fn, target, solutions)),
    categories,
    explanation: equationExplanation(fn, target, solutions)
  };
}

function solutionAnswer(entries) {
  if (!entries.length) return answer("no-solutions", "No solutions");
  const key = entries.map((entry) => entry.key).join(",");
  const display = entries.map((entry) => entry.display).join(", ");
  return answer(key, display);
}

function equationDistractors(fn, target, solutions) {
  if (!solutions.length) {
    const undefinedAngles = ANGLES.filter((entry) => entry.tan.key === "undefined");
    return [
      solutionAnswer([undefinedAngles[0]]),
      solutionAnswer([undefinedAngles[1]]),
      solutionAnswer(undefinedAngles),
      answer("all-real", "All real x")
    ];
  }

  const distractors = [];
  if (solutions.length > 1) {
    distractors.push(...solutions.map((entry) => solutionAnswer([entry])));
  }

  const wrongSignSolutions = ANGLES.filter((entry) => entry[fn].key === opposite(target).key);
  if (wrongSignSolutions.length) distractors.push(solutionAnswer(wrongSignSolutions));

  const reference = getReferenceAngle(solutions[0]);
  if (reference) distractors.push(solutionAnswer([reference]));

  const mixedFunction = fn === "sin" ? "cos" : "sin";
  const mixedSolutions = ANGLES.filter((entry) => entry[mixedFunction].key === target.key);
  if (mixedSolutions.length) distractors.push(solutionAnswer(mixedSolutions));

  distractors.push(answer("no-solutions", "No solutions"));
  return uniqueAnswers(distractors);
}

function equationExplanation(fn, target, solutions) {
  if (!solutions.length) {
    return "Tangent is undefined where cos x = 0, at x = π/2 and x = 3π/2. Therefore tan x cannot equal “undefined” as a numerical equation, so there are no solutions.";
  }
  const reference = getReferenceAngle(solutions[0]);
  const solutionText = solutions.map((entry) => entry.display).join(" and ");
  return `The reference angle is ${reference.display}. Use the ASTC rule to select every quadrant where ${functionName(fn)} has the required sign. In 0 ≤ x < 2π, the complete solution set is ${solutionText}.`;
}

function answer(key, display) {
  return { key, display };
}

function uniqueValues(values) {
  const seen = new Set();
  return values.filter((value) => {
    if (seen.has(value.key)) return false;
    seen.add(value.key);
    return true;
  });
}

function uniqueAnswers(options) {
  const seen = new Set();
  return options.filter((option) => {
    if (!option || seen.has(option.key)) return false;
    seen.add(option.key);
    return true;
  });
}

function fallbackAnswers(correct) {
  const universal = [
    answer("0", "0"),
    answer("1/2", "1/2"),
    answer("-1/2", "−1/2"),
    answer("sqrt2/2", "√2/2"),
    answer("-sqrt2/2", "−√2/2"),
    answer("sqrt3/2", "√3/2"),
    answer("-sqrt3/2", "−√3/2"),
    answer("1", "1"),
    answer("-1", "−1"),
    answer("undefined", "undefined"),
    answer("pi/6", "π/6"),
    answer("pi/4", "π/4"),
    answer("pi/3", "π/3"),
    answer("pi/2", "π/2"),
    answer("no-solutions", "No solutions")
  ];
  return universal.filter((option) => option.key !== correct.key);
}

function makeOptions(correct, distractors) {
  const options = uniqueAnswers([correct, ...distractors, ...fallbackAnswers(correct)]).slice(0, 4);
  return shuffle(options);
}

function validateQuestion(question) {
  if (question.options.length !== 4) {
    throw new Error(`Question ${question.id} does not have four options.`);
  }
  const optionKeys = new Set(question.options.map((option) => option.key));
  if (optionKeys.size !== 4) {
    throw new Error(`Question ${question.id} has duplicate options.`);
  }
  const correctCount = question.options.filter((option) => option.key === question.correct.key).length;
  if (correctCount !== 1) {
    throw new Error(`Question ${question.id} does not have exactly one correct option.`);
  }
  return question;
}

function showQuestion() {
  state.answered = false;
  state.currentQuestion = buildQuestion();
  const question = state.currentQuestion;

  elements.questionType.textContent = question.type;
  elements.questionNumber.textContent = `Question ${state.total + 1}`;
  elements.questionText.textContent = question.prompt;
  elements.questionHint.textContent = question.hint;
  elements.feedbackPanel.hidden = true;
  elements.feedbackPanel.classList.remove("incorrect");
  elements.nextButton.disabled = true;
  elements.answerGrid.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.dataset.key = option.key;
    button.dataset.letter = String.fromCharCode(65 + index);
    button.textContent = option.display;
    button.addEventListener("click", () => submitAnswer(option.key, button));
    elements.answerGrid.append(button);
  });

  renderAllStats();
}

function submitAnswer(selectedKey, selectedButton) {
  if (state.answered) return;
  state.answered = true;
  const question = state.currentQuestion;
  const isCorrect = selectedKey === question.correct.key;

  state.total += 1;
  if (isCorrect) state.correct += 1;
  state.recent.push(isCorrect);
  state.recent = state.recent.slice(-10);

  question.categories.forEach((category) => {
    state.categoryStats[category].attempts += 1;
    if (!isCorrect) state.categoryStats[category].mistakes += 1;
  });

  [...elements.answerGrid.children].forEach((button) => {
    button.disabled = true;
    if (button.dataset.key === question.correct.key) {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    } else {
      button.classList.add("dimmed");
    }
  });

  const previousLevel = state.level;
  adjustLevel();
  renderFeedback(isCorrect, previousLevel);
  renderAllStats();
  elements.nextButton.disabled = false;
  elements.nextButton.focus();
}

function adjustLevel() {
  if (state.difficultyMode !== "auto") return;
  if (state.total < 10 || state.total === state.lastLevelWindow) return;
  const recentCorrect = state.recent.filter(Boolean).length;
  const previousLevel = state.level;

  if (recentCorrect >= 8) state.level = Math.min(6, state.level + 1);
  if (recentCorrect <= 5) state.level = Math.max(1, state.level - 1);

  if (state.level !== previousLevel) {
    state.lastLevelWindow = state.total;
  }
}

function renderFeedback(isCorrect, previousLevel) {
  const question = state.currentQuestion;
  elements.feedbackPanel.hidden = false;
  elements.feedbackPanel.classList.toggle("incorrect", !isCorrect);
  elements.feedbackIcon.textContent = isCorrect ? "✓" : "×";
  elements.feedbackTitle.textContent = isCorrect ? "Exactly right" : "Not quite";
  elements.feedbackAnswer.textContent = isCorrect
    ? `The answer is ${question.correct.display}.`
    : `The correct answer is ${question.correct.display}.`;

  const levelMessage = state.level > previousLevel
    ? ` You have moved up to Level ${state.level}.`
    : state.level < previousLevel
      ? ` The level has adjusted to ${state.level} for more practice.`
      : "";
  elements.explanationText.textContent = question.explanation + levelMessage;
}

function renderAllStats() {
  elements.levelValue.textContent = state.level;
  elements.levelName.textContent = LEVELS[state.level].name;
  elements.scoreValue.textContent = `${state.correct} / ${state.total}`;
  elements.accuracyValue.textContent = state.total
    ? `${Math.round((state.correct / state.total) * 100)}%`
    : "0%";
  elements.guideTitle.textContent = `Level ${state.level}`;
  elements.guideDescription.textContent = LEVELS[state.level].description;
  elements.difficultySelect.value = state.difficultyMode;
  const isAuto = state.difficultyMode === "auto";
  elements.difficultyMode.textContent = isAuto ? "Auto" : "Manual";
  elements.difficultyMode.classList.toggle("manual", !isAuto);
  elements.difficultyHelp.textContent = isAuto
    ? "Auto changes level from your latest 10 answers."
    : `Locked to Level ${state.level}. Choose Auto to resume adaptive difficulty.`;
  renderRecent();
  renderWeakAreas();
  renderLevelTrack();
}

function renderRecent() {
  elements.recentDots.replaceChildren();
  state.recent.forEach((result) => {
    const dot = document.createElement("span");
    dot.className = `recent-dot ${result ? "correct" : "incorrect"}`;
    elements.recentDots.append(dot);
  });
  for (let index = state.recent.length; index < 10; index += 1) {
    const dot = document.createElement("span");
    dot.className = "recent-dot";
    elements.recentDots.append(dot);
  }

  const count = state.recent.filter(Boolean).length;
  elements.recentDots.setAttribute(
    "aria-label",
    `${count} correct from the latest ${state.recent.length} answers`
  );
  elements.recentText.textContent = state.difficultyMode !== "auto"
    ? `Manual mode — Level ${state.level} stays fixed`
    : state.recent.length < 10
      ? `${10 - state.recent.length} more ${10 - state.recent.length === 1 ? "answer" : "answers"} before level review`
      : `${count} correct in the latest 10`;
}

function renderWeakAreas() {
  const attempted = CATEGORY_KEYS
    .map((key) => ({ key, ...state.categoryStats[key] }))
    .filter((entry) => entry.attempts > 0 && entry.mistakes > 0)
    .map((entry) => ({ ...entry, rate: entry.mistakes / entry.attempts }))
    .sort((a, b) => b.rate - a.rate || b.attempts - a.attempts)
    .slice(0, 4);

  elements.weakAreas.replaceChildren();
  if (!attempted.length) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = state.total
      ? "No weak areas detected yet. Keep going."
      : "Complete a few questions and your focus areas will appear here.";
    elements.weakAreas.append(message);
    return;
  }

  attempted.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "weak-row";

    const label = document.createElement("strong");
    label.textContent = CATEGORY_LABELS[entry.key];
    const detail = document.createElement("span");
    detail.textContent = `${entry.mistakes}/${entry.attempts} missed`;
    const bar = document.createElement("div");
    bar.className = "weak-bar";
    const fill = document.createElement("i");
    fill.style.width = `${Math.max(12, Math.round(entry.rate * 100))}%`;
    bar.append(fill);
    row.append(label, detail, bar);
    elements.weakAreas.append(row);
  });
}

function renderLevelTrack() {
  [...elements.levelTrack.children].forEach((segment, index) => {
    segment.classList.toggle("active", index < state.level);
  });
}

function resetSession() {
  const selectedMode = state.difficultyMode;
  const selectedLevel = state.level;
  state = createInitialState();
  state.difficultyMode = selectedMode;
  if (selectedMode !== "auto") state.level = selectedLevel;
  showQuestion();
}

function changeDifficulty(event) {
  const selected = event.target.value;
  state.difficultyMode = selected;

  if (selected !== "auto") {
    state.level = Number(selected);
  }

  state.answered = false;
  showQuestion();
  elements.questionText.focus();
}

function runSelfTests(iterations = 250) {
  const originalState = state;
  const report = [];
  try {
    for (let level = 1; level <= 6; level += 1) {
      state = createInitialState();
      state.level = level;
      for (let index = 0; index < iterations; index += 1) {
        validateQuestion(buildQuestion());
      }
      report.push(`Level ${level}: ${iterations} valid questions`);
    }

    const tanPiOverTwo = ANGLES.find((entry) => entry.key === "pi/2").tan.key;
    const tanThreePiOverTwo = ANGLES.find((entry) => entry.key === "3pi/2").tan.key;
    if (tanPiOverTwo !== "undefined" || tanThreePiOverTwo !== "undefined") {
      throw new Error("Undefined tangent invariant failed.");
    }

    const rangesValid =
      PRINCIPAL_ANGLES.arcsin.every((entry) => !["2pi/3", "3pi/4", "5pi/6", "pi"].includes(entry.key)) &&
      PRINCIPAL_ANGLES.arccos.every((entry) => !entry.key.startsWith("-")) &&
      PRINCIPAL_ANGLES.arctan.every((entry) => !["pi/2", "-pi/2"].includes(entry.key));
    if (!rangesValid) throw new Error("Inverse range invariant failed.");

    const sinHalfSolutions = solutionAnswer(
      ANGLES.filter((entry) => entry.sin.key === VALUES.HALF.key)
    );
    const cosNegativeHalfSolutions = solutionAnswer(
      ANGLES.filter((entry) => entry.cos.key === VALUES.NEG_HALF.key)
    );
    const tanZeroSolutions = solutionAnswer(
      ANGLES.filter((entry) => entry.tan.key === VALUES.ZERO.key)
    );
    if (sinHalfSolutions.key !== "pi/6,5pi/6") {
      throw new Error("Complete sine solution set failed.");
    }
    if (cosNegativeHalfSolutions.key !== "2pi/3,4pi/3") {
      throw new Error("Complete cosine solution set failed.");
    }
    if (tanZeroSolutions.key !== "0,pi") {
      throw new Error("Complete tangent solution set failed.");
    }

    state = createInitialState();
    state.level = 1;
    state.total = 10;
    state.recent = Array(9).fill(true);
    state.recent.push(true);
    adjustLevel();
    if (state.level !== 2) throw new Error("Level increase rule failed.");

    state.level = 6;
    state.total = 20;
    state.lastLevelWindow = 10;
    state.recent = Array(10).fill(true);
    adjustLevel();
    if (state.level !== 6) throw new Error("Upper level boundary failed.");

    state.level = 6;
    state.difficultyMode = "6";
    state.total = 30;
    state.lastLevelWindow = 20;
    state.recent = Array(10).fill(false);
    adjustLevel();
    if (state.level !== 6) throw new Error("Manual level lock failed.");

    report.push("Math invariants and adaptive boundaries: valid");
    return report;
  } finally {
    state = originalState;
  }
}

elements.nextButton.addEventListener("click", showQuestion);
elements.difficultySelect.addEventListener("change", changeDifficulty);
elements.resetButton.addEventListener("click", resetSession);

window.Trigwise = {
  runSelfTests,
  buildQuestionForLevel(level) {
    const originalLevel = state.level;
    state.level = Math.max(1, Math.min(6, level));
    const question = buildQuestion();
    state.level = originalLevel;
    return question;
  },
  getState() {
    return JSON.parse(JSON.stringify(state));
  }
};

if (new URLSearchParams(window.location.search).has("selftest")) {
  document.documentElement.dataset.selfTest = runSelfTests(1000).join(" | ");
}

showQuestion();
