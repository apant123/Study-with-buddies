const course = [
{ value: 'cs31', label: 'CS 31' },
{ value: 'cs32', label: 'CS 32 ' },
{ value: 'cs35l', label: 'CS 35L' },
{ value: 'math31a', label: 'Math 31A' },
{ value: 'math31b', label: 'Math 31B' },
{ value: 'math32a', label: 'Math 32A' },
{ value: 'math32b', label: 'Math 32B' },
{ value: 'math33a', label: 'Math 33A' },
{ value: 'math33b', label: 'Math 33B' },
{ value: 'math61', label: 'Math 61'},
{ value: 'physics1a', label: 'Physics 1A'},
{ value: 'physics1b', label: 'Physics 1B'},
{ value: 'physics1c', label: 'Physics 1C'},
{ value: 'physics4al', label: 'Physics 4AL'},
{ value: 'physics4bl', label: 'Physics 4BL'},
{ value: 'chem20a', label: 'Chemistry 20A'},
{ value: 'chem20b', label: 'Chemistry 20B'},
{ value: 'chem20l', label: 'Chemistry 20L'}

]

const courseOptions = course.sort((a, b) => a.label.localeCompare(b.label));

export default courseOptions;
