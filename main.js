const courses = require("./data.json");

function get_failed_courses() {
  return courses.filter((course) => course.grade == "F");
}

function grade_point(grade) {
  const GRADE = grade.toUpperCase();
  if (GRADE === "S") return 10.0;
  if (GRADE === "A+") return 9.0;
  if (GRADE === "A") return 8.5;
  if (GRADE === "B+") return 8.0;
  if (GRADE === "B") return 7.5;
  if (GRADE === "C+") return 7.0;
  if (GRADE === "C") return 6.5;
  if (GRADE === "D") return 6.0;
  if (GRADE === "P") return 5.5;
  if (GRADE === "F") return 0.0;
  if (GRADE === "NA") return 0.0;
}

function credits_sum(include_na, semester) {
  const b = courses.reduce((sum, course) => {
    if (semester && course.semester !== semester) return sum;
    if (!include_na && course.grade === "NA") return sum;
    return sum + course.credits;
  }, 0);
  return b;
}

function sgpa(semester) {
  const a = courses.reduce((sum, course) => {
    if (course.semester !== semester) return sum;
    return sum + course.credits * grade_point(course.grade);
  }, 0);
  const b = credits_sum(false, semester)
  return a / b;
}

function cgpa() {
  const a = courses.reduce((sum, course) => {
    return sum + course.credits * grade_point(course.grade);
  }, 0);
  const b = credits_sum(false);
  return a / b;
}

function avg_marks_for_cgpa(cgpa) {
  const x = cgpa * credits_sum();
  return x;
}

console.log(avg_marks_for_cgpa(8));
