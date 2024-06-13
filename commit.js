const { execSync } = require("child_process");
const { format } = require("date-fns");

const currentDate = format(new Date(), "HH:mm, dd.MM.yyyy");
const commitMessage = `${currentDate}`;

try {
  execSync("git add .");
  execSync(`git commit -m "${commitMessage}"`);
  execSync("git push");
  console.log("Changes have been pushed successfully!");
} catch (error) {
  console.error("An error occurred:", error);
}
