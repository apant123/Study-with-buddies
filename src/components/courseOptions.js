const course = [
{ value: 'CS 30', label: 'CS 30'},
{ value: 'CS 31', label: 'CS 31' },
{ value: 'CS 32', label: 'CS 32' },
{ value: 'CS 33', label: 'CS 33'},
{ value: 'CS 35L', label: 'CS 35L' },
{ value: 'CS M51A', label: 'CS M51A'},
{ value: 'CS 111', label: 'CS 111'},
{ value: 'CS 118', label: 'CS 118'},
{ value: 'CS 130', label: 'CS 130'},
{ value: 'CS 131', label: 'CS 131'},
{ value: 'CS 180', label: 'CS 180'},
{ value: 'Math 31A', label: 'Math 31A' },
{ value: 'Math 31B', label: 'Math 31B' },
{ value: 'Math 32A', label: 'Math 32A' },
{ value: 'Math 32B', label: 'Math 32B' },
{ value: 'Math 33A', label: 'Math 33A' },
{ value: 'Math 33B', label: 'Math 33B' },
{ value: 'Math 61', label: 'Math 61'},
{ value: 'Physics 1A', label: 'Physics 1A'},
{ value: 'Physics 1B', label: 'Physics 1B'},
{ value: 'Physics 1C', label: 'Physics 1C'},
{ value: 'Physics 4AL', label: 'Physics 4AL'},
{ value: 'Physics 4BL', label: 'Physics 4BL'},
{ value: 'Chemistry 20A', label: 'Chemistry 20A'},
{ value: 'Chemistry 20B', label: 'Chemistry 20B'},
{ value: 'Chemistry 20L', label: 'Chemistry 20L'}

]

const courseOptions = course.sort((a, b) => a.label.localeCompare(b.label));

export default courseOptions;
